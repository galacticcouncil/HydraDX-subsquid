import { Service, Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput, HydraBaseService } from '@subsquid/warthog';

import { SwapAction } from './swap-action.model';

import { SwapActionWhereArgs, SwapActionWhereInput } from '../../warthog';

import { Token } from '../token/token.model';
import { TokenService } from '../token/token.service';
import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { TradeTransfer } from '../trade-transfer/trade-transfer.model';
import { TradeTransferService } from '../trade-transfer/trade-transfer.service';
import { Pool } from '../pool/pool.model';
import { PoolService } from '../pool/pool.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('SwapActionService')
export class SwapActionService extends HydraBaseService<SwapAction> {
  @Inject('TokenService')
  public readonly tokenZeroService!: TokenService;
  @Inject('TokenService')
  public readonly tokenOneService!: TokenService;
  @Inject('AccountService')
  public readonly accountService!: AccountService;
  @Inject('TradeTransferService')
  public readonly directTradesService!: TradeTransferService;
  @Inject('PoolService')
  public readonly xykTradePoolService!: PoolService;

  constructor(@InjectRepository(SwapAction) protected readonly repository: Repository<SwapAction>) {
    super(SwapAction, repository);
  }

  async find<W extends WhereInput>(
    where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<SwapAction[]> {
    return this.findWithRelations<W>(where, orderBy, limit, offset, fields);
  }

  async findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<SwapAction[]> {
    const where = <SwapActionWhereInput>(_where || {});

    // remove relation filters to enable warthog query builders
    const { tokenZero } = where;
    delete where.tokenZero;

    // remove relation filters to enable warthog query builders
    const { tokenOne } = where;
    delete where.tokenOne;

    // remove relation filters to enable warthog query builders
    const { account } = where;
    delete where.account;

    // remove relation filters to enable warthog query builders

    const { directTrades_some, directTrades_none, directTrades_every } = where;

    if (+!!directTrades_some + +!!directTrades_none + +!!directTrades_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.directTrades_some;
    delete where.directTrades_none;
    delete where.directTrades_every;
    // remove relation filters to enable warthog query builders
    const { xykTradePool } = where;
    delete where.xykTradePool;

    let mainQuery = this.buildFindQueryWithParams(<any>where, orderBy, undefined, fields, 'main').take(undefined); // remove LIMIT

    let parameters = mainQuery.getParameters();

    if (tokenZero) {
      // OTO or MTO
      const tokenZeroQuery = this.tokenZeroService
        .buildFindQueryWithParams(<any>tokenZero, undefined, undefined, ['id'], 'tokenZero')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"swapaction"."token_zero_id" IN (${tokenZeroQuery.getQuery()})`);

      parameters = { ...parameters, ...tokenZeroQuery.getParameters() };
    }

    if (tokenOne) {
      // OTO or MTO
      const tokenOneQuery = this.tokenOneService
        .buildFindQueryWithParams(<any>tokenOne, undefined, undefined, ['id'], 'tokenOne')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"swapaction"."token_one_id" IN (${tokenOneQuery.getQuery()})`);

      parameters = { ...parameters, ...tokenOneQuery.getParameters() };
    }

    if (account) {
      // OTO or MTO
      const accountQuery = this.accountService
        .buildFindQueryWithParams(<any>account, undefined, undefined, ['id'], 'account')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"swapaction"."account_id" IN (${accountQuery.getQuery()})`);

      parameters = { ...parameters, ...accountQuery.getParameters() };
    }

    const directTradesFilter = directTrades_some || directTrades_none || directTrades_every;

    if (directTradesFilter) {
      const directTradesQuery = this.directTradesService
        .buildFindQueryWithParams(<any>directTradesFilter, undefined, undefined, ['id'], 'directTrades')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...directTradesQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'swapaction.directTrades',
          'directTrades_filtered',
          `directTrades_filtered.id IN (${directTradesQuery.getQuery()})`
        )
        .groupBy('swapaction_id')
        .addSelect('count(directTrades_filtered.id)', 'cnt_filtered')
        .addSelect('swapaction.id', 'swapaction_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('swapaction.directTrades', 'directTrades_total')
        .groupBy('swapaction_id')
        .addSelect('count(directTrades_total.id)', 'cnt_total')
        .addSelect('swapaction.id', 'swapaction_id');

      const subQuery = `
                SELECT
                    f.swapaction_id swapaction_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.swapaction_id = f.swapaction_id`;

      if (directTrades_none) {
        mainQuery = mainQuery.andWhere(`swapaction.id IN
                (SELECT
                    directTrades_subq.swapaction_id
                FROM
                    (${subQuery}) directTrades_subq
                WHERE
                    directTrades_subq.cnt_filtered = 0
                )`);
      }

      if (directTrades_some) {
        mainQuery = mainQuery.andWhere(`swapaction.id IN
                (SELECT
                    directTrades_subq.swapaction_id
                FROM
                    (${subQuery}) directTrades_subq
                WHERE
                    directTrades_subq.cnt_filtered > 0
                )`);
      }

      if (directTrades_every) {
        mainQuery = mainQuery.andWhere(`swapaction.id IN
                (SELECT
                    directTrades_subq.swapaction_id
                FROM
                    (${subQuery}) directTrades_subq
                WHERE
                    directTrades_subq.cnt_filtered > 0
                    AND directTrades_subq.cnt_filtered = directTrades_subq.cnt_total
                )`);
      }
    }

    if (xykTradePool) {
      // OTO or MTO
      const xykTradePoolQuery = this.xykTradePoolService
        .buildFindQueryWithParams(<any>xykTradePool, undefined, undefined, ['id'], 'xykTradePool')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"swapaction"."xyk_trade_pool_id" IN (${xykTradePoolQuery.getQuery()})`);

      parameters = { ...parameters, ...xykTradePoolQuery.getParameters() };
    }

    mainQuery = mainQuery.setParameters(parameters);

    return mainQuery
      .take(limit || 50)
      .skip(offset || 0)
      .getMany();
  }
}
