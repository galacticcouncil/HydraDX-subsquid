import { Service, Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput } from 'warthog';
import { WarthogBaseService } from '../../server/WarthogBaseService';

import { Account } from './account.model';

import { AccountWhereArgs, AccountWhereInput } from '../../warthog';

import { TradeTransfer } from '../trade-transfer/trade-transfer.model';
import { TradeTransferService } from '../trade-transfer/trade-transfer.service';
import { SwapAction } from '../swap-action/swap-action.model';
import { SwapActionService } from '../swap-action/swap-action.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('AccountService')
export class AccountService extends WarthogBaseService<Account> {
  @Inject('TradeTransferService')
  public readonly tradeTransferOutService!: TradeTransferService;
  @Inject('TradeTransferService')
  public readonly tradeTransferInService!: TradeTransferService;
  @Inject('SwapActionService')
  public readonly swapactionaccountService!: SwapActionService;

  constructor(@InjectRepository(Account) protected readonly repository: Repository<Account>) {
    super(Account, repository);
  }

  async find<W extends WhereInput>(
    where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<Account[]> {
    return this.findWithRelations<W>(where, orderBy, limit, offset, fields);
  }

  async findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<Account[]> {
    const where = <AccountWhereInput>(_where || {});

    // remove relation filters to enable warthog query builders

    const { tradeTransferOut_some, tradeTransferOut_none, tradeTransferOut_every } = where;

    if (+!!tradeTransferOut_some + +!!tradeTransferOut_none + +!!tradeTransferOut_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.tradeTransferOut_some;
    delete where.tradeTransferOut_none;
    delete where.tradeTransferOut_every;
    // remove relation filters to enable warthog query builders

    const { tradeTransferIn_some, tradeTransferIn_none, tradeTransferIn_every } = where;

    if (+!!tradeTransferIn_some + +!!tradeTransferIn_none + +!!tradeTransferIn_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.tradeTransferIn_some;
    delete where.tradeTransferIn_none;
    delete where.tradeTransferIn_every;
    // remove relation filters to enable warthog query builders

    const { swapactionaccount_some, swapactionaccount_none, swapactionaccount_every } = where;

    if (+!!swapactionaccount_some + +!!swapactionaccount_none + +!!swapactionaccount_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.swapactionaccount_some;
    delete where.swapactionaccount_none;
    delete where.swapactionaccount_every;

    let mainQuery = this.buildFindQueryWithParams(<any>where, orderBy, undefined, fields, 'main').take(undefined); // remove LIMIT

    let parameters = mainQuery.getParameters();

    const tradeTransferOutFilter = tradeTransferOut_some || tradeTransferOut_none || tradeTransferOut_every;

    if (tradeTransferOutFilter) {
      const tradeTransferOutQuery = this.tradeTransferOutService
        .buildFindQueryWithParams(<any>tradeTransferOutFilter, undefined, undefined, ['id'], 'tradeTransferOut')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...tradeTransferOutQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'account.tradeTransferOut',
          'tradeTransferOut_filtered',
          `tradeTransferOut_filtered.id IN (${tradeTransferOutQuery.getQuery()})`
        )
        .groupBy('account_id')
        .addSelect('count(tradeTransferOut_filtered.id)', 'cnt_filtered')
        .addSelect('account.id', 'account_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('account.tradeTransferOut', 'tradeTransferOut_total')
        .groupBy('account_id')
        .addSelect('count(tradeTransferOut_total.id)', 'cnt_total')
        .addSelect('account.id', 'account_id');

      const subQuery = `
                SELECT
                    f.account_id account_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.account_id = f.account_id`;

      if (tradeTransferOut_none) {
        mainQuery = mainQuery.andWhere(`account.id IN
                (SELECT
                    tradeTransferOut_subq.account_id
                FROM
                    (${subQuery}) tradeTransferOut_subq
                WHERE
                    tradeTransferOut_subq.cnt_filtered = 0
                )`);
      }

      if (tradeTransferOut_some) {
        mainQuery = mainQuery.andWhere(`account.id IN
                (SELECT
                    tradeTransferOut_subq.account_id
                FROM
                    (${subQuery}) tradeTransferOut_subq
                WHERE
                    tradeTransferOut_subq.cnt_filtered > 0
                )`);
      }

      if (tradeTransferOut_every) {
        mainQuery = mainQuery.andWhere(`account.id IN
                (SELECT
                    tradeTransferOut_subq.account_id
                FROM
                    (${subQuery}) tradeTransferOut_subq
                WHERE
                    tradeTransferOut_subq.cnt_filtered > 0
                    AND tradeTransferOut_subq.cnt_filtered = tradeTransferOut_subq.cnt_total
                )`);
      }
    }

    const tradeTransferInFilter = tradeTransferIn_some || tradeTransferIn_none || tradeTransferIn_every;

    if (tradeTransferInFilter) {
      const tradeTransferInQuery = this.tradeTransferInService
        .buildFindQueryWithParams(<any>tradeTransferInFilter, undefined, undefined, ['id'], 'tradeTransferIn')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...tradeTransferInQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'account.tradeTransferIn',
          'tradeTransferIn_filtered',
          `tradeTransferIn_filtered.id IN (${tradeTransferInQuery.getQuery()})`
        )
        .groupBy('account_id')
        .addSelect('count(tradeTransferIn_filtered.id)', 'cnt_filtered')
        .addSelect('account.id', 'account_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('account.tradeTransferIn', 'tradeTransferIn_total')
        .groupBy('account_id')
        .addSelect('count(tradeTransferIn_total.id)', 'cnt_total')
        .addSelect('account.id', 'account_id');

      const subQuery = `
                SELECT
                    f.account_id account_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.account_id = f.account_id`;

      if (tradeTransferIn_none) {
        mainQuery = mainQuery.andWhere(`account.id IN
                (SELECT
                    tradeTransferIn_subq.account_id
                FROM
                    (${subQuery}) tradeTransferIn_subq
                WHERE
                    tradeTransferIn_subq.cnt_filtered = 0
                )`);
      }

      if (tradeTransferIn_some) {
        mainQuery = mainQuery.andWhere(`account.id IN
                (SELECT
                    tradeTransferIn_subq.account_id
                FROM
                    (${subQuery}) tradeTransferIn_subq
                WHERE
                    tradeTransferIn_subq.cnt_filtered > 0
                )`);
      }

      if (tradeTransferIn_every) {
        mainQuery = mainQuery.andWhere(`account.id IN
                (SELECT
                    tradeTransferIn_subq.account_id
                FROM
                    (${subQuery}) tradeTransferIn_subq
                WHERE
                    tradeTransferIn_subq.cnt_filtered > 0
                    AND tradeTransferIn_subq.cnt_filtered = tradeTransferIn_subq.cnt_total
                )`);
      }
    }

    const swapactionaccountFilter = swapactionaccount_some || swapactionaccount_none || swapactionaccount_every;

    if (swapactionaccountFilter) {
      const swapactionaccountQuery = this.swapactionaccountService
        .buildFindQueryWithParams(<any>swapactionaccountFilter, undefined, undefined, ['id'], 'swapactionaccount')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...swapactionaccountQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'account.swapactionaccount',
          'swapactionaccount_filtered',
          `swapactionaccount_filtered.id IN (${swapactionaccountQuery.getQuery()})`
        )
        .groupBy('account_id')
        .addSelect('count(swapactionaccount_filtered.id)', 'cnt_filtered')
        .addSelect('account.id', 'account_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('account.swapactionaccount', 'swapactionaccount_total')
        .groupBy('account_id')
        .addSelect('count(swapactionaccount_total.id)', 'cnt_total')
        .addSelect('account.id', 'account_id');

      const subQuery = `
                SELECT
                    f.account_id account_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.account_id = f.account_id`;

      if (swapactionaccount_none) {
        mainQuery = mainQuery.andWhere(`account.id IN
                (SELECT
                    swapactionaccount_subq.account_id
                FROM
                    (${subQuery}) swapactionaccount_subq
                WHERE
                    swapactionaccount_subq.cnt_filtered = 0
                )`);
      }

      if (swapactionaccount_some) {
        mainQuery = mainQuery.andWhere(`account.id IN
                (SELECT
                    swapactionaccount_subq.account_id
                FROM
                    (${subQuery}) swapactionaccount_subq
                WHERE
                    swapactionaccount_subq.cnt_filtered > 0
                )`);
      }

      if (swapactionaccount_every) {
        mainQuery = mainQuery.andWhere(`account.id IN
                (SELECT
                    swapactionaccount_subq.account_id
                FROM
                    (${subQuery}) swapactionaccount_subq
                WHERE
                    swapactionaccount_subq.cnt_filtered > 0
                    AND swapactionaccount_subq.cnt_filtered = swapactionaccount_subq.cnt_total
                )`);
      }
    }

    mainQuery = mainQuery.setParameters(parameters);

    return mainQuery
      .take(limit || 50)
      .skip(offset || 0)
      .getMany();
  }
}
