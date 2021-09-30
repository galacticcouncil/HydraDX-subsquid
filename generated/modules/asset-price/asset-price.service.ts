import { Service, Inject } from 'typedi';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput, HydraBaseService } from '@subsquid/warthog';

import { AssetPrice } from './asset-price.model';

import { AssetPriceWhereArgs, AssetPriceWhereInput } from '../../warthog';

import { Token } from '../token/token.model';
import { TokenService } from '../token/token.service';
import { AssetPriceInTime } from '../asset-price-in-time/asset-price-in-time.model';
import { AssetPriceInTimeService } from '../asset-price-in-time/asset-price-in-time.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('AssetPriceService')
export class AssetPriceService extends HydraBaseService<AssetPrice> {
  @Inject('TokenService')
  public readonly tokenZeroService!: TokenService;
  @Inject('TokenService')
  public readonly tokenOneService!: TokenService;
  @Inject('AssetPriceInTimeService')
  public readonly pricesService!: AssetPriceInTimeService;

  constructor(@InjectRepository(AssetPrice) protected readonly repository: Repository<AssetPrice>) {
    super(AssetPrice, repository);
  }

  async find<W extends WhereInput>(
    where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<AssetPrice[]> {
    return this.findWithRelations<W>(where, orderBy, limit, offset, fields);
  }

  findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<AssetPrice[]> {
    return this.buildFindWithRelationsQuery(_where, orderBy, limit, offset, fields).getMany();
  }

  buildFindWithRelationsQuery<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): SelectQueryBuilder<AssetPrice> {
    const where = <AssetPriceWhereInput>(_where || {});

    // remove relation filters to enable warthog query builders
    const { tokenZero } = where;
    delete where.tokenZero;

    // remove relation filters to enable warthog query builders
    const { tokenOne } = where;
    delete where.tokenOne;

    // remove relation filters to enable warthog query builders
    const { prices } = where;
    delete where.prices;

    let mainQuery = this.buildFindQueryWithParams(<any>where, orderBy, undefined, fields, 'main').take(undefined); // remove LIMIT

    let parameters = mainQuery.getParameters();

    if (tokenZero) {
      // OTO or MTO
      const tokenZeroQuery = this.tokenZeroService
        .buildFindQueryWithParams(<any>tokenZero, undefined, undefined, ['id'], 'tokenZero')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"assetprice"."token_zero_id" IN (${tokenZeroQuery.getQuery()})`);

      parameters = { ...parameters, ...tokenZeroQuery.getParameters() };
    }

    if (tokenOne) {
      // OTO or MTO
      const tokenOneQuery = this.tokenOneService
        .buildFindQueryWithParams(<any>tokenOne, undefined, undefined, ['id'], 'tokenOne')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"assetprice"."token_one_id" IN (${tokenOneQuery.getQuery()})`);

      parameters = { ...parameters, ...tokenOneQuery.getParameters() };
    }

    if (prices) {
      // OTO or MTO
      const pricesQuery = this.pricesService
        .buildFindQueryWithParams(<any>prices, undefined, undefined, ['id'], 'prices')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"assetprice"."prices_id" IN (${pricesQuery.getQuery()})`);

      parameters = { ...parameters, ...pricesQuery.getParameters() };
    }

    mainQuery = mainQuery.setParameters(parameters);

    return mainQuery.take(limit || 50).skip(offset || 0);
  }
}
