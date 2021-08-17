import {
  BaseModel,
  BooleanField,
  NumericField,
  DateTimeField,
  Model,
  ManyToOne,
  OneToMany,
  StringField,
  JSONField
} from 'warthog';

import BN from 'bn.js';

import { Token } from '../token/token.model';
import { Account } from '../account/account.model';
import { SwapAction } from '../swap-action/swap-action.model';
import { PoolAssetVolume } from '../pool-asset-volume/pool-asset-volume.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class Pool extends BaseModel {
  @StringField({
    nullable: true
  })
  specVersion?: string;

  @BooleanField({})
  isActive!: boolean;

  @ManyToOne(
    () => Token,
    (param: Token) => param.poolsharedAsset,
    {
      skipGraphQLField: true,
      nullable: true,
      modelName: 'Pool',
      relModelName: 'Token',
      propertyName: 'sharedAsset'
    }
  )
  sharedAsset?: Token;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined
    }
  })
  sharedAssetInitialBalance?: BN;

  @ManyToOne(
    () => Account,
    (param: Account) => param.createdPools,
    {
      skipGraphQLField: true,
      nullable: true,
      modelName: 'Pool',
      relModelName: 'Account',
      propertyName: 'ownerAccount'
    }
  )
  ownerAccount?: Account;

  @DateTimeField({})
  createdAt!: Date;

  @DateTimeField({})
  deletedAt!: Date;

  @ManyToOne(
    () => Token,
    (param: Token) => param.pooltokenZero,
    {
      skipGraphQLField: true,

      modelName: 'Pool',
      relModelName: 'Token',
      propertyName: 'tokenZero'
    }
  )
  tokenZero!: Token;

  @ManyToOne(
    () => Token,
    (param: Token) => param.pooltokenOne,
    {
      skipGraphQLField: true,

      modelName: 'Pool',
      relModelName: 'Token',
      propertyName: 'tokenOne'
    }
  )
  tokenOne!: Token;

  @OneToMany(
    () => SwapAction,
    (param: SwapAction) => param.xykTradePool,
    {
      nullable: true,
      modelName: 'Pool',
      relModelName: 'SwapAction',
      propertyName: 'swapActions'
    }
  )
  swapActions?: SwapAction[];

  @OneToMany(
    () => PoolAssetVolume,
    (param: PoolAssetVolume) => param.pool,
    {
      nullable: true,
      modelName: 'Pool',
      relModelName: 'PoolAssetVolume',
      propertyName: 'assetsVolume'
    }
  )
  assetsVolume?: PoolAssetVolume[];

  @OneToMany(
    () => Token,
    (param: Token) => param.parentPool,
    {
      nullable: true,
      modelName: 'Pool',
      relModelName: 'Token',
      propertyName: 'tokenparentPool'
    }
  )
  tokenparentPool?: Token[];

  constructor(init?: Partial<Pool>) {
    super();
    Object.assign(this, init);
  }
}
