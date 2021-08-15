import { BaseModel, IntField, NumericField, Model, ManyToOne, OneToMany, StringField, JSONField } from 'warthog';

import BN from 'bn.js';

import { Token } from '../token/token.model';
import { SwapAction } from '../swap-action/swap-action.model';
import { PoolAssetVolume } from '../pool-asset-volume/pool-asset-volume.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class Pool extends BaseModel {
  @IntField({
    nullable: true
  })
  specVersion?: number;

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
