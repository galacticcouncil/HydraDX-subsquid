import { Service, Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput, HydraBaseService } from '@subsquid/warthog';

import { Token } from './token.model';

import { TokenWhereArgs, TokenWhereInput } from '../../warthog';

import { Pool } from '../pool/pool.model';
import { PoolService } from '../pool/pool.service';
import { AssetPrice } from '../asset-price/asset-price.model';
import { AssetPriceService } from '../asset-price/asset-price.service';
import { SwapAction } from '../swap-action/swap-action.model';
import { SwapActionService } from '../swap-action/swap-action.service';
import { TradeTransfer } from '../trade-transfer/trade-transfer.model';
import { TradeTransferService } from '../trade-transfer/trade-transfer.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('TokenService')
export class TokenService extends HydraBaseService<Token> {
  @Inject('PoolService')
  public readonly parentPoolService!: PoolService;
  @Inject('AssetPriceService')
  public readonly assetpricetokenZeroService!: AssetPriceService;
  @Inject('AssetPriceService')
  public readonly assetpricetokenOneService!: AssetPriceService;
  @Inject('PoolService')
  public readonly poolsharedTokenService!: PoolService;
  @Inject('PoolService')
  public readonly pooltokenZeroService!: PoolService;
  @Inject('PoolService')
  public readonly pooltokenOneService!: PoolService;
  @Inject('SwapActionService')
  public readonly swapactiontokenZeroService!: SwapActionService;
  @Inject('SwapActionService')
  public readonly swapactiontokenOneService!: SwapActionService;
  @Inject('TradeTransferService')
  public readonly tradetransferassetSentService!: TradeTransferService;
  @Inject('TradeTransferService')
  public readonly tradetransferassetReceivedService!: TradeTransferService;

  constructor(@InjectRepository(Token) protected readonly repository: Repository<Token>) {
    super(Token, repository);
  }

