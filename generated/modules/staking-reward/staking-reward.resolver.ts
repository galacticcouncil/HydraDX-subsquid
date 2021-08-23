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
  StakingRewardCreateInput,
  StakingRewardCreateManyArgs,
  StakingRewardUpdateArgs,
  StakingRewardWhereArgs,
  StakingRewardWhereInput,
  StakingRewardWhereUniqueInput,
  StakingRewardOrderByEnum,
} from '../../warthog';

import { StakingReward } from './staking-reward.model';
import { StakingRewardService } from './staking-reward.service';

@ObjectType()
export class StakingRewardEdge {
  @Field(() => StakingReward, { nullable: false })
  node!: StakingReward;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class StakingRewardConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [StakingRewardEdge], { nullable: false })
  edges!: StakingRewardEdge[];

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
export class StakingRewardConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => StakingRewardWhereInput, { nullable: true })
  where?: StakingRewardWhereInput;

  @Field(() => StakingRewardOrderByEnum, { nullable: true })
  orderBy?: [StakingRewardOrderByEnum];
}

@Resolver(StakingReward)
export class StakingRewardResolver {
  constructor(@Inject('StakingRewardService') public readonly service: StakingRewardService) {}

  @Query(() => [StakingReward])
  async stakingRewards(
    @Args() { where, orderBy, limit, offset }: StakingRewardWhereArgs,
    @Fields() fields: string[]
  ): Promise<StakingReward[]> {
    return this.service.find<StakingRewardWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => StakingReward, { nullable: true })
  async stakingRewardByUniqueInput(
    @Arg('where') where: StakingRewardWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<StakingReward | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => StakingRewardConnection)
  async stakingRewardsConnection(
    @Args() { where, orderBy, ...pageOptions }: StakingRewardConnectionWhereArgs,
    @Info() info: any
  ): Promise<StakingRewardConnection> {
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
      result = await this.service.findConnection<StakingRewardWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<StakingRewardConnection>;
  }
}
