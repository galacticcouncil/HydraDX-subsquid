import 'graphql-import-node'; // Needed so you can import *.graphql files 

import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import * as schema from  './schema.graphql'

export interface Query {
    accounts: <T = Array<Account>>(args: { offset?: Int | null, limit?: Int | null, where?: AccountWhereInput | null, orderBy?: Array<AccountOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    accountByUniqueInput: <T = Account | null>(args: { where: AccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    accountsConnection: <T = AccountConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: AccountWhereInput | null, orderBy?: Array<AccountOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    assetPriceInTimes: <T = Array<AssetPriceInTime>>(args: { offset?: Int | null, limit?: Int | null, where?: AssetPriceInTimeWhereInput | null, orderBy?: Array<AssetPriceInTimeOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    assetPriceInTimeByUniqueInput: <T = AssetPriceInTime | null>(args: { where: AssetPriceInTimeWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    assetPriceInTimesConnection: <T = AssetPriceInTimeConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: AssetPriceInTimeWhereInput | null, orderBy?: Array<AssetPriceInTimeOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    assetPrices: <T = Array<AssetPrice>>(args: { offset?: Int | null, limit?: Int | null, where?: AssetPriceWhereInput | null, orderBy?: Array<AssetPriceOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    assetPriceByUniqueInput: <T = AssetPrice | null>(args: { where: AssetPriceWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    assetPricesConnection: <T = AssetPriceConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: AssetPriceWhereInput | null, orderBy?: Array<AssetPriceOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    noBondRecordAccounts: <T = Array<NoBondRecordAccount>>(args: { offset?: Int | null, limit?: Int | null, where?: NoBondRecordAccountWhereInput | null, orderBy?: Array<NoBondRecordAccountOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    noBondRecordAccountByUniqueInput: <T = NoBondRecordAccount | null>(args: { where: NoBondRecordAccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    noBondRecordAccountsConnection: <T = NoBondRecordAccountConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: NoBondRecordAccountWhereInput | null, orderBy?: Array<NoBondRecordAccountOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    poolAssetVolumes: <T = Array<PoolAssetVolume>>(args: { offset?: Int | null, limit?: Int | null, where?: PoolAssetVolumeWhereInput | null, orderBy?: Array<PoolAssetVolumeOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    poolAssetVolumeByUniqueInput: <T = PoolAssetVolume | null>(args: { where: PoolAssetVolumeWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    poolAssetVolumesConnection: <T = PoolAssetVolumeConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: PoolAssetVolumeWhereInput | null, orderBy?: Array<PoolAssetVolumeOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    pools: <T = Array<Pool>>(args: { offset?: Int | null, limit?: Int | null, where?: PoolWhereInput | null, orderBy?: Array<PoolOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    poolByUniqueInput: <T = Pool | null>(args: { where: PoolWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    poolsConnection: <T = PoolConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: PoolWhereInput | null, orderBy?: Array<PoolOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stakingRewards: <T = Array<StakingReward>>(args: { offset?: Int | null, limit?: Int | null, where?: StakingRewardWhereInput | null, orderBy?: Array<StakingRewardOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stakingRewardByUniqueInput: <T = StakingReward | null>(args: { where: StakingRewardWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    stakingRewardsConnection: <T = StakingRewardConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: StakingRewardWhereInput | null, orderBy?: Array<StakingRewardOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stakingSlashes: <T = Array<StakingSlash>>(args: { offset?: Int | null, limit?: Int | null, where?: StakingSlashWhereInput | null, orderBy?: Array<StakingSlashOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stakingSlashByUniqueInput: <T = StakingSlash | null>(args: { where: StakingSlashWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    stakingSlashesConnection: <T = StakingSlashConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: StakingSlashWhereInput | null, orderBy?: Array<StakingSlashOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sumRewards: <T = Array<SumReward>>(args: { offset?: Int | null, limit?: Int | null, where?: SumRewardWhereInput | null, orderBy?: Array<SumRewardOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sumRewardByUniqueInput: <T = SumReward | null>(args: { where: SumRewardWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    sumRewardsConnection: <T = SumRewardConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: SumRewardWhereInput | null, orderBy?: Array<SumRewardOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    swapActions: <T = Array<SwapAction>>(args: { offset?: Int | null, limit?: Int | null, where?: SwapActionWhereInput | null, orderBy?: Array<SwapActionOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    swapActionByUniqueInput: <T = SwapAction | null>(args: { where: SwapActionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    swapActionsConnection: <T = SwapActionConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: SwapActionWhereInput | null, orderBy?: Array<SwapActionOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tokens: <T = Array<Token>>(args: { offset?: Int | null, limit?: Int | null, where?: TokenWhereInput | null, orderBy?: Array<TokenOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tokenByUniqueInput: <T = Token | null>(args: { where: TokenWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    tokensConnection: <T = TokenConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: TokenWhereInput | null, orderBy?: Array<TokenOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tradeTransfers: <T = Array<TradeTransfer>>(args: { offset?: Int | null, limit?: Int | null, where?: TradeTransferWhereInput | null, orderBy?: Array<TradeTransferOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tradeTransferByUniqueInput: <T = TradeTransfer | null>(args: { where: TradeTransferWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    tradeTransfersConnection: <T = TradeTransferConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: TradeTransferWhereInput | null, orderBy?: Array<TradeTransferOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {}

export interface Subscription {
    stateSubscription: <T = ProcessorState>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Binding {
  query: Query
  mutation: Mutation
  subscription: Subscription
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
  delegateSubscription(fieldName: string, args?: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(...args: any[]): T
}

export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema: schema as any })

/**
 * Types
*/

export type AccountOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'specVersion_ASC' |
  'specVersion_DESC'

export type AssetPriceInTimeOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'timestamp_ASC' |
  'timestamp_DESC' |
  'price_ASC' |
  'price_DESC'

export type AssetPriceOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'tokenZero_ASC' |
  'tokenZero_DESC' |
  'tokenOne_ASC' |
  'tokenOne_DESC' |
  'pairName_ASC' |
  'pairName_DESC' |
  'prices_ASC' |
  'prices_DESC'

export type NoBondRecordAccountOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'firstRewardAt_ASC' |
  'firstRewardAt_DESC'

export type PoolAssetVolumeOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'pool_ASC' |
  'pool_DESC' |
  'timestamp_ASC' |
  'timestamp_DESC' |
  'tokenZeroAmount_ASC' |
  'tokenZeroAmount_DESC' |
  'tokenOneAmount_ASC' |
  'tokenOneAmount_DESC' |
  'sharedAssetAmount_ASC' |
  'sharedAssetAmount_DESC' |
  'marketCap_ASC' |
  'marketCap_DESC' |
  'tradeAmount_ASC' |
  'tradeAmount_DESC'

export type PoolOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'specVersion_ASC' |
  'specVersion_DESC' |
  'sharedAsset_ASC' |
  'sharedAsset_DESC' |
  'sharedAssetInitialBalance_ASC' |
  'sharedAssetInitialBalance_DESC' |
  'tokenZero_ASC' |
  'tokenZero_DESC' |
  'tokenOne_ASC' |
  'tokenOne_DESC'

export type StakingRewardOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'address_ASC' |
  'address_DESC' |
  'balance_ASC' |
  'balance_DESC' |
  'date_ASC' |
  'date_DESC'

export type StakingSlashOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'address_ASC' |
  'address_DESC' |
  'balance_ASC' |
  'balance_DESC' |
  'date_ASC' |
  'date_DESC'

export type SumRewardOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'accountReward_ASC' |
  'accountReward_DESC' |
  'accountSlash_ASC' |
  'accountSlash_DESC' |
  'accountTotal_ASC' |
  'accountTotal_DESC'

export type SwapActionOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'isSuccess_ASC' |
  'isSuccess_DESC' |
  'timestamp_ASC' |
  'timestamp_DESC' |
  'block_ASC' |
  'block_DESC' |
  'type_ASC' |
  'type_DESC' |
  'tokenZero_ASC' |
  'tokenZero_DESC' |
  'tokenOne_ASC' |
  'tokenOne_DESC' |
  'account_ASC' |
  'account_DESC' |
  'xykTradePool_ASC' |
  'xykTradePool_DESC'

export type TokenOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'decimal_ASC' |
  'decimal_DESC' |
  'name_ASC' |
  'name_DESC' |
  'shared_ASC' |
  'shared_DESC' |
  'parentPool_ASC' |
  'parentPool_DESC'

export type TradeTransferOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'isSuccess_ASC' |
  'isSuccess_DESC' |
  'timestamp_ASC' |
  'timestamp_DESC' |
  'block_ASC' |
  'block_DESC' |
  'swapAction_ASC' |
  'swapAction_DESC' |
  'accountTo_ASC' |
  'accountTo_DESC' |
  'accountFrom_ASC' |
  'accountFrom_DESC' |
  'type_ASC' |
  'type_DESC' |
  'path_ASC' |
  'path_DESC' |
  'tokenZero_ASC' |
  'tokenZero_DESC' |
  'tokenOne_ASC' |
  'tokenOne_DESC' |
  'tokenZeroInput_ASC' |
  'tokenZeroInput_DESC' |
  'tokenOneInput_ASC' |
  'tokenOneInput_DESC' |
  'result_ASC' |
  'result_DESC'

export interface AccountCreateInput {
  specVersion?: Float | null
}

export interface AccountUpdateInput {
  specVersion?: Float | null
}

export interface AccountWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  specVersion_eq?: Int | null
  specVersion_gt?: Int | null
  specVersion_gte?: Int | null
  specVersion_lt?: Int | null
  specVersion_lte?: Int | null
  specVersion_in?: Int[] | Int | null
  tradeTransferOut_none?: TradeTransferWhereInput | null
  tradeTransferOut_some?: TradeTransferWhereInput | null
  tradeTransferOut_every?: TradeTransferWhereInput | null
  tradeTransferIn_none?: TradeTransferWhereInput | null
  tradeTransferIn_some?: TradeTransferWhereInput | null
  tradeTransferIn_every?: TradeTransferWhereInput | null
  swapactionaccount_none?: SwapActionWhereInput | null
  swapactionaccount_some?: SwapActionWhereInput | null
  swapactionaccount_every?: SwapActionWhereInput | null
  AND?: AccountWhereInput[] | AccountWhereInput | null
  OR?: AccountWhereInput[] | AccountWhereInput | null
}

export interface AccountWhereUniqueInput {
  id: ID_Output
}

export interface AssetPriceCreateInput {
  tokenZero?: ID_Input | null
  tokenOne?: ID_Input | null
  pairName: String
  prices?: ID_Input | null
}

export interface AssetPriceInTimeCreateInput {
  timestamp: String
  price?: String | null
}

export interface AssetPriceInTimeUpdateInput {
  timestamp?: String | null
  price?: String | null
}

export interface AssetPriceInTimeWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  timestamp_eq?: BigInt | null
  timestamp_gt?: BigInt | null
  timestamp_gte?: BigInt | null
  timestamp_lt?: BigInt | null
  timestamp_lte?: BigInt | null
  timestamp_in?: BigInt[] | BigInt | null
  price_eq?: BigInt | null
  price_gt?: BigInt | null
  price_gte?: BigInt | null
  price_lt?: BigInt | null
  price_lte?: BigInt | null
  price_in?: BigInt[] | BigInt | null
  assetpriceprices_none?: AssetPriceWhereInput | null
  assetpriceprices_some?: AssetPriceWhereInput | null
  assetpriceprices_every?: AssetPriceWhereInput | null
  AND?: AssetPriceInTimeWhereInput[] | AssetPriceInTimeWhereInput | null
  OR?: AssetPriceInTimeWhereInput[] | AssetPriceInTimeWhereInput | null
}

export interface AssetPriceInTimeWhereUniqueInput {
  id: ID_Output
}

export interface AssetPriceUpdateInput {
  tokenZero?: ID_Input | null
  tokenOne?: ID_Input | null
  pairName?: String | null
  prices?: ID_Input | null
}

export interface AssetPriceWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  tokenZero_eq?: ID_Input | null
  tokenZero_in?: ID_Output[] | ID_Output | null
  tokenOne_eq?: ID_Input | null
  tokenOne_in?: ID_Output[] | ID_Output | null
  pairName_eq?: String | null
  pairName_contains?: String | null
  pairName_startsWith?: String | null
  pairName_endsWith?: String | null
  pairName_in?: String[] | String | null
  prices_eq?: ID_Input | null
  prices_in?: ID_Output[] | ID_Output | null
  tokenZero?: TokenWhereInput | null
  tokenOne?: TokenWhereInput | null
  prices?: AssetPriceInTimeWhereInput | null
  AND?: AssetPriceWhereInput[] | AssetPriceWhereInput | null
  OR?: AssetPriceWhereInput[] | AssetPriceWhereInput | null
}

export interface AssetPriceWhereUniqueInput {
  id: ID_Output
}

export interface BaseWhereInput {
  id_eq?: String | null
  id_in?: String[] | String | null
  createdAt_eq?: String | null
  createdAt_lt?: String | null
  createdAt_lte?: String | null
  createdAt_gt?: String | null
  createdAt_gte?: String | null
  createdById_eq?: String | null
  updatedAt_eq?: String | null
  updatedAt_lt?: String | null
  updatedAt_lte?: String | null
  updatedAt_gt?: String | null
  updatedAt_gte?: String | null
  updatedById_eq?: String | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: String | null
  deletedAt_lt?: String | null
  deletedAt_lte?: String | null
  deletedAt_gt?: String | null
  deletedAt_gte?: String | null
  deletedById_eq?: String | null
}

export interface NoBondRecordAccountCreateInput {
  firstRewardAt: Float
}

export interface NoBondRecordAccountUpdateInput {
  firstRewardAt?: Float | null
}

export interface NoBondRecordAccountWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  firstRewardAt_eq?: Int | null
  firstRewardAt_gt?: Int | null
  firstRewardAt_gte?: Int | null
  firstRewardAt_lt?: Int | null
  firstRewardAt_lte?: Int | null
  firstRewardAt_in?: Int[] | Int | null
  AND?: NoBondRecordAccountWhereInput[] | NoBondRecordAccountWhereInput | null
  OR?: NoBondRecordAccountWhereInput[] | NoBondRecordAccountWhereInput | null
}

export interface NoBondRecordAccountWhereUniqueInput {
  id: ID_Output
}

export interface PoolAssetVolumeCreateInput {
  pool: ID_Output
  timestamp: String
  tokenZeroAmount?: String | null
  tokenOneAmount?: String | null
  sharedAssetAmount?: String | null
  marketCap?: String | null
  tradeAmount?: String | null
}

export interface PoolAssetVolumeUpdateInput {
  pool?: ID_Input | null
  timestamp?: String | null
  tokenZeroAmount?: String | null
  tokenOneAmount?: String | null
  sharedAssetAmount?: String | null
  marketCap?: String | null
  tradeAmount?: String | null
}

export interface PoolAssetVolumeWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  pool_eq?: ID_Input | null
  pool_in?: ID_Output[] | ID_Output | null
  timestamp_eq?: BigInt | null
  timestamp_gt?: BigInt | null
  timestamp_gte?: BigInt | null
  timestamp_lt?: BigInt | null
  timestamp_lte?: BigInt | null
  timestamp_in?: BigInt[] | BigInt | null
  tokenZeroAmount_eq?: BigInt | null
  tokenZeroAmount_gt?: BigInt | null
  tokenZeroAmount_gte?: BigInt | null
  tokenZeroAmount_lt?: BigInt | null
  tokenZeroAmount_lte?: BigInt | null
  tokenZeroAmount_in?: BigInt[] | BigInt | null
  tokenOneAmount_eq?: BigInt | null
  tokenOneAmount_gt?: BigInt | null
  tokenOneAmount_gte?: BigInt | null
  tokenOneAmount_lt?: BigInt | null
  tokenOneAmount_lte?: BigInt | null
  tokenOneAmount_in?: BigInt[] | BigInt | null
  sharedAssetAmount_eq?: BigInt | null
  sharedAssetAmount_gt?: BigInt | null
  sharedAssetAmount_gte?: BigInt | null
  sharedAssetAmount_lt?: BigInt | null
  sharedAssetAmount_lte?: BigInt | null
  sharedAssetAmount_in?: BigInt[] | BigInt | null
  marketCap_eq?: BigInt | null
  marketCap_gt?: BigInt | null
  marketCap_gte?: BigInt | null
  marketCap_lt?: BigInt | null
  marketCap_lte?: BigInt | null
  marketCap_in?: BigInt[] | BigInt | null
  tradeAmount_eq?: BigInt | null
  tradeAmount_gt?: BigInt | null
  tradeAmount_gte?: BigInt | null
  tradeAmount_lt?: BigInt | null
  tradeAmount_lte?: BigInt | null
  tradeAmount_in?: BigInt[] | BigInt | null
  pool?: PoolWhereInput | null
  AND?: PoolAssetVolumeWhereInput[] | PoolAssetVolumeWhereInput | null
  OR?: PoolAssetVolumeWhereInput[] | PoolAssetVolumeWhereInput | null
}

export interface PoolAssetVolumeWhereUniqueInput {
  id: ID_Output
}

export interface PoolCreateInput {
  specVersion?: Float | null
  sharedAsset?: ID_Input | null
  sharedAssetInitialBalance?: String | null
  tokenZero: ID_Output
  tokenOne: ID_Output
}

export interface PoolUpdateInput {
  specVersion?: Float | null
  sharedAsset?: ID_Input | null
  sharedAssetInitialBalance?: String | null
  tokenZero?: ID_Input | null
  tokenOne?: ID_Input | null
}

export interface PoolWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  specVersion_eq?: Int | null
  specVersion_gt?: Int | null
  specVersion_gte?: Int | null
  specVersion_lt?: Int | null
  specVersion_lte?: Int | null
  specVersion_in?: Int[] | Int | null
  sharedAsset_eq?: ID_Input | null
  sharedAsset_in?: ID_Output[] | ID_Output | null
  sharedAssetInitialBalance_eq?: BigInt | null
  sharedAssetInitialBalance_gt?: BigInt | null
  sharedAssetInitialBalance_gte?: BigInt | null
  sharedAssetInitialBalance_lt?: BigInt | null
  sharedAssetInitialBalance_lte?: BigInt | null
  sharedAssetInitialBalance_in?: BigInt[] | BigInt | null
  tokenZero_eq?: ID_Input | null
  tokenZero_in?: ID_Output[] | ID_Output | null
  tokenOne_eq?: ID_Input | null
  tokenOne_in?: ID_Output[] | ID_Output | null
  sharedAsset?: TokenWhereInput | null
  tokenZero?: TokenWhereInput | null
  tokenOne?: TokenWhereInput | null
  swapActions_none?: SwapActionWhereInput | null
  swapActions_some?: SwapActionWhereInput | null
  swapActions_every?: SwapActionWhereInput | null
  assetsVolume_none?: PoolAssetVolumeWhereInput | null
  assetsVolume_some?: PoolAssetVolumeWhereInput | null
  assetsVolume_every?: PoolAssetVolumeWhereInput | null
  tokenparentPool_none?: TokenWhereInput | null
  tokenparentPool_some?: TokenWhereInput | null
  tokenparentPool_every?: TokenWhereInput | null
  AND?: PoolWhereInput[] | PoolWhereInput | null
  OR?: PoolWhereInput[] | PoolWhereInput | null
}

export interface PoolWhereUniqueInput {
  id: ID_Output
}

export interface StakingRewardCreateInput {
  address: String
  balance: String
  date: DateTime
}

export interface StakingRewardUpdateInput {
  address?: String | null
  balance?: String | null
  date?: DateTime | null
}

export interface StakingRewardWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  address_eq?: String | null
  address_contains?: String | null
  address_startsWith?: String | null
  address_endsWith?: String | null
  address_in?: String[] | String | null
  balance_eq?: BigInt | null
  balance_gt?: BigInt | null
  balance_gte?: BigInt | null
  balance_lt?: BigInt | null
  balance_lte?: BigInt | null
  balance_in?: BigInt[] | BigInt | null
  date_eq?: DateTime | null
  date_lt?: DateTime | null
  date_lte?: DateTime | null
  date_gt?: DateTime | null
  date_gte?: DateTime | null
  AND?: StakingRewardWhereInput[] | StakingRewardWhereInput | null
  OR?: StakingRewardWhereInput[] | StakingRewardWhereInput | null
}

export interface StakingRewardWhereUniqueInput {
  id: ID_Output
}

export interface StakingSlashCreateInput {
  address: String
  balance: String
  date: DateTime
}

export interface StakingSlashUpdateInput {
  address?: String | null
  balance?: String | null
  date?: DateTime | null
}

export interface StakingSlashWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  address_eq?: String | null
  address_contains?: String | null
  address_startsWith?: String | null
  address_endsWith?: String | null
  address_in?: String[] | String | null
  balance_eq?: BigInt | null
  balance_gt?: BigInt | null
  balance_gte?: BigInt | null
  balance_lt?: BigInt | null
  balance_lte?: BigInt | null
  balance_in?: BigInt[] | BigInt | null
  date_eq?: DateTime | null
  date_lt?: DateTime | null
  date_lte?: DateTime | null
  date_gt?: DateTime | null
  date_gte?: DateTime | null
  AND?: StakingSlashWhereInput[] | StakingSlashWhereInput | null
  OR?: StakingSlashWhereInput[] | StakingSlashWhereInput | null
}

export interface StakingSlashWhereUniqueInput {
  id: ID_Output
}

export interface SumRewardCreateInput {
  accountReward: String
  accountSlash: String
  accountTotal: String
}

export interface SumRewardUpdateInput {
  accountReward?: String | null
  accountSlash?: String | null
  accountTotal?: String | null
}

export interface SumRewardWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  accountReward_eq?: BigInt | null
  accountReward_gt?: BigInt | null
  accountReward_gte?: BigInt | null
  accountReward_lt?: BigInt | null
  accountReward_lte?: BigInt | null
  accountReward_in?: BigInt[] | BigInt | null
  accountSlash_eq?: BigInt | null
  accountSlash_gt?: BigInt | null
  accountSlash_gte?: BigInt | null
  accountSlash_lt?: BigInt | null
  accountSlash_lte?: BigInt | null
  accountSlash_in?: BigInt[] | BigInt | null
  accountTotal_eq?: BigInt | null
  accountTotal_gt?: BigInt | null
  accountTotal_gte?: BigInt | null
  accountTotal_lt?: BigInt | null
  accountTotal_lte?: BigInt | null
  accountTotal_in?: BigInt[] | BigInt | null
  AND?: SumRewardWhereInput[] | SumRewardWhereInput | null
  OR?: SumRewardWhereInput[] | SumRewardWhereInput | null
}

export interface SumRewardWhereUniqueInput {
  id: ID_Output
}

export interface SwapActionCreateInput {
  isSuccess: Float
  timestamp: String
  block: String
  type: String
  tokenZero?: ID_Input | null
  tokenOne?: ID_Input | null
  account?: ID_Input | null
  xykTradePool?: ID_Input | null
}

export interface SwapActionUpdateInput {
  isSuccess?: Float | null
  timestamp?: String | null
  block?: String | null
  type?: String | null
  tokenZero?: ID_Input | null
  tokenOne?: ID_Input | null
  account?: ID_Input | null
  xykTradePool?: ID_Input | null
}

export interface SwapActionWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  isSuccess_eq?: Int | null
  isSuccess_gt?: Int | null
  isSuccess_gte?: Int | null
  isSuccess_lt?: Int | null
  isSuccess_lte?: Int | null
  isSuccess_in?: Int[] | Int | null
  timestamp_eq?: BigInt | null
  timestamp_gt?: BigInt | null
  timestamp_gte?: BigInt | null
  timestamp_lt?: BigInt | null
  timestamp_lte?: BigInt | null
  timestamp_in?: BigInt[] | BigInt | null
  block_eq?: String | null
  block_contains?: String | null
  block_startsWith?: String | null
  block_endsWith?: String | null
  block_in?: String[] | String | null
  type_eq?: String | null
  type_contains?: String | null
  type_startsWith?: String | null
  type_endsWith?: String | null
  type_in?: String[] | String | null
  tokenZero_eq?: ID_Input | null
  tokenZero_in?: ID_Output[] | ID_Output | null
  tokenOne_eq?: ID_Input | null
  tokenOne_in?: ID_Output[] | ID_Output | null
  account_eq?: ID_Input | null
  account_in?: ID_Output[] | ID_Output | null
  xykTradePool_eq?: ID_Input | null
  xykTradePool_in?: ID_Output[] | ID_Output | null
  tokenZero?: TokenWhereInput | null
  tokenOne?: TokenWhereInput | null
  account?: AccountWhereInput | null
  directTrades_none?: TradeTransferWhereInput | null
  directTrades_some?: TradeTransferWhereInput | null
  directTrades_every?: TradeTransferWhereInput | null
  xykTradePool?: PoolWhereInput | null
  AND?: SwapActionWhereInput[] | SwapActionWhereInput | null
  OR?: SwapActionWhereInput[] | SwapActionWhereInput | null
}

export interface SwapActionWhereUniqueInput {
  id: ID_Output
}

export interface TokenCreateInput {
  decimal: Float
  name: String
  shared: Boolean
  parentPool?: ID_Input | null
}

export interface TokenUpdateInput {
  decimal?: Float | null
  name?: String | null
  shared?: Boolean | null
  parentPool?: ID_Input | null
}

export interface TokenWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  decimal_eq?: Int | null
  decimal_gt?: Int | null
  decimal_gte?: Int | null
  decimal_lt?: Int | null
  decimal_lte?: Int | null
  decimal_in?: Int[] | Int | null
  name_eq?: String | null
  name_contains?: String | null
  name_startsWith?: String | null
  name_endsWith?: String | null
  name_in?: String[] | String | null
  shared_eq?: Boolean | null
  shared_in?: Boolean[] | Boolean | null
  parentPool_eq?: ID_Input | null
  parentPool_in?: ID_Output[] | ID_Output | null
  parentPool?: PoolWhereInput | null
  assetpricetokenZero_none?: AssetPriceWhereInput | null
  assetpricetokenZero_some?: AssetPriceWhereInput | null
  assetpricetokenZero_every?: AssetPriceWhereInput | null
  assetpricetokenOne_none?: AssetPriceWhereInput | null
  assetpricetokenOne_some?: AssetPriceWhereInput | null
  assetpricetokenOne_every?: AssetPriceWhereInput | null
  poolsharedAsset_none?: PoolWhereInput | null
  poolsharedAsset_some?: PoolWhereInput | null
  poolsharedAsset_every?: PoolWhereInput | null
  pooltokenZero_none?: PoolWhereInput | null
  pooltokenZero_some?: PoolWhereInput | null
  pooltokenZero_every?: PoolWhereInput | null
  pooltokenOne_none?: PoolWhereInput | null
  pooltokenOne_some?: PoolWhereInput | null
  pooltokenOne_every?: PoolWhereInput | null
  swapactiontokenZero_none?: SwapActionWhereInput | null
  swapactiontokenZero_some?: SwapActionWhereInput | null
  swapactiontokenZero_every?: SwapActionWhereInput | null
  swapactiontokenOne_none?: SwapActionWhereInput | null
  swapactiontokenOne_some?: SwapActionWhereInput | null
  swapactiontokenOne_every?: SwapActionWhereInput | null
  AND?: TokenWhereInput[] | TokenWhereInput | null
  OR?: TokenWhereInput[] | TokenWhereInput | null
}

export interface TokenWhereUniqueInput {
  id: ID_Output
}

export interface TradeTransferCreateInput {
  isSuccess: Float
  timestamp: String
  block: String
  swapAction: ID_Output
  accountTo: ID_Output
  accountFrom: ID_Output
  type: String
  path: String
  tokenZero: String
  tokenOne: String
  tokenZeroInput: String
  tokenOneInput: String
  result: String
}

export interface TradeTransferUpdateInput {
  isSuccess?: Float | null
  timestamp?: String | null
  block?: String | null
  swapAction?: ID_Input | null
  accountTo?: ID_Input | null
  accountFrom?: ID_Input | null
  type?: String | null
  path?: String | null
  tokenZero?: String | null
  tokenOne?: String | null
  tokenZeroInput?: String | null
  tokenOneInput?: String | null
  result?: String | null
}

export interface TradeTransferWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  isSuccess_eq?: Int | null
  isSuccess_gt?: Int | null
  isSuccess_gte?: Int | null
  isSuccess_lt?: Int | null
  isSuccess_lte?: Int | null
  isSuccess_in?: Int[] | Int | null
  timestamp_eq?: BigInt | null
  timestamp_gt?: BigInt | null
  timestamp_gte?: BigInt | null
  timestamp_lt?: BigInt | null
  timestamp_lte?: BigInt | null
  timestamp_in?: BigInt[] | BigInt | null
  block_eq?: String | null
  block_contains?: String | null
  block_startsWith?: String | null
  block_endsWith?: String | null
  block_in?: String[] | String | null
  swapAction_eq?: ID_Input | null
  swapAction_in?: ID_Output[] | ID_Output | null
  accountTo_eq?: ID_Input | null
  accountTo_in?: ID_Output[] | ID_Output | null
  accountFrom_eq?: ID_Input | null
  accountFrom_in?: ID_Output[] | ID_Output | null
  type_eq?: String | null
  type_contains?: String | null
  type_startsWith?: String | null
  type_endsWith?: String | null
  type_in?: String[] | String | null
  path_eq?: String | null
  path_contains?: String | null
  path_startsWith?: String | null
  path_endsWith?: String | null
  path_in?: String[] | String | null
  tokenZero_eq?: String | null
  tokenZero_contains?: String | null
  tokenZero_startsWith?: String | null
  tokenZero_endsWith?: String | null
  tokenZero_in?: String[] | String | null
  tokenOne_eq?: String | null
  tokenOne_contains?: String | null
  tokenOne_startsWith?: String | null
  tokenOne_endsWith?: String | null
  tokenOne_in?: String[] | String | null
  tokenZeroInput_eq?: String | null
  tokenZeroInput_contains?: String | null
  tokenZeroInput_startsWith?: String | null
  tokenZeroInput_endsWith?: String | null
  tokenZeroInput_in?: String[] | String | null
  tokenOneInput_eq?: String | null
  tokenOneInput_contains?: String | null
  tokenOneInput_startsWith?: String | null
  tokenOneInput_endsWith?: String | null
  tokenOneInput_in?: String[] | String | null
  result_eq?: String | null
  result_contains?: String | null
  result_startsWith?: String | null
  result_endsWith?: String | null
  result_in?: String[] | String | null
  swapAction?: SwapActionWhereInput | null
  accountTo?: AccountWhereInput | null
  accountFrom?: AccountWhereInput | null
  AND?: TradeTransferWhereInput[] | TradeTransferWhereInput | null
  OR?: TradeTransferWhereInput[] | TradeTransferWhereInput | null
}

export interface TradeTransferWhereUniqueInput {
  id: ID_Output
}

export interface BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface DeleteResponse {
  id: ID_Output
}

export interface Account extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  specVersion?: Int | null
  tradeTransferOut?: Array<TradeTransfer> | null
  tradeTransferIn?: Array<TradeTransfer> | null
  swapactionaccount?: Array<SwapAction> | null
}

export interface AccountConnection {
  totalCount: Int
  edges: Array<AccountEdge>
  pageInfo: PageInfo
}

export interface AccountEdge {
  node: Account
  cursor: String
}

export interface AssetPrice extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  tokenZero?: Token | null
  tokenZeroId?: String | null
  tokenOne?: Token | null
  tokenOneId?: String | null
  pairName: String
  prices?: AssetPriceInTime | null
  pricesId?: String | null
}

export interface AssetPriceConnection {
  totalCount: Int
  edges: Array<AssetPriceEdge>
  pageInfo: PageInfo
}

export interface AssetPriceEdge {
  node: AssetPrice
  cursor: String
}

export interface AssetPriceInTime extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  timestamp: BigInt
  price?: BigInt | null
  assetpriceprices?: Array<AssetPrice> | null
}

export interface AssetPriceInTimeConnection {
  totalCount: Int
  edges: Array<AssetPriceInTimeEdge>
  pageInfo: PageInfo
}

export interface AssetPriceInTimeEdge {
  node: AssetPriceInTime
  cursor: String
}

export interface BaseModel extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface BaseModelUUID extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface NoBondRecordAccount extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  firstRewardAt: Int
}

export interface NoBondRecordAccountConnection {
  totalCount: Int
  edges: Array<NoBondRecordAccountEdge>
  pageInfo: PageInfo
}

export interface NoBondRecordAccountEdge {
  node: NoBondRecordAccount
  cursor: String
}

export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String | null
  endCursor?: String | null
}

export interface Pool extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  specVersion?: Int | null
  sharedAsset?: Token | null
  sharedAssetId?: String | null
  sharedAssetInitialBalance?: BigInt | null
  tokenZero: Token
  tokenZeroId: String
  tokenOne: Token
  tokenOneId: String
  swapActions?: Array<SwapAction> | null
  assetsVolume?: Array<PoolAssetVolume> | null
  tokenparentPool?: Array<Token> | null
}

export interface PoolAssetVolume extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  pool: Pool
  poolId: String
  timestamp: BigInt
  tokenZeroAmount?: BigInt | null
  tokenOneAmount?: BigInt | null
  sharedAssetAmount?: BigInt | null
  marketCap?: BigInt | null
  tradeAmount?: BigInt | null
}

export interface PoolAssetVolumeConnection {
  totalCount: Int
  edges: Array<PoolAssetVolumeEdge>
  pageInfo: PageInfo
}

export interface PoolAssetVolumeEdge {
  node: PoolAssetVolume
  cursor: String
}

export interface PoolConnection {
  totalCount: Int
  edges: Array<PoolEdge>
  pageInfo: PageInfo
}

export interface PoolEdge {
  node: Pool
  cursor: String
}

export interface ProcessorState {
  lastCompleteBlock: Float
  lastProcessedEvent: String
  indexerHead: Float
  chainHead: Float
}

export interface StakingReward extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  address: String
  balance: BigInt
  date: DateTime
}

export interface StakingRewardConnection {
  totalCount: Int
  edges: Array<StakingRewardEdge>
  pageInfo: PageInfo
}

export interface StakingRewardEdge {
  node: StakingReward
  cursor: String
}

export interface StakingSlash extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  address: String
  balance: BigInt
  date: DateTime
}

export interface StakingSlashConnection {
  totalCount: Int
  edges: Array<StakingSlashEdge>
  pageInfo: PageInfo
}

export interface StakingSlashEdge {
  node: StakingSlash
  cursor: String
}

export interface StandardDeleteResponse {
  id: ID_Output
}

export interface SumReward extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  accountReward: BigInt
  accountSlash: BigInt
  accountTotal: BigInt
}

export interface SumRewardConnection {
  totalCount: Int
  edges: Array<SumRewardEdge>
  pageInfo: PageInfo
}

export interface SumRewardEdge {
  node: SumReward
  cursor: String
}

export interface SwapAction extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  isSuccess: Int
  timestamp: BigInt
  block: String
  type: String
  tokenZero?: Token | null
  tokenZeroId?: String | null
  tokenOne?: Token | null
  tokenOneId?: String | null
  account?: Account | null
  accountId?: String | null
  directTrades?: Array<TradeTransfer> | null
  xykTradePool?: Pool | null
  xykTradePoolId?: String | null
}

export interface SwapActionConnection {
  totalCount: Int
  edges: Array<SwapActionEdge>
  pageInfo: PageInfo
}

export interface SwapActionEdge {
  node: SwapAction
  cursor: String
}

export interface Token extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  decimal: Int
  name: String
  shared: Boolean
  parentPool?: Pool | null
  parentPoolId?: String | null
  assetpricetokenZero?: Array<AssetPrice> | null
  assetpricetokenOne?: Array<AssetPrice> | null
  poolsharedAsset?: Array<Pool> | null
  pooltokenZero?: Array<Pool> | null
  pooltokenOne?: Array<Pool> | null
  swapactiontokenZero?: Array<SwapAction> | null
  swapactiontokenOne?: Array<SwapAction> | null
}

export interface TokenConnection {
  totalCount: Int
  edges: Array<TokenEdge>
  pageInfo: PageInfo
}

export interface TokenEdge {
  node: Token
  cursor: String
}

export interface TradeTransfer extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  isSuccess: Int
  timestamp: BigInt
  block: String
  swapAction: SwapAction
  swapActionId: String
  accountTo: Account
  accountToId: String
  accountFrom: Account
  accountFromId: String
  type: String
  path: String
  tokenZero: String
  tokenOne: String
  tokenZeroInput: String
  tokenOneInput: String
  result: String
}

export interface TradeTransferConnection {
  totalCount: Int
  edges: Array<TradeTransferEdge>
  pageInfo: PageInfo
}

export interface TradeTransferEdge {
  node: TradeTransfer
  cursor: String
}

/*
GraphQL representation of BigInt
*/
export type BigInt = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The javascript `Date` as string. Type represents date and time as the ISO Date string.
*/
export type DateTime = Date | string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).
*/
export type Float = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string