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
  TradeTransferCreateInput,
  TradeTransferCreateManyArgs,
  TradeTransferUpdateArgs,
  TradeTransferWhereArgs,
  TradeTransferWhereInput,
  TradeTransferWhereUniqueInput,
  TradeTransferOrderByEnum,
} from '../../warthog';

import { TradeTransfer } from './trade-transfer.model';
import { TradeTransferService } from './trade-transfer.service';

import { SwapAction } from '../swap-action/swap-action.model';
import { SwapActionService } from '../swap-action/swap-action.service';
import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@ObjectType()
export class TradeTransferEdge {
  @Field(() => TradeTransfer, { nullable: false })
  node!: TradeTransfer;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class TradeTransferConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [TradeTransferEdge], { nullable: false })
  edges!: TradeTransferEdge[];

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
export class TradeTransferConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => TradeTransferWhereInput, { nullable: true })
  where?: TradeTransferWhereInput;

  @Field(() => TradeTransferOrderByEnum, { nullable: true })
  orderBy?: [TradeTransferOrderByEnum];
}

@Resolver(TradeTransfer)
export class TradeTransferResolver {
  constructor(@Inject('TradeTransferService') public readonly service: TradeTransferService) {}

  @Query(() => [TradeTransfer])
  async tradeTransfers(
    @Args() { where, orderBy, limit, offset }: TradeTransferWhereArgs,
    @Fields() fields: string[]
  ): Promise<TradeTransfer[]> {
    return this.service.find<TradeTransferWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => TradeTransfer, { nullable: true })
  async tradeTransferByUniqueInput(
    @Arg('where') where: TradeTransferWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<TradeTransfer | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => TradeTransferConnection)
  async tradeTransfersConnection(
    @Args() { where, orderBy, ...pageOptions }: TradeTransferConnectionWhereArgs,
    @Info() info: any
  ): Promise<TradeTransferConnection> {
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
      result = await this.service.findConnection<TradeTransferWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<TradeTransferConnection>;
  }

  @FieldResolver(() => SwapAction)
  async swapAction(@Root() r: TradeTransfer, @Ctx() ctx: BaseContext): Promise<SwapAction | null> {
    return ctx.dataLoader.loaders.TradeTransfer.swapAction.load(r);
  }

  @FieldResolver(() => Account)
  async accountTo(@Root() r: TradeTransfer, @Ctx() ctx: BaseContext): Promise<Account | null> {
    return ctx.dataLoader.loaders.TradeTransfer.accountTo.load(r);
  }

  @FieldResolver(() => Account)
  async accountFrom(@Root() r: TradeTransfer, @Ctx() ctx: BaseContext): Promise<Account | null> {
    return ctx.dataLoader.loaders.TradeTransfer.accountFrom.load(r);
  }
}
