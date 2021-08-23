import { Service, Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput, HydraBaseService } from '@subsquid/warthog';

import { Pool } from './pool.model';

import { PoolWhereArgs, PoolWhereInput } from '../../warthog';

import { Token } from '../token/token.model';
import { TokenService } from '../token/token.service';
import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { SwapAction } from '../swap-action/swap-action.model';
import { SwapActionService } from '../swap-action/swap-action.service';
import { PoolAssetVolume } from '../pool-asset-volume/pool-asset-volume.model';
import { PoolAssetVolumeService } from '../pool-asset-volume/pool-asset-volume.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('PoolService')
export class PoolService extends HydraBaseService<Pool> {
  @Inject('TokenService')
  public readonly sharedAssetService!: TokenService;
  @Inject('AccountService')
  public readonly ownerAccountService!: AccountService;
  @Inject('TokenService')
  public readonly tokenZeroService!: TokenService;
  @Inject('TokenService')
  public readonly tokenOneService!: TokenService;
  @Inject('SwapActionService')
  public readonly swapActionsService!: SwapActionService;
  @Inject('PoolAssetVolumeService')
  public readonly assetsVolumeService!: PoolAssetVolumeService;
  @Inject('TokenService')
  public readonly tokenparentPoolService!: TokenService;

  constructor(@InjectRepository(Pool) protected readonly repository: Repository<Pool>) {
    super(Pool, repository);
  }

