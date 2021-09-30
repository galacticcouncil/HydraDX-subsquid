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
  SumRewardCreateInput,
  SumRewardCreateManyArgs,
  SumRewardUpdateArgs,
  SumRewardWhereArgs,
  SumRewardWhereInput,
  SumRewardWhereUniqueInput,
  SumRewardOrderByEnum,
} from '../../warthog';

import { SumReward } from './sum-reward.model';
import { SumRewardService } from './sum-reward.service';

@ObjectType()
export class SumRewardEdge {
  @Field(() => SumReward, { nullable: false })
  node!: SumReward;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class SumRewardConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [SumRewardEdge], { nullable: false })
  edges!: SumRewardEdge[];

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
export class SumRewardConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => SumRewardWhereInput, { nullable: true })
  where?: SumRewardWhereInput;

  @Field(() => SumRewardOrderByEnum, { nullable: true })
  orderBy?: [SumRewardOrderByEnum];
}

@Resolver(SumReward)
export class SumRewardResolver {
  constructor(@Inject('SumRewardService') public readonly service: SumRewardService) {}

  @Query(() => [SumReward])
  async sumRewards(
    @Args() { where, orderBy, limit, offset }: SumRewardWhereArgs,
    @Fields() fields: string[]
  ): Promise<SumReward[]> {
    return this.service.find<SumRewardWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => SumReward, { nullable: true })
  async sumRewardByUniqueInput(
    @Arg('where') where: SumRewardWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<SumReward | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => SumRewardConnection)
  async sumRewardsConnection(
    @Args() { where, orderBy, ...pageOptions }: SumRewardConnectionWhereArgs,
    @Info() info: any
  ): Promise<SumRewardConnection> {
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
      result = await this.service.findConnection<SumRewardWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err: any) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<SumRewardConnection>;
  }
}
