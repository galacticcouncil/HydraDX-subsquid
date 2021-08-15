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
  Ctx
} from 'type-graphql';
import graphqlFields from 'graphql-fields';
import { Inject } from 'typedi';
import { Min } from 'class-validator';
import { Fields, StandardDeleteResponse, UserId, PageInfo, RawFields, NestedFields, BaseContext } from 'warthog';

import {
  AssetPriceCreateInput,
  AssetPriceCreateManyArgs,
  AssetPriceUpdateArgs,
  AssetPriceWhereArgs,
  AssetPriceWhereInput,
  AssetPriceWhereUniqueInput,
  AssetPriceOrderByEnum
} from '../../warthog';

import { AssetPrice } from './asset-price.model';
import { AssetPriceService } from './asset-price.service';

import { Token } from '../token/token.model';
import { TokenService } from '../token/token.service';
import { AssetPriceInTime } from '../asset-price-in-time/asset-price-in-time.model';
import { AssetPriceInTimeService } from '../asset-price-in-time/asset-price-in-time.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@ObjectType()
export class AssetPriceEdge {
  @Field(() => AssetPrice, { nullable: false })
  node!: AssetPrice;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class AssetPriceConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [AssetPriceEdge], { nullable: false })
  edges!: AssetPriceEdge[];

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
export class AssetPriceConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => AssetPriceWhereInput, { nullable: true })
  where?: AssetPriceWhereInput;

  @Field(() => AssetPriceOrderByEnum, { nullable: true })
  orderBy?: [AssetPriceOrderByEnum];
}

@Resolver(AssetPrice)
export class AssetPriceResolver {
  constructor(@Inject('AssetPriceService') public readonly service: AssetPriceService) {}

  @Query(() => [AssetPrice])
  async assetPrices(
    @Args() { where, orderBy, limit, offset }: AssetPriceWhereArgs,
    @Fields() fields: string[]
  ): Promise<AssetPrice[]> {
    return this.service.find<AssetPriceWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => AssetPrice, { nullable: true })
  async assetPriceByUniqueInput(
    @Arg('where') where: AssetPriceWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<AssetPrice | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => AssetPriceConnection)
  async assetPricesConnection(
    @Args() { where, orderBy, ...pageOptions }: AssetPriceConnectionWhereArgs,
    @Info() info: any
  ): Promise<AssetPriceConnection> {
    const rawFields = graphqlFields(info, {}, { excludedFields: ['__typename'] });

    let result: any = {
      totalCount: 0,
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false
      }
    };
    // If the related database table does not have any records then an error is thrown to the client
    // by warthog
    try {
      result = await this.service.findConnection<AssetPriceWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<AssetPriceConnection>;
  }

  @FieldResolver(() => Token)
  async tokenZero(@Root() r: AssetPrice, @Ctx() ctx: BaseContext): Promise<Token | null> {
    return ctx.dataLoader.loaders.AssetPrice.tokenZero.load(r);
  }

  @FieldResolver(() => Token)
  async tokenOne(@Root() r: AssetPrice, @Ctx() ctx: BaseContext): Promise<Token | null> {
    return ctx.dataLoader.loaders.AssetPrice.tokenOne.load(r);
  }

  @FieldResolver(() => AssetPriceInTime)
  async prices(@Root() r: AssetPrice, @Ctx() ctx: BaseContext): Promise<AssetPriceInTime | null> {
    return ctx.dataLoader.loaders.AssetPrice.prices.load(r);
  }
}