  async find<W extends WhereInput>(
    where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<Pool[]> {
    return this.findWithRelations<W>(where, orderBy, limit, offset, fields);
  }

  async findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<Pool[]> {
    const where = <PoolWhereInput>(_where || {});

    // remove relation filters to enable warthog query builders
    const { sharedAsset } = where;
    delete where.sharedAsset;

    // remove relation filters to enable warthog query builders
    const { ownerAccount } = where;
    delete where.ownerAccount;

    // remove relation filters to enable warthog query builders
    const { tokenZero } = where;
    delete where.tokenZero;

    // remove relation filters to enable warthog query builders
    const { tokenOne } = where;
    delete where.tokenOne;

    // remove relation filters to enable warthog query builders

    const { swapActions_some, swapActions_none, swapActions_every } = where;

    if (+!!swapActions_some + +!!swapActions_none + +!!swapActions_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.swapActions_some;
    delete where.swapActions_none;
    delete where.swapActions_every;
    // remove relation filters to enable warthog query builders

    const { assetsVolume_some, assetsVolume_none, assetsVolume_every } = where;

    if (+!!assetsVolume_some + +!!assetsVolume_none + +!!assetsVolume_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.assetsVolume_some;
    delete where.assetsVolume_none;
    delete where.assetsVolume_every;
    // remove relation filters to enable warthog query builders

    const { tokenparentPool_some, tokenparentPool_none, tokenparentPool_every } = where;

    if (+!!tokenparentPool_some + +!!tokenparentPool_none + +!!tokenparentPool_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.tokenparentPool_some;
    delete where.tokenparentPool_none;
    delete where.tokenparentPool_every;

    let mainQuery = this.buildFindQueryWithParams(<any>where, orderBy, undefined, fields, 'main').take(undefined); // remove LIMIT

    let parameters = mainQuery.getParameters();

    if (sharedAsset) {
      // OTO or MTO
      const sharedAssetQuery = this.sharedAssetService
        .buildFindQueryWithParams(<any>sharedAsset, undefined, undefined, ['id'], 'sharedAsset')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"pool"."shared_asset_id" IN (${sharedAssetQuery.getQuery()})`);

      parameters = { ...parameters, ...sharedAssetQuery.getParameters() };
    }

    if (ownerAccount) {
      // OTO or MTO
      const ownerAccountQuery = this.ownerAccountService
        .buildFindQueryWithParams(<any>ownerAccount, undefined, undefined, ['id'], 'ownerAccount')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"pool"."owner_account_id" IN (${ownerAccountQuery.getQuery()})`);

      parameters = { ...parameters, ...ownerAccountQuery.getParameters() };
    }

    if (tokenZero) {
      // OTO or MTO
      const tokenZeroQuery = this.tokenZeroService
        .buildFindQueryWithParams(<any>tokenZero, undefined, undefined, ['id'], 'tokenZero')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"pool"."token_zero_id" IN (${tokenZeroQuery.getQuery()})`);

      parameters = { ...parameters, ...tokenZeroQuery.getParameters() };
    }

    if (tokenOne) {
      // OTO or MTO
      const tokenOneQuery = this.tokenOneService
        .buildFindQueryWithParams(<any>tokenOne, undefined, undefined, ['id'], 'tokenOne')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"pool"."token_one_id" IN (${tokenOneQuery.getQuery()})`);

      parameters = { ...parameters, ...tokenOneQuery.getParameters() };
    }

    const swapActionsFilter = swapActions_some || swapActions_none || swapActions_every;

    if (swapActionsFilter) {
      const swapActionsQuery = this.swapActionsService
        .buildFindQueryWithParams(<any>swapActionsFilter, undefined, undefined, ['id'], 'swapActions')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...swapActionsQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'pool.swapActions',
          'swapActions_filtered',
          `swapActions_filtered.id IN (${swapActionsQuery.getQuery()})`
        )
        .groupBy('pool_id')
        .addSelect('count(swapActions_filtered.id)', 'cnt_filtered')
        .addSelect('pool.id', 'pool_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('pool.swapActions', 'swapActions_total')
        .groupBy('pool_id')
        .addSelect('count(swapActions_total.id)', 'cnt_total')
        .addSelect('pool.id', 'pool_id');

      const subQuery = `
                SELECT
                    f.pool_id pool_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.pool_id = f.pool_id`;

      if (swapActions_none) {
        mainQuery = mainQuery.andWhere(`pool.id IN
                (SELECT
                    swapActions_subq.pool_id
                FROM
                    (${subQuery}) swapActions_subq
                WHERE
                    swapActions_subq.cnt_filtered = 0
                )`);
      }

      if (swapActions_some) {
        mainQuery = mainQuery.andWhere(`pool.id IN
                (SELECT
                    swapActions_subq.pool_id
                FROM
                    (${subQuery}) swapActions_subq
                WHERE
                    swapActions_subq.cnt_filtered > 0
                )`);
      }

      if (swapActions_every) {
        mainQuery = mainQuery.andWhere(`pool.id IN
                (SELECT
                    swapActions_subq.pool_id
                FROM
                    (${subQuery}) swapActions_subq
                WHERE
                    swapActions_subq.cnt_filtered > 0
                    AND swapActions_subq.cnt_filtered = swapActions_subq.cnt_total
                )`);
      }
    }

    const assetsVolumeFilter = assetsVolume_some || assetsVolume_none || assetsVolume_every;

    if (assetsVolumeFilter) {
      const assetsVolumeQuery = this.assetsVolumeService
        .buildFindQueryWithParams(<any>assetsVolumeFilter, undefined, undefined, ['id'], 'assetsVolume')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...assetsVolumeQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'pool.assetsVolume',
          'assetsVolume_filtered',
          `assetsVolume_filtered.id IN (${assetsVolumeQuery.getQuery()})`
        )
        .groupBy('pool_id')
        .addSelect('count(assetsVolume_filtered.id)', 'cnt_filtered')
        .addSelect('pool.id', 'pool_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('pool.assetsVolume', 'assetsVolume_total')
        .groupBy('pool_id')
        .addSelect('count(assetsVolume_total.id)', 'cnt_total')
        .addSelect('pool.id', 'pool_id');

      const subQuery = `
                SELECT
                    f.pool_id pool_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.pool_id = f.pool_id`;

      if (assetsVolume_none) {
        mainQuery = mainQuery.andWhere(`pool.id IN
                (SELECT
                    assetsVolume_subq.pool_id
                FROM
                    (${subQuery}) assetsVolume_subq
                WHERE
                    assetsVolume_subq.cnt_filtered = 0
                )`);
      }

      if (assetsVolume_some) {
        mainQuery = mainQuery.andWhere(`pool.id IN
                (SELECT
                    assetsVolume_subq.pool_id
                FROM
                    (${subQuery}) assetsVolume_subq
                WHERE
                    assetsVolume_subq.cnt_filtered > 0
                )`);
      }

      if (assetsVolume_every) {
        mainQuery = mainQuery.andWhere(`pool.id IN
                (SELECT
                    assetsVolume_subq.pool_id
                FROM
                    (${subQuery}) assetsVolume_subq
                WHERE
                    assetsVolume_subq.cnt_filtered > 0
                    AND assetsVolume_subq.cnt_filtered = assetsVolume_subq.cnt_total
                )`);
      }
    }

    const tokenparentPoolFilter = tokenparentPool_some || tokenparentPool_none || tokenparentPool_every;

    if (tokenparentPoolFilter) {
      const tokenparentPoolQuery = this.tokenparentPoolService
        .buildFindQueryWithParams(<any>tokenparentPoolFilter, undefined, undefined, ['id'], 'tokenparentPool')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...tokenparentPoolQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'pool.tokenparentPool',
          'tokenparentPool_filtered',
          `tokenparentPool_filtered.id IN (${tokenparentPoolQuery.getQuery()})`
        )
        .groupBy('pool_id')
        .addSelect('count(tokenparentPool_filtered.id)', 'cnt_filtered')
        .addSelect('pool.id', 'pool_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('pool.tokenparentPool', 'tokenparentPool_total')
        .groupBy('pool_id')
        .addSelect('count(tokenparentPool_total.id)', 'cnt_total')
        .addSelect('pool.id', 'pool_id');

      const subQuery = `
                SELECT
                    f.pool_id pool_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.pool_id = f.pool_id`;

      if (tokenparentPool_none) {
        mainQuery = mainQuery.andWhere(`pool.id IN
                (SELECT
                    tokenparentPool_subq.pool_id
                FROM
                    (${subQuery}) tokenparentPool_subq
                WHERE
                    tokenparentPool_subq.cnt_filtered = 0
                )`);
      }

      if (tokenparentPool_some) {
        mainQuery = mainQuery.andWhere(`pool.id IN
                (SELECT
                    tokenparentPool_subq.pool_id
                FROM
                    (${subQuery}) tokenparentPool_subq
                WHERE
                    tokenparentPool_subq.cnt_filtered > 0
                )`);
      }

      if (tokenparentPool_every) {
        mainQuery = mainQuery.andWhere(`pool.id IN
                (SELECT
                    tokenparentPool_subq.pool_id
                FROM
                    (${subQuery}) tokenparentPool_subq
                WHERE
                    tokenparentPool_subq.cnt_filtered > 0
                    AND tokenparentPool_subq.cnt_filtered = tokenparentPool_subq.cnt_total
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
