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
  'isActive_ASC' |
  'isActive_DESC' |
  'sharedToken_ASC' |
  'sharedToken_DESC' |
  'sharedAssetInitialBalance_ASC' |
  'sharedAssetInitialBalance_DESC' |
  'ownerAccount_ASC' |
  'ownerAccount_DESC' |
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
  'timestamp_ASC' |
  'timestamp_DESC' |
  'block_ASC' |
  'block_DESC' |
  'intentionType_ASC' |
  'intentionType_DESC' |
  'slippage_ASC' |
  'slippage_DESC' |
  'totalFeeFinal_ASC' |
  'totalFeeFinal_DESC' |
  'match_ASC' |
  'match_DESC' |
  'totalDirectTradeExchanged_ASC' |
  'totalDirectTradeExchanged_DESC' |
  'saved_ASC' |
  'saved_DESC' |
  'account_ASC' |
  'account_DESC' |
  'tokenZero_ASC' |
  'tokenZero_DESC' |
  'tokenOne_ASC' |
  'tokenOne_DESC' |
  'amount_ASC' |
  'amount_DESC' |
  'amountXykTrade_ASC' |
  'amountXykTrade_DESC' |
  'amountOutXykTrade_ASC' |
  'amountOutXykTrade_DESC' |
  'amountSoldBought_ASC' |
  'amountSoldBought_DESC' |
  'totalAmountFinal_ASC' |
  'totalAmountFinal_DESC' |
  'assetsPair_ASC' |
  'assetsPair_DESC' |
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
  'timestamp_ASC' |
  'timestamp_DESC' |
  'block_ASC' |
  'block_DESC' |
  'swapAction_ASC' |
  'swapAction_DESC' |
  'accountReceived_ASC' |
  'accountReceived_DESC' |
  'accountSent_ASC' |
  'accountSent_DESC' |
  'amountReceived_ASC' |
  'amountReceived_DESC' |
  'amountSent_ASC' |
  'amountSent_DESC'

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
  createdPools_none?: PoolWhereInput | null
  createdPools_some?: PoolWhereInput | null
  createdPools_every?: PoolWhereInput | null
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
  pairName_eq?: String | null
  pairName_contains?: String | null
  pairName_startsWith?: String | null
  pairName_endsWith?: String | null
  pairName_in?: String[] | String | null
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

export interface DirectTradeFeeCreateInput {
  account1?: String | null
  account2?: String | null
  asset?: String | null
  amount?: String | null
}

export interface DirectTradeFeeInput {
  account1?: String | null
  account2?: String | null
  asset?: String | null
  amount?: BigInt | null
}

export interface DirectTradeFeeUpdateInput {
  account1?: String | null
  account2?: String | null
  asset?: String | null
  amount?: String | null
}

export interface DirectTradeFeeWhereInput {
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
  account1_eq?: String | null
  account1_contains?: String | null
  account1_startsWith?: String | null
  account1_endsWith?: String | null
  account1_in?: String[] | String | null
  account2_eq?: String | null
  account2_contains?: String | null
  account2_startsWith?: String | null
  account2_endsWith?: String | null
  account2_in?: String[] | String | null
  asset_eq?: String | null
  asset_contains?: String | null
  asset_startsWith?: String | null
  asset_endsWith?: String | null
  asset_in?: String[] | String | null
  amount_eq?: BigInt | null
  amount_gt?: BigInt | null
  amount_gte?: BigInt | null
  amount_lt?: BigInt | null
  amount_lte?: BigInt | null
  amount_in?: BigInt[] | BigInt | null
  AND?: DirectTradeFeeWhereInput[] | DirectTradeFeeWhereInput | null
  OR?: DirectTradeFeeWhereInput[] | DirectTradeFeeWhereInput | null
}

export interface DirectTradeFeeWhereUniqueInput {
  id: ID_Output
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
  createdAt: DateTime
  deletedAt: DateTime
  specVersion?: String | null
  isActive: Boolean
  sharedToken?: ID_Input | null
  sharedAssetInitialBalance?: String | null
  ownerAccount?: ID_Input | null
  tokenZero: ID_Output
  tokenOne: ID_Output
}

