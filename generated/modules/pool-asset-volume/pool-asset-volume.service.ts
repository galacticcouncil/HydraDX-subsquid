import { Service, Inject } from 'typedi';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput, HydraBaseService } from '@subsquid/warthog';

import { PoolAssetVolume } from './pool-asset-volume.model';

import { PoolAssetVolumeWhereArgs, PoolAssetVolumeWhereInput } from '../../warthog';

import { Pool } from '../pool/pool.model';
import { PoolService } from '../pool/pool.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('PoolAssetVolumeService')
export class PoolAssetVolumeService extends HydraBaseService<PoolAssetVolume> {
  @Inject('PoolService')
  public readonly poolService!: PoolService;

  constructor(@InjectRepository(PoolAssetVolume) protected readonly repository: Repository<PoolAssetVolume>) {
    super(PoolAssetVolume, repository);
  }

  async find<W extends WhereInput>(
    where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<PoolAssetVolume[]> {
    return this.findWithRelations<W>(where, orderBy, limit, offset, fields);
  }

  findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<PoolAssetVolume[]> {
    return this.buildFindWithRelationsQuery(_where, orderBy, limit, offset, fields).getMany();
  }

  buildFindWithRelationsQuery<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): SelectQueryBuilder<PoolAssetVolume> {
    const where = <PoolAssetVolumeWhereInput>(_where || {});

    // remove relation filters to enable warthog query builders
    const { pool } = where;
    delete where.pool;

    let mainQuery = this.buildFindQueryWithParams(<any>where, orderBy, undefined, fields, 'main').take(undefined); // remove LIMIT

    let parameters = mainQuery.getParameters();

    if (pool) {
      // OTO or MTO
      const poolQuery = this.poolService
        .buildFindQueryWithParams(<any>pool, undefined, undefined, ['id'], 'pool')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"poolassetvolume"."pool_id" IN (${poolQuery.getQuery()})`);

      parameters = { ...parameters, ...poolQuery.getParameters() };
    }

    mainQuery = mainQuery.setParameters(parameters);

    return mainQuery.take(limit || 50).skip(offset || 0);
  }
}
