import { Service, Inject } from 'typedi';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput, HydraBaseService } from '@subsquid/warthog';

import { AssetPriceInTime } from './asset-price-in-time.model';

import { AssetPriceInTimeWhereArgs, AssetPriceInTimeWhereInput } from '../../warthog';

import { AssetPrice } from '../asset-price/asset-price.model';
import { AssetPriceService } from '../asset-price/asset-price.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('AssetPriceInTimeService')
export class AssetPriceInTimeService extends HydraBaseService<AssetPriceInTime> {
  @Inject('AssetPriceService')
  public readonly assetpricepricesService!: AssetPriceService;

  constructor(@InjectRepository(AssetPriceInTime) protected readonly repository: Repository<AssetPriceInTime>) {
    super(AssetPriceInTime, repository);
  }

  async find<W extends WhereInput>(
    where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<AssetPriceInTime[]> {
    return this.findWithRelations<W>(where, orderBy, limit, offset, fields);
  }

  findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<AssetPriceInTime[]> {
    return this.buildFindWithRelationsQuery(_where, orderBy, limit, offset, fields).getMany();
  }

  buildFindWithRelationsQuery<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): SelectQueryBuilder<AssetPriceInTime> {
    const where = <AssetPriceInTimeWhereInput>(_where || {});

    // remove relation filters to enable warthog query builders

    const { assetpriceprices_some, assetpriceprices_none, assetpriceprices_every } = where;

    if (+!!assetpriceprices_some + +!!assetpriceprices_none + +!!assetpriceprices_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.assetpriceprices_some;
    delete where.assetpriceprices_none;
    delete where.assetpriceprices_every;

    let mainQuery = this.buildFindQueryWithParams(<any>where, orderBy, undefined, fields, 'main').take(undefined); // remove LIMIT

    let parameters = mainQuery.getParameters();

    const assetpricepricesFilter = assetpriceprices_some || assetpriceprices_none || assetpriceprices_every;

    if (assetpricepricesFilter) {
      const assetpricepricesQuery = this.assetpricepricesService
        .buildFindQueryWithParams(<any>assetpricepricesFilter, undefined, undefined, ['id'], 'assetpriceprices')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...assetpricepricesQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin(
          'assetpriceintime.assetpriceprices',
          'assetpriceprices_filtered',
          `assetpriceprices_filtered.id IN (${assetpricepricesQuery.getQuery()})`
        )
        .groupBy('assetpriceintime_id')
        .addSelect('count(assetpriceprices_filtered.id)', 'cnt_filtered')
        .addSelect('assetpriceintime.id', 'assetpriceintime_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('assetpriceintime.assetpriceprices', 'assetpriceprices_total')
        .groupBy('assetpriceintime_id')
        .addSelect('count(assetpriceprices_total.id)', 'cnt_total')
        .addSelect('assetpriceintime.id', 'assetpriceintime_id');

      const subQuery = `
                SELECT
                    f.assetpriceintime_id assetpriceintime_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.assetpriceintime_id = f.assetpriceintime_id`;

      if (assetpriceprices_none) {
        mainQuery = mainQuery.andWhere(`assetpriceintime.id IN
                (SELECT
                    assetpriceprices_subq.assetpriceintime_id
                FROM
                    (${subQuery}) assetpriceprices_subq
                WHERE
                    assetpriceprices_subq.cnt_filtered = 0
                )`);
      }

      if (assetpriceprices_some) {
        mainQuery = mainQuery.andWhere(`assetpriceintime.id IN
                (SELECT
                    assetpriceprices_subq.assetpriceintime_id
                FROM
                    (${subQuery}) assetpriceprices_subq
                WHERE
                    assetpriceprices_subq.cnt_filtered > 0
                )`);
      }

      if (assetpriceprices_every) {
        mainQuery = mainQuery.andWhere(`assetpriceintime.id IN
                (SELECT
                    assetpriceprices_subq.assetpriceintime_id
                FROM
                    (${subQuery}) assetpriceprices_subq
                WHERE
                    assetpriceprices_subq.cnt_filtered > 0
                    AND assetpriceprices_subq.cnt_filtered = assetpriceprices_subq.cnt_total
                )`);
      }
    }

    mainQuery = mainQuery.setParameters(parameters);

    return mainQuery.take(limit || 50).skip(offset || 0);
  }
}