export interface PoolUpdateInput {
  createdAt?: DateTime | null
  deletedAt?: DateTime | null
  specVersion?: String | null
  isActive?: Boolean | null
  sharedToken?: ID_Input | null
  sharedAssetInitialBalance?: String | null
  ownerAccount?: ID_Input | null
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
  specVersion_eq?: String | null
  specVersion_contains?: String | null
  specVersion_startsWith?: String | null
  specVersion_endsWith?: String | null
  specVersion_in?: String[] | String | null
  isActive_eq?: Boolean | null
  isActive_in?: Boolean[] | Boolean | null
  sharedAssetInitialBalance_eq?: BigInt | null
  sharedAssetInitialBalance_gt?: BigInt | null
  sharedAssetInitialBalance_gte?: BigInt | null
  sharedAssetInitialBalance_lt?: BigInt | null
  sharedAssetInitialBalance_lte?: BigInt | null
  sharedAssetInitialBalance_in?: BigInt[] | BigInt | null
  sharedToken?: TokenWhereInput | null
  ownerAccount?: AccountWhereInput | null
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
  timestamp: String
  block: String
  intentionType: String
  slippage?: String | null
  fees?: DirectTradeFeeInput | null
  totalFeeFinal?: String | null
  match?: String | null
  totalDirectTradeExchanged?: String | null
  saved?: String | null
  account?: ID_Input | null
  tokenZero?: ID_Input | null
  tokenOne?: ID_Input | null
  amount?: String | null
  amountXykTrade?: String | null
  amountOutXykTrade?: String | null
  amountSoldBought?: String | null
  totalAmountFinal?: String | null
  assetsPair?: String | null
  xykTradePool?: ID_Input | null
}

export interface SwapActionUpdateInput {
  timestamp?: String | null
  block?: String | null
  intentionType?: String | null
  slippage?: String | null
  fees?: DirectTradeFeeInput | null
  totalFeeFinal?: String | null
  match?: String | null
  totalDirectTradeExchanged?: String | null
  saved?: String | null
  account?: ID_Input | null
  tokenZero?: ID_Input | null
  tokenOne?: ID_Input | null
  amount?: String | null
  amountXykTrade?: String | null
  amountOutXykTrade?: String | null
  amountSoldBought?: String | null
  totalAmountFinal?: String | null
  assetsPair?: String | null
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
  intentionType_eq?: String | null
  intentionType_contains?: String | null
  intentionType_startsWith?: String | null
  intentionType_endsWith?: String | null
  intentionType_in?: String[] | String | null
  slippage_eq?: BigInt | null
  slippage_gt?: BigInt | null
  slippage_gte?: BigInt | null
  slippage_lt?: BigInt | null
  slippage_lte?: BigInt | null
  slippage_in?: BigInt[] | BigInt | null
  fees_json?: JSONObject | null
  totalFeeFinal_eq?: BigInt | null
  totalFeeFinal_gt?: BigInt | null
  totalFeeFinal_gte?: BigInt | null
  totalFeeFinal_lt?: BigInt | null
  totalFeeFinal_lte?: BigInt | null
  totalFeeFinal_in?: BigInt[] | BigInt | null
  match_eq?: BigInt | null
  match_gt?: BigInt | null
  match_gte?: BigInt | null
  match_lt?: BigInt | null
  match_lte?: BigInt | null
  match_in?: BigInt[] | BigInt | null
  totalDirectTradeExchanged_eq?: BigInt | null
  totalDirectTradeExchanged_gt?: BigInt | null
  totalDirectTradeExchanged_gte?: BigInt | null
  totalDirectTradeExchanged_lt?: BigInt | null
  totalDirectTradeExchanged_lte?: BigInt | null
  totalDirectTradeExchanged_in?: BigInt[] | BigInt | null
  saved_eq?: BigInt | null
  saved_gt?: BigInt | null
  saved_gte?: BigInt | null
  saved_lt?: BigInt | null
  saved_lte?: BigInt | null
  saved_in?: BigInt[] | BigInt | null
  amount_eq?: BigInt | null
  amount_gt?: BigInt | null
  amount_gte?: BigInt | null
  amount_lt?: BigInt | null
  amount_lte?: BigInt | null
  amount_in?: BigInt[] | BigInt | null
  amountXykTrade_eq?: BigInt | null
  amountXykTrade_gt?: BigInt | null
  amountXykTrade_gte?: BigInt | null
  amountXykTrade_lt?: BigInt | null
  amountXykTrade_lte?: BigInt | null
  amountXykTrade_in?: BigInt[] | BigInt | null
  amountOutXykTrade_eq?: BigInt | null
  amountOutXykTrade_gt?: BigInt | null
  amountOutXykTrade_gte?: BigInt | null
  amountOutXykTrade_lt?: BigInt | null
  amountOutXykTrade_lte?: BigInt | null
  amountOutXykTrade_in?: BigInt[] | BigInt | null
  amountSoldBought_eq?: BigInt | null
  amountSoldBought_gt?: BigInt | null
  amountSoldBought_gte?: BigInt | null
  amountSoldBought_lt?: BigInt | null
  amountSoldBought_lte?: BigInt | null
  amountSoldBought_in?: BigInt[] | BigInt | null
  totalAmountFinal_eq?: BigInt | null
  totalAmountFinal_gt?: BigInt | null
  totalAmountFinal_gte?: BigInt | null
  totalAmountFinal_lt?: BigInt | null
  totalAmountFinal_lte?: BigInt | null
  totalAmountFinal_in?: BigInt[] | BigInt | null
  assetsPair_eq?: String | null
  assetsPair_contains?: String | null
  assetsPair_startsWith?: String | null
  assetsPair_endsWith?: String | null
  assetsPair_in?: String[] | String | null
  account?: AccountWhereInput | null
  tokenZero?: TokenWhereInput | null
  tokenOne?: TokenWhereInput | null
  xykTradePool?: PoolWhereInput | null
  directTrades_none?: TradeTransferWhereInput | null
  directTrades_some?: TradeTransferWhereInput | null
  directTrades_every?: TradeTransferWhereInput | null
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
  parentPool?: PoolWhereInput | null
  assetpricetokenZero_none?: AssetPriceWhereInput | null
  assetpricetokenZero_some?: AssetPriceWhereInput | null
  assetpricetokenZero_every?: AssetPriceWhereInput | null
  assetpricetokenOne_none?: AssetPriceWhereInput | null
  assetpricetokenOne_some?: AssetPriceWhereInput | null
  assetpricetokenOne_every?: AssetPriceWhereInput | null
  poolsharedToken_none?: PoolWhereInput | null
  poolsharedToken_some?: PoolWhereInput | null
  poolsharedToken_every?: PoolWhereInput | null
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
  timestamp: String
  block: String
  swapAction: ID_Output
  accountReceived: ID_Output
  accountSent: ID_Output
  amountReceived?: String | null
  amountSent?: String | null
}

