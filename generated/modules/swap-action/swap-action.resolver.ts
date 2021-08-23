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
  SwapActionCreateInput,
  SwapActionCreateManyArgs,
  SwapActionUpdateArgs,
  SwapActionWhereArgs,
  SwapActionWhereInput,
  SwapActionWhereUniqueInput,
  SwapActionOrderByEnum,
} from '../../warthog';

import { SwapAction } from './swap-action.model';
import { SwapActionService } from './swap-action.service';

import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { Token } from '../token/token.model';
import { TokenService } from '../token/token.service';
import { Pool } from '../pool/pool.model';
import { PoolService } from '../pool/pool.service';
import { TradeTransfer } from '../trade-transfer/trade-transfer.model';
import { TradeTransferService } from '../trade-transfer/trade-transfer.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@ObjectType()
export class SwapActionEdge {
  @Field(() => SwapAction, { nullable: false })
  node!: SwapAction;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class SwapActionConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [SwapActionEdge], { nullable: false })
  edges!: SwapActionEdge[];

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
export class SwapActionConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => SwapActionWhereInput, { nullable: true })
  where?: SwapActionWhereInput;

  @Field(() => SwapActionOrderByEnum, { nullable: true })
  orderBy?: [SwapActionOrderByEnum];
}

@Resolver(SwapAction)
export class SwapActionResolver {
  constructor(@Inject('SwapActionService') public readonly service: SwapActionService) {}

  @Query(() => [SwapAction])
  async swapActions(
    @Args() { where, orderBy, limit, offset }: SwapActionWhereArgs,
    @Fields() fields: string[]
  ): Promise<SwapAction[]> {
    return this.service.find<SwapActionWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => SwapAction, { nullable: true })
  async swapActionByUniqueInput(
    @Arg('where') where: SwapActionWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<SwapAction | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => SwapActionConnection)
  async swapActionsConnection(
    @Args() { where, orderBy, ...pageOptions }: SwapActionConnectionWhereArgs,
    @Info() info: any
  ): Promise<SwapActionConnection> {
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
      result = await this.service.findConnection<SwapActionWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<SwapActionConnection>;
  }

  @FieldResolver(() => Account)
  async account(@Root() r: SwapAction, @Ctx() ctx: BaseContext): Promise<Account | null> {
    return ctx.dataLoader.loaders.SwapAction.account.load(r);
  }

  @FieldResolver(() => Token)
  async tokenZero(@Root() r: SwapAction, @Ctx() ctx: BaseContext): Promise<Token | null> {
    return ctx.dataLoader.loaders.SwapAction.tokenZero.load(r);
  }

  @FieldResolver(() => Token)
  async tokenOne(@Root() r: SwapAction, @Ctx() ctx: BaseContext): Promise<Token | null> {
    return ctx.dataLoader.loaders.SwapAction.tokenOne.load(r);
  }

  @FieldResolver(() => Pool)
  async xykTradePool(@Root() r: SwapAction, @Ctx() ctx: BaseContext): Promise<Pool | null> {
    return ctx.dataLoader.loaders.SwapAction.xykTradePool.load(r);
  }

  @FieldResolver(() => TradeTransfer)
  async directTrades(@Root() r: SwapAction, @Ctx() ctx: BaseContext): Promise<TradeTransfer[] | null> {
    return ctx.dataLoader.loaders.SwapAction.directTrades.load(r);
  }
}
