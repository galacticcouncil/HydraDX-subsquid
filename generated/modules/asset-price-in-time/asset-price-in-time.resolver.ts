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
  AssetPriceInTimeCreateInput,
  AssetPriceInTimeCreateManyArgs,
  AssetPriceInTimeUpdateArgs,
  AssetPriceInTimeWhereArgs,
  AssetPriceInTimeWhereInput,
  AssetPriceInTimeWhereUniqueInput,
  AssetPriceInTimeOrderByEnum,
} from '../../warthog';

import { AssetPriceInTime } from './asset-price-in-time.model';
import { AssetPriceInTimeService } from './asset-price-in-time.service';

import { AssetPrice } from '../asset-price/asset-price.model';
import { AssetPriceService } from '../asset-price/asset-price.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@ObjectType()
export class AssetPriceInTimeEdge {
  @Field(() => AssetPriceInTime, { nullable: false })
  node!: AssetPriceInTime;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class AssetPriceInTimeConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [AssetPriceInTimeEdge], { nullable: false })
  edges!: AssetPriceInTimeEdge[];

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
export class AssetPriceInTimeConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => AssetPriceInTimeWhereInput, { nullable: true })
  where?: AssetPriceInTimeWhereInput;

  @Field(() => AssetPriceInTimeOrderByEnum, { nullable: true })
  orderBy?: [AssetPriceInTimeOrderByEnum];
}

@Resolver(AssetPriceInTime)
export class AssetPriceInTimeResolver {
  constructor(@Inject('AssetPriceInTimeService') public readonly service: AssetPriceInTimeService) {}

  @Query(() => [AssetPriceInTime])
  async assetPriceInTimes(
    @Args() { where, orderBy, limit, offset }: AssetPriceInTimeWhereArgs,
    @Fields() fields: string[]
  ): Promise<AssetPriceInTime[]> {
    return this.service.find<AssetPriceInTimeWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => AssetPriceInTime, { nullable: true })
  async assetPriceInTimeByUniqueInput(
    @Arg('where') where: AssetPriceInTimeWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<AssetPriceInTime | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => AssetPriceInTimeConnection)
  async assetPriceInTimesConnection(
    @Args() { where, orderBy, ...pageOptions }: AssetPriceInTimeConnectionWhereArgs,
    @Info() info: any
  ): Promise<AssetPriceInTimeConnection> {
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
      result = await this.service.findConnection<AssetPriceInTimeWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err: any) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<AssetPriceInTimeConnection>;
  }

  @FieldResolver(() => AssetPrice)
  async assetpriceprices(@Root() r: AssetPriceInTime, @Ctx() ctx: BaseContext): Promise<AssetPrice[] | null> {
    return ctx.dataLoader.loaders.AssetPriceInTime.assetpriceprices.load(r);
  }
}