  async find<W extends WhereInput>(
    where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<Token[]> {
    return this.findWithRelations<W>(where, orderBy, limit, offset, fields);
  }

  async findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<Token[]> {
    const where = <TokenWhereInput>(_where || {});

    // remove relation filters to enable warthog query builders
    const { parentPool } = where;
    delete where.parentPool;

    // remove relation filters to enable warthog query builders

    const { assetpricetokenZero_some, assetpricetokenZero_none, assetpricetokenZero_every } = where;

    if (+!!assetpricetokenZero_some + +!!assetpricetokenZero_none + +!!assetpricetokenZero_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.assetpricetokenZero_some;
    delete where.assetpricetokenZero_none;
    delete where.assetpricetokenZero_every;
    // remove relation filters to enable warthog query builders

    const { assetpricetokenOne_some, assetpricetokenOne_none, assetpricetokenOne_every } = where;

    if (+!!assetpricetokenOne_some + +!!assetpricetokenOne_none + +!!assetpricetokenOne_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.assetpricetokenOne_some;
    delete where.assetpricetokenOne_none;
    delete where.assetpricetokenOne_every;
    // remove relation filters to enable warthog query builders

    const { poolsharedToken_some, poolsharedToken_none, poolsharedToken_every } = where;

    if (+!!poolsharedToken_some + +!!poolsharedToken_none + +!!poolsharedToken_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.poolsharedToken_some;
    delete where.poolsharedToken_none;
    delete where.poolsharedToken_every;
    // remove relation filters to enable warthog query builders

    const { pooltokenZero_some, pooltokenZero_none, pooltokenZero_every } = where;

    if (+!!pooltokenZero_some + +!!pooltokenZero_none + +!!pooltokenZero_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.pooltokenZero_some;
    delete where.pooltokenZero_none;
    delete where.pooltokenZero_every;
    // remove relation filters to enable warthog query builders

    const { pooltokenOne_some, pooltokenOne_none, pooltokenOne_every } = where;

    if (+!!pooltokenOne_some + +!!pooltokenOne_none + +!!pooltokenOne_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.pooltokenOne_some;
    delete where.pooltokenOne_none;
    delete where.pooltokenOne_every;
    // remove relation filters to enable warthog query builders

    const { swapactiontokenZero_some, swapactiontokenZero_none, swapactiontokenZero_every } = where;

    if (+!!swapactiontokenZero_some + +!!swapactiontokenZero_none + +!!swapactiontokenZero_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.swapactiontokenZero_some;
    delete where.swapactiontokenZero_none;
    delete where.swapactiontokenZero_every;
    // remove relation filters to enable warthog query builders

    const { swapactiontokenOne_some, swapactiontokenOne_none, swapactiontokenOne_every } = where;

    if (+!!swapactiontokenOne_some + +!!swapactiontokenOne_none + +!!swapactiontokenOne_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.swapactiontokenOne_some;
    delete where.swapactiontokenOne_none;
    delete where.swapactiontokenOne_every;
    // remove relation filters to enable warthog query builders

    const { tradetransferassetSent_some, tradetransferassetSent_none, tradetransferassetSent_every } = where;

    if (+!!tradetransferassetSent_some + +!!tradetransferassetSent_none + +!!tradetransferassetSent_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.tradetransferassetSent_some;
    delete where.tradetransferassetSent_none;
    delete where.tradetransferassetSent_every;
    // remove relation filters to enable warthog query builders

    const { tradetransferassetReceived_some, tradetransferassetReceived_none, tradetransferassetReceived_every } =
      where;

    if (
      +!!tradetransferassetReceived_some + +!!tradetransferassetReceived_none + +!!tradetransferassetReceived_every >
      1
    ) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.tradetransferassetReceived_some;
    delete where.tradetransferassetReceived_none;
    delete where.tradetransferassetReceived_every;

    let mainQuery = this.buildFindQueryWithParams(<any>where, orderBy, undefined, fields, 'main').take(undefined); // remove LIMIT

    let parameters = mainQuery.getParameters();

    if (parentPool) {
      // OTO or MTO
      const parentPoolQuery = this.parentPoolService
        .buildFindQueryWithParams(<any>parentPool, undefined, undefined, ['id'], 'parentPool')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"token"."parent_pool_id" IN (${parentPoolQuery.getQuery()})`);

      parameters = { ...parameters, ...parentPoolQuery.getParameters() };
    }

    const assetpricetokenZeroFilter = assetpricetokenZero_some || assetpricetokenZero_none || assetpricetokenZero_every;

    if (assetpricetokenZeroFilter) {
      const assetpricetokenZeroQuery = this.assetpricetokenZeroService
        .buildFindQueryWithParams(<any>assetpricetokenZeroFilter, undefined, undefined, ['id'], 'assetpricetokenZero')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...assetpricetokenZeroQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'token.assetpricetokenZero',
          'assetpricetokenZero_filtered',
          `assetpricetokenZero_filtered.id IN (${assetpricetokenZeroQuery.getQuery()})`
        )
        .groupBy('token_id')
        .addSelect('count(assetpricetokenZero_filtered.id)', 'cnt_filtered')
        .addSelect('token.id', 'token_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('token.assetpricetokenZero', 'assetpricetokenZero_total')
        .groupBy('token_id')
        .addSelect('count(assetpricetokenZero_total.id)', 'cnt_total')
        .addSelect('token.id', 'token_id');

      const subQuery = `
                SELECT
                    f.token_id token_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.token_id = f.token_id`;

      if (assetpricetokenZero_none) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    assetpricetokenZero_subq.token_id
                FROM
                    (${subQuery}) assetpricetokenZero_subq
                WHERE
                    assetpricetokenZero_subq.cnt_filtered = 0
                )`);
      }

      if (assetpricetokenZero_some) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    assetpricetokenZero_subq.token_id
                FROM
                    (${subQuery}) assetpricetokenZero_subq
                WHERE
                    assetpricetokenZero_subq.cnt_filtered > 0
                )`);
      }

      if (assetpricetokenZero_every) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    assetpricetokenZero_subq.token_id
                FROM
                    (${subQuery}) assetpricetokenZero_subq
                WHERE
                    assetpricetokenZero_subq.cnt_filtered > 0
                    AND assetpricetokenZero_subq.cnt_filtered = assetpricetokenZero_subq.cnt_total
                )`);
      }
    }

    const assetpricetokenOneFilter = assetpricetokenOne_some || assetpricetokenOne_none || assetpricetokenOne_every;

    if (assetpricetokenOneFilter) {
      const assetpricetokenOneQuery = this.assetpricetokenOneService
        .buildFindQueryWithParams(<any>assetpricetokenOneFilter, undefined, undefined, ['id'], 'assetpricetokenOne')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...assetpricetokenOneQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'token.assetpricetokenOne',
          'assetpricetokenOne_filtered',
          `assetpricetokenOne_filtered.id IN (${assetpricetokenOneQuery.getQuery()})`
        )
        .groupBy('token_id')
        .addSelect('count(assetpricetokenOne_filtered.id)', 'cnt_filtered')
        .addSelect('token.id', 'token_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('token.assetpricetokenOne', 'assetpricetokenOne_total')
        .groupBy('token_id')
        .addSelect('count(assetpricetokenOne_total.id)', 'cnt_total')
        .addSelect('token.id', 'token_id');

      const subQuery = `
                SELECT
                    f.token_id token_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.token_id = f.token_id`;

      if (assetpricetokenOne_none) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    assetpricetokenOne_subq.token_id
                FROM
                    (${subQuery}) assetpricetokenOne_subq
                WHERE
                    assetpricetokenOne_subq.cnt_filtered = 0
                )`);
      }

      if (assetpricetokenOne_some) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    assetpricetokenOne_subq.token_id
                FROM
                    (${subQuery}) assetpricetokenOne_subq
                WHERE
                    assetpricetokenOne_subq.cnt_filtered > 0
                )`);
      }

      if (assetpricetokenOne_every) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    assetpricetokenOne_subq.token_id
                FROM
                    (${subQuery}) assetpricetokenOne_subq
                WHERE
                    assetpricetokenOne_subq.cnt_filtered > 0
                    AND assetpricetokenOne_subq.cnt_filtered = assetpricetokenOne_subq.cnt_total
                )`);
      }
    }

    const poolsharedTokenFilter = poolsharedToken_some || poolsharedToken_none || poolsharedToken_every;

    if (poolsharedTokenFilter) {
      const poolsharedTokenQuery = this.poolsharedTokenService
        .buildFindQueryWithParams(<any>poolsharedTokenFilter, undefined, undefined, ['id'], 'poolsharedToken')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...poolsharedTokenQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'token.poolsharedToken',
          'poolsharedToken_filtered',
          `poolsharedToken_filtered.id IN (${poolsharedTokenQuery.getQuery()})`
        )
        .groupBy('token_id')
        .addSelect('count(poolsharedToken_filtered.id)', 'cnt_filtered')
        .addSelect('token.id', 'token_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('token.poolsharedToken', 'poolsharedToken_total')
        .groupBy('token_id')
        .addSelect('count(poolsharedToken_total.id)', 'cnt_total')
        .addSelect('token.id', 'token_id');

      const subQuery = `
                SELECT
                    f.token_id token_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.token_id = f.token_id`;

      if (poolsharedToken_none) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    poolsharedToken_subq.token_id
                FROM
                    (${subQuery}) poolsharedToken_subq
                WHERE
                    poolsharedToken_subq.cnt_filtered = 0
                )`);
      }

