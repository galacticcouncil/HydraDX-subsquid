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
  StakingSlashCreateInput,
  StakingSlashCreateManyArgs,
  StakingSlashUpdateArgs,
  StakingSlashWhereArgs,
  StakingSlashWhereInput,
  StakingSlashWhereUniqueInput,
  StakingSlashOrderByEnum,
} from '../../warthog';

import { StakingSlash } from './staking-slash.model';
import { StakingSlashService } from './staking-slash.service';

@ObjectType()
export class StakingSlashEdge {
  @Field(() => StakingSlash, { nullable: false })
  node!: StakingSlash;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class StakingSlashConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [StakingSlashEdge], { nullable: false })
  edges!: StakingSlashEdge[];

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
export class StakingSlashConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => StakingSlashWhereInput, { nullable: true })
  where?: StakingSlashWhereInput;

  @Field(() => StakingSlashOrderByEnum, { nullable: true })
  orderBy?: [StakingSlashOrderByEnum];
}

@Resolver(StakingSlash)
export class StakingSlashResolver {
  constructor(@Inject('StakingSlashService') public readonly service: StakingSlashService) {}

  @Query(() => [StakingSlash])
  async stakingSlashes(
    @Args() { where, orderBy, limit, offset }: StakingSlashWhereArgs,
    @Fields() fields: string[]
  ): Promise<StakingSlash[]> {
    return this.service.find<StakingSlashWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => StakingSlash, { nullable: true })
  async stakingSlashByUniqueInput(
    @Arg('where') where: StakingSlashWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<StakingSlash | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => StakingSlashConnection)
  async stakingSlashesConnection(
    @Args() { where, orderBy, ...pageOptions }: StakingSlashConnectionWhereArgs,
    @Info() info: any
  ): Promise<StakingSlashConnection> {
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
      result = await this.service.findConnection<StakingSlashWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<StakingSlashConnection>;
  }
}