export interface TradeTransferUpdateInput {
  timestamp?: String | null
  block?: String | null
  swapAction?: ID_Input | null
  accountReceived?: ID_Input | null
  accountSent?: ID_Input | null
  amountReceived?: String | null
  amountSent?: String | null
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
  amountReceived_eq?: BigInt | null
  amountReceived_gt?: BigInt | null
  amountReceived_gte?: BigInt | null
  amountReceived_lt?: BigInt | null
  amountReceived_lte?: BigInt | null
  amountReceived_in?: BigInt[] | BigInt | null
  amountSent_eq?: BigInt | null
  amountSent_gt?: BigInt | null
  amountSent_gte?: BigInt | null
  amountSent_lt?: BigInt | null
  amountSent_lte?: BigInt | null
  amountSent_in?: BigInt[] | BigInt | null
  swapAction?: SwapActionWhereInput | null
  accountReceived?: AccountWhereInput | null
  accountSent?: AccountWhereInput | null
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
  createdPools?: Array<Pool> | null
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

export interface DirectTradeFee {
  account1?: String | null
  account2?: String | null
  asset?: String | null
  amount?: BigInt | null
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
  deletedAt: DateTime
  deletedById?: String | null
  version: Int
  specVersion?: String | null
  isActive: Boolean
  sharedToken?: Token | null
  sharedTokenId?: String | null
  sharedAssetInitialBalance?: BigInt | null
  ownerAccount?: Account | null
  ownerAccountId?: String | null
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
  timestamp: BigInt
  block: String
  intentionType: String
  slippage?: BigInt | null
  fees?: DirectTradeFee | null
  totalFeeFinal?: BigInt | null
  match?: BigInt | null
  totalDirectTradeExchanged?: BigInt | null
  saved?: BigInt | null
  account?: Account | null
  accountId?: String | null
  tokenZero?: Token | null
  tokenZeroId?: String | null
  tokenOne?: Token | null
  tokenOneId?: String | null
  amount?: BigInt | null
  amountXykTrade?: BigInt | null
  amountOutXykTrade?: BigInt | null
  amountSoldBought?: BigInt | null
  totalAmountFinal?: BigInt | null
  assetsPair?: String | null
  xykTradePool?: Pool | null
  xykTradePoolId?: String | null
  directTrades?: Array<TradeTransfer> | null
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
  poolsharedToken?: Array<Pool> | null
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
  timestamp: BigInt
  block: String
  swapAction: SwapAction
  swapActionId: String
  accountReceived: Account
  accountReceivedId: String
  accountSent: Account
  accountSentId: String
  amountReceived?: BigInt | null
  amountSent?: BigInt | null
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
The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
*/

    export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

    export type JsonPrimitive = string | number | boolean | null | {};
    
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface JsonArray extends Array<JsonValue> {}
    
    export type JsonObject = { [member: string]: JsonValue };

    export type JSONObject = JsonObject;
  

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string