import {
  Arg,
  Args,
  Mutation,
  Query,
  Root,
  Resolver,
  FieldResolver,
  ObjectType,
  Field,
  Int,
  ArgsType,
  Info,
  Ctx,
} from 'type-graphql';
import graphqlFields from 'graphql-fields';
import { Inject } from 'typedi';
import { Min } from 'class-validator';
import {
  Fields,
  StandardDeleteResponse,
  UserId,
  PageInfo,
  RawFields,
  NestedFields,
  BaseContext,
} from '@subsquid/warthog';

import {
  PoolAssetVolumeCreateInput,
  PoolAssetVolumeCreateManyArgs,
  PoolAssetVolumeUpdateArgs,
  PoolAssetVolumeWhereArgs,
  PoolAssetVolumeWhereInput,
  PoolAssetVolumeWhereUniqueInput,
  PoolAssetVolumeOrderByEnum,
} from '../../warthog';

import { PoolAssetVolume } from './pool-asset-volume.model';
import { PoolAssetVolumeService } from './pool-asset-volume.service';

import { Pool } from '../pool/pool.model';
import { PoolService } from '../pool/pool.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@ObjectType()
export class PoolAssetVolumeEdge {
  @Field(() => PoolAssetVolume, { nullable: false })
  node!: PoolAssetVolume;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class PoolAssetVolumeConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [PoolAssetVolumeEdge], { nullable: false })
  edges!: PoolAssetVolumeEdge[];

  @Field(() => PageInfo, { nullable: false })
  pageInfo!: PageInfo;
}

@ArgsType()
export class ConnectionPageInputOptions {
  @Field(() => Int, { nullable: true })
  @Min(0)
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string; // V3: TODO: should we make a RelayCursor scalar?

  @Field(() => Int, { nullable: true })
  @Min(0)
  last?: number;

  @Field(() => String, { nullable: true })
  before?: string;
}

@ArgsType()
export class PoolAssetVolumeConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => PoolAssetVolumeWhereInput, { nullable: true })
  where?: PoolAssetVolumeWhereInput;

  @Field(() => PoolAssetVolumeOrderByEnum, { nullable: true })
  orderBy?: [PoolAssetVolumeOrderByEnum];
}

@Resolver(PoolAssetVolume)
export class PoolAssetVolumeResolver {
  constructor(@Inject('PoolAssetVolumeService') public readonly service: PoolAssetVolumeService) {}

  @Query(() => [PoolAssetVolume])
  async poolAssetVolumes(
    @Args() { where, orderBy, limit, offset }: PoolAssetVolumeWhereArgs,
    @Fields() fields: string[]
  ): Promise<PoolAssetVolume[]> {
    return this.service.find<PoolAssetVolumeWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => PoolAssetVolume, { nullable: true })
  async poolAssetVolumeByUniqueInput(
    @Arg('where') where: PoolAssetVolumeWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<PoolAssetVolume | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => PoolAssetVolumeConnection)
  async poolAssetVolumesConnection(
    @Args() { where, orderBy, ...pageOptions }: PoolAssetVolumeConnectionWhereArgs,
    @Info() info: any
  ): Promise<PoolAssetVolumeConnection> {
    const rawFields = graphqlFields(info, {}, { excludedFields: ['__typename'] });

    let result: any = {
      totalCount: 0,
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
    // If the related database table does not have any records then an error is thrown to the client
    // by warthog
    try {
      result = await this.service.findConnection<PoolAssetVolumeWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<PoolAssetVolumeConnection>;
  }

  @FieldResolver(() => Pool)
  async pool(@Root() r: PoolAssetVolume, @Ctx() ctx: BaseContext): Promise<Pool | null> {
    return ctx.dataLoader.loaders.PoolAssetVolume.pool.load(r);
  }
}
