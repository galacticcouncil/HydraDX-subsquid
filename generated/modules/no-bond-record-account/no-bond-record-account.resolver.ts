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
  NoBondRecordAccountCreateInput,
  NoBondRecordAccountCreateManyArgs,
  NoBondRecordAccountUpdateArgs,
  NoBondRecordAccountWhereArgs,
  NoBondRecordAccountWhereInput,
  NoBondRecordAccountWhereUniqueInput,
  NoBondRecordAccountOrderByEnum,
} from '../../warthog';

import { NoBondRecordAccount } from './no-bond-record-account.model';
import { NoBondRecordAccountService } from './no-bond-record-account.service';

@ObjectType()
export class NoBondRecordAccountEdge {
  @Field(() => NoBondRecordAccount, { nullable: false })
  node!: NoBondRecordAccount;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class NoBondRecordAccountConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [NoBondRecordAccountEdge], { nullable: false })
  edges!: NoBondRecordAccountEdge[];

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
export class NoBondRecordAccountConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => NoBondRecordAccountWhereInput, { nullable: true })
  where?: NoBondRecordAccountWhereInput;

  @Field(() => NoBondRecordAccountOrderByEnum, { nullable: true })
  orderBy?: [NoBondRecordAccountOrderByEnum];
}

@Resolver(NoBondRecordAccount)
export class NoBondRecordAccountResolver {
  constructor(@Inject('NoBondRecordAccountService') public readonly service: NoBondRecordAccountService) {}

  @Query(() => [NoBondRecordAccount])
  async noBondRecordAccounts(
    @Args() { where, orderBy, limit, offset }: NoBondRecordAccountWhereArgs,
    @Fields() fields: string[]
  ): Promise<NoBondRecordAccount[]> {
    return this.service.find<NoBondRecordAccountWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => NoBondRecordAccount, { nullable: true })
  async noBondRecordAccountByUniqueInput(
    @Arg('where') where: NoBondRecordAccountWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<NoBondRecordAccount | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => NoBondRecordAccountConnection)
  async noBondRecordAccountsConnection(
    @Args() { where, orderBy, ...pageOptions }: NoBondRecordAccountConnectionWhereArgs,
    @Info() info: any
  ): Promise<NoBondRecordAccountConnection> {
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
      result = await this.service.findConnection<NoBondRecordAccountWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err: any) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<NoBondRecordAccountConnection>;
  }
}
