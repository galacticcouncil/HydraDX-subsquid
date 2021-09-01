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
  TokenCreateInput,
  TokenCreateManyArgs,
  TokenUpdateArgs,
  TokenWhereArgs,
  TokenWhereInput,
  TokenWhereUniqueInput,
  TokenOrderByEnum,
} from '../../warthog';

import { Token } from './token.model';
import { TokenService } from './token.service';

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

@ObjectType()
export class TokenEdge {
  @Field(() => Token, { nullable: false })
  node!: Token;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class TokenConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [TokenEdge], { nullable: false })
  edges!: TokenEdge[];

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
export class TokenConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => TokenWhereInput, { nullable: true })
  where?: TokenWhereInput;

  @Field(() => TokenOrderByEnum, { nullable: true })
  orderBy?: [TokenOrderByEnum];
}

@Resolver(Token)
export class TokenResolver {
  constructor(@Inject('TokenService') public readonly service: TokenService) {}

  @Query(() => [Token])
  async tokens(
    @Args() { where, orderBy, limit, offset }: TokenWhereArgs,
    @Fields() fields: string[]
  ): Promise<Token[]> {
    return this.service.find<TokenWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => Token, { nullable: true })
  async tokenByUniqueInput(
    @Arg('where') where: TokenWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<Token | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => TokenConnection)
  async tokensConnection(
    @Args() { where, orderBy, ...pageOptions }: TokenConnectionWhereArgs,
    @Info() info: any
  ): Promise<TokenConnection> {
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
      result = await this.service.findConnection<TokenWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<TokenConnection>;
  }

  @FieldResolver(() => Pool)
  async parentPool(@Root() r: Token, @Ctx() ctx: BaseContext): Promise<Pool | null> {
    return ctx.dataLoader.loaders.Token.parentPool.load(r);
  }

  @FieldResolver(() => AssetPrice)
  async assetpricetokenZero(@Root() r: Token, @Ctx() ctx: BaseContext): Promise<AssetPrice[] | null> {
    return ctx.dataLoader.loaders.Token.assetpricetokenZero.load(r);
  }

  @FieldResolver(() => AssetPrice)
  async assetpricetokenOne(@Root() r: Token, @Ctx() ctx: BaseContext): Promise<AssetPrice[] | null> {
    return ctx.dataLoader.loaders.Token.assetpricetokenOne.load(r);
  }

  @FieldResolver(() => Pool)
  async poolsharedToken(@Root() r: Token, @Ctx() ctx: BaseContext): Promise<Pool[] | null> {
    return ctx.dataLoader.loaders.Token.poolsharedToken.load(r);
  }

  @FieldResolver(() => Pool)
  async pooltokenZero(@Root() r: Token, @Ctx() ctx: BaseContext): Promise<Pool[] | null> {
    return ctx.dataLoader.loaders.Token.pooltokenZero.load(r);
  }

  @FieldResolver(() => Pool)
  async pooltokenOne(@Root() r: Token, @Ctx() ctx: BaseContext): Promise<Pool[] | null> {
    return ctx.dataLoader.loaders.Token.pooltokenOne.load(r);
  }

  @FieldResolver(() => SwapAction)
  async swapactiontokenZero(@Root() r: Token, @Ctx() ctx: BaseContext): Promise<SwapAction[] | null> {
    return ctx.dataLoader.loaders.Token.swapactiontokenZero.load(r);
  }

  @FieldResolver(() => SwapAction)
  async swapactiontokenOne(@Root() r: Token, @Ctx() ctx: BaseContext): Promise<SwapAction[] | null> {
    return ctx.dataLoader.loaders.Token.swapactiontokenOne.load(r);
  }

  @FieldResolver(() => TradeTransfer)
  async tradetransferassetSent(@Root() r: Token, @Ctx() ctx: BaseContext): Promise<TradeTransfer[] | null> {
    return ctx.dataLoader.loaders.Token.tradetransferassetSent.load(r);
  }

  @FieldResolver(() => TradeTransfer)
  async tradetransferassetReceived(@Root() r: Token, @Ctx() ctx: BaseContext): Promise<TradeTransfer[] | null> {
    return ctx.dataLoader.loaders.Token.tradetransferassetReceived.load(r);
  }
}