      if (poolsharedToken_some) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    poolsharedToken_subq.token_id
                FROM
                    (${subQuery}) poolsharedToken_subq
                WHERE
                    poolsharedToken_subq.cnt_filtered > 0
                )`);
      }

      if (poolsharedToken_every) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    poolsharedToken_subq.token_id
                FROM
                    (${subQuery}) poolsharedToken_subq
                WHERE
                    poolsharedToken_subq.cnt_filtered > 0
                    AND poolsharedToken_subq.cnt_filtered = poolsharedToken_subq.cnt_total
                )`);
      }
    }

    const pooltokenZeroFilter = pooltokenZero_some || pooltokenZero_none || pooltokenZero_every;

    if (pooltokenZeroFilter) {
      const pooltokenZeroQuery = this.pooltokenZeroService
        .buildFindQueryWithParams(<any>pooltokenZeroFilter, undefined, undefined, ['id'], 'pooltokenZero')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...pooltokenZeroQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'token.pooltokenZero',
          'pooltokenZero_filtered',
          `pooltokenZero_filtered.id IN (${pooltokenZeroQuery.getQuery()})`
        )
        .groupBy('token_id')
        .addSelect('count(pooltokenZero_filtered.id)', 'cnt_filtered')
        .addSelect('token.id', 'token_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('token.pooltokenZero', 'pooltokenZero_total')
        .groupBy('token_id')
        .addSelect('count(pooltokenZero_total.id)', 'cnt_total')
        .addSelect('token.id', 'token_id');

      const subQuery = `
                SELECT
                    f.token_id token_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.token_id = f.token_id`;

      if (pooltokenZero_none) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    pooltokenZero_subq.token_id
                FROM
                    (${subQuery}) pooltokenZero_subq
                WHERE
                    pooltokenZero_subq.cnt_filtered = 0
                )`);
      }

      if (pooltokenZero_some) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    pooltokenZero_subq.token_id
                FROM
                    (${subQuery}) pooltokenZero_subq
                WHERE
                    pooltokenZero_subq.cnt_filtered > 0
                )`);
      }

      if (pooltokenZero_every) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    pooltokenZero_subq.token_id
                FROM
                    (${subQuery}) pooltokenZero_subq
                WHERE
                    pooltokenZero_subq.cnt_filtered > 0
                    AND pooltokenZero_subq.cnt_filtered = pooltokenZero_subq.cnt_total
                )`);
      }
    }

    const pooltokenOneFilter = pooltokenOne_some || pooltokenOne_none || pooltokenOne_every;

    if (pooltokenOneFilter) {
      const pooltokenOneQuery = this.pooltokenOneService
        .buildFindQueryWithParams(<any>pooltokenOneFilter, undefined, undefined, ['id'], 'pooltokenOne')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...pooltokenOneQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'token.pooltokenOne',
          'pooltokenOne_filtered',
          `pooltokenOne_filtered.id IN (${pooltokenOneQuery.getQuery()})`
        )
        .groupBy('token_id')
        .addSelect('count(pooltokenOne_filtered.id)', 'cnt_filtered')
        .addSelect('token.id', 'token_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('token.pooltokenOne', 'pooltokenOne_total')
        .groupBy('token_id')
        .addSelect('count(pooltokenOne_total.id)', 'cnt_total')
        .addSelect('token.id', 'token_id');

      const subQuery = `
                SELECT
                    f.token_id token_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.token_id = f.token_id`;

      if (pooltokenOne_none) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    pooltokenOne_subq.token_id
                FROM
                    (${subQuery}) pooltokenOne_subq
                WHERE
                    pooltokenOne_subq.cnt_filtered = 0
                )`);
      }

      if (pooltokenOne_some) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    pooltokenOne_subq.token_id
                FROM
                    (${subQuery}) pooltokenOne_subq
                WHERE
                    pooltokenOne_subq.cnt_filtered > 0
                )`);
      }

      if (pooltokenOne_every) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    pooltokenOne_subq.token_id
                FROM
                    (${subQuery}) pooltokenOne_subq
                WHERE
                    pooltokenOne_subq.cnt_filtered > 0
                    AND pooltokenOne_subq.cnt_filtered = pooltokenOne_subq.cnt_total
                )`);
      }
    }

    const swapactiontokenZeroFilter = swapactiontokenZero_some || swapactiontokenZero_none || swapactiontokenZero_every;

    if (swapactiontokenZeroFilter) {
      const swapactiontokenZeroQuery = this.swapactiontokenZeroService
        .buildFindQueryWithParams(<any>swapactiontokenZeroFilter, undefined, undefined, ['id'], 'swapactiontokenZero')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...swapactiontokenZeroQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'token.swapactiontokenZero',
          'swapactiontokenZero_filtered',
          `swapactiontokenZero_filtered.id IN (${swapactiontokenZeroQuery.getQuery()})`
        )
        .groupBy('token_id')
        .addSelect('count(swapactiontokenZero_filtered.id)', 'cnt_filtered')
        .addSelect('token.id', 'token_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('token.swapactiontokenZero', 'swapactiontokenZero_total')
        .groupBy('token_id')
        .addSelect('count(swapactiontokenZero_total.id)', 'cnt_total')
        .addSelect('token.id', 'token_id');

      const subQuery = `
                SELECT
                    f.token_id token_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.token_id = f.token_id`;

      if (swapactiontokenZero_none) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    swapactiontokenZero_subq.token_id
                FROM
                    (${subQuery}) swapactiontokenZero_subq
                WHERE
                    swapactiontokenZero_subq.cnt_filtered = 0
                )`);
      }

      if (swapactiontokenZero_some) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    swapactiontokenZero_subq.token_id
                FROM
                    (${subQuery}) swapactiontokenZero_subq
                WHERE
                    swapactiontokenZero_subq.cnt_filtered > 0
                )`);
      }

      if (swapactiontokenZero_every) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    swapactiontokenZero_subq.token_id
                FROM
                    (${subQuery}) swapactiontokenZero_subq
                WHERE
                    swapactiontokenZero_subq.cnt_filtered > 0
                    AND swapactiontokenZero_subq.cnt_filtered = swapactiontokenZero_subq.cnt_total
                )`);
      }
    }

    const swapactiontokenOneFilter = swapactiontokenOne_some || swapactiontokenOne_none || swapactiontokenOne_every;

    if (swapactiontokenOneFilter) {
      const swapactiontokenOneQuery = this.swapactiontokenOneService
        .buildFindQueryWithParams(<any>swapactiontokenOneFilter, undefined, undefined, ['id'], 'swapactiontokenOne')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...swapactiontokenOneQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'token.swapactiontokenOne',
          'swapactiontokenOne_filtered',
          `swapactiontokenOne_filtered.id IN (${swapactiontokenOneQuery.getQuery()})`
        )
        .groupBy('token_id')
        .addSelect('count(swapactiontokenOne_filtered.id)', 'cnt_filtered')
        .addSelect('token.id', 'token_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('token.swapactiontokenOne', 'swapactiontokenOne_total')
        .groupBy('token_id')
        .addSelect('count(swapactiontokenOne_total.id)', 'cnt_total')
        .addSelect('token.id', 'token_id');

      const subQuery = `
                SELECT
                    f.token_id token_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.token_id = f.token_id`;

      if (swapactiontokenOne_none) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    swapactiontokenOne_subq.token_id
                FROM
                    (${subQuery}) swapactiontokenOne_subq
                WHERE
                    swapactiontokenOne_subq.cnt_filtered = 0
                )`);
      }

      if (swapactiontokenOne_some) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    swapactiontokenOne_subq.token_id
                FROM
                    (${subQuery}) swapactiontokenOne_subq
                WHERE
                    swapactiontokenOne_subq.cnt_filtered > 0
                )`);
      }

      if (swapactiontokenOne_every) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    swapactiontokenOne_subq.token_id
                FROM
                    (${subQuery}) swapactiontokenOne_subq
                WHERE
                    swapactiontokenOne_subq.cnt_filtered > 0
                    AND swapactiontokenOne_subq.cnt_filtered = swapactiontokenOne_subq.cnt_total
                )`);
      }
    }

    const tradetransferassetSentFilter =
      tradetransferassetSent_some || tradetransferassetSent_none || tradetransferassetSent_every;

    if (tradetransferassetSentFilter) {
      const tradetransferassetSentQuery = this.tradetransferassetSentService
        .buildFindQueryWithParams(
          <any>tradetransferassetSentFilter,
          undefined,
          undefined,
          ['id'],
          'tradetransferassetSent'
        )
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...tradetransferassetSentQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'token.tradetransferassetSent',
          'tradetransferassetSent_filtered',
          `tradetransferassetSent_filtered.id IN (${tradetransferassetSentQuery.getQuery()})`
        )
        .groupBy('token_id')
        .addSelect('count(tradetransferassetSent_filtered.id)', 'cnt_filtered')
        .addSelect('token.id', 'token_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('token.tradetransferassetSent', 'tradetransferassetSent_total')
        .groupBy('token_id')
        .addSelect('count(tradetransferassetSent_total.id)', 'cnt_total')
        .addSelect('token.id', 'token_id');

      const subQuery = `
                SELECT
                    f.token_id token_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.token_id = f.token_id`;

      if (tradetransferassetSent_none) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    tradetransferassetSent_subq.token_id
                FROM
                    (${subQuery}) tradetransferassetSent_subq
                WHERE
                    tradetransferassetSent_subq.cnt_filtered = 0
                )`);
      }

      if (tradetransferassetSent_some) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    tradetransferassetSent_subq.token_id
                FROM
                    (${subQuery}) tradetransferassetSent_subq
                WHERE
                    tradetransferassetSent_subq.cnt_filtered > 0
                )`);
      }

      if (tradetransferassetSent_every) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    tradetransferassetSent_subq.token_id
                FROM
                    (${subQuery}) tradetransferassetSent_subq
                WHERE
                    tradetransferassetSent_subq.cnt_filtered > 0
                    AND tradetransferassetSent_subq.cnt_filtered = tradetransferassetSent_subq.cnt_total
                )`);
      }
    }

    const tradetransferassetReceivedFilter =
      tradetransferassetReceived_some || tradetransferassetReceived_none || tradetransferassetReceived_every;

    if (tradetransferassetReceivedFilter) {
      const tradetransferassetReceivedQuery = this.tradetransferassetReceivedService
        .buildFindQueryWithParams(
          <any>tradetransferassetReceivedFilter,
          undefined,
          undefined,
          ['id'],
          'tradetransferassetReceived'
        )
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...tradetransferassetReceivedQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'token.tradetransferassetReceived',
          'tradetransferassetReceived_filtered',
          `tradetransferassetReceived_filtered.id IN (${tradetransferassetReceivedQuery.getQuery()})`
        )
        .groupBy('token_id')
        .addSelect('count(tradetransferassetReceived_filtered.id)', 'cnt_filtered')
        .addSelect('token.id', 'token_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('token.tradetransferassetReceived', 'tradetransferassetReceived_total')
        .groupBy('token_id')
        .addSelect('count(tradetransferassetReceived_total.id)', 'cnt_total')
        .addSelect('token.id', 'token_id');

      const subQuery = `
                SELECT
                    f.token_id token_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.token_id = f.token_id`;

      if (tradetransferassetReceived_none) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    tradetransferassetReceived_subq.token_id
                FROM
                    (${subQuery}) tradetransferassetReceived_subq
                WHERE
                    tradetransferassetReceived_subq.cnt_filtered = 0
                )`);
      }

      if (tradetransferassetReceived_some) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    tradetransferassetReceived_subq.token_id
                FROM
                    (${subQuery}) tradetransferassetReceived_subq
                WHERE
                    tradetransferassetReceived_subq.cnt_filtered > 0
                )`);
      }

      if (tradetransferassetReceived_every) {
        mainQuery = mainQuery.andWhere(`token.id IN
                (SELECT
                    tradetransferassetReceived_subq.token_id
                FROM
                    (${subQuery}) tradetransferassetReceived_subq
                WHERE
                    tradetransferassetReceived_subq.cnt_filtered > 0
                    AND tradetransferassetReceived_subq.cnt_filtered = tradetransferassetReceived_subq.cnt_total
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
