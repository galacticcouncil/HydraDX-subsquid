import {
  BaseModel,
  BooleanField,
  IntField,
  Model,
  ManyToOne,
  OneToMany,
  StringField,
  JSONField,
} from '@subsquid/warthog';

import { Pool } from '../pool/pool.model';
import { AssetPrice } from '../asset-price/asset-price.model';
import { SwapAction } from '../swap-action/swap-action.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class Token extends BaseModel {
  @IntField({})
  decimal!: number;

  @StringField({})
  name!: string;

  @BooleanField({})
  shared!: boolean;

  @ManyToOne(() => Pool, (param: Pool) => param.tokenparentPool, {
    skipGraphQLField: true,
    nullable: true,
    modelName: 'Token',
    relModelName: 'Pool',
    propertyName: 'parentPool',
  })
  parentPool?: Pool;

  @OneToMany(() => AssetPrice, (param: AssetPrice) => param.tokenZero, {
    nullable: true,
    modelName: 'Token',
    relModelName: 'AssetPrice',
    propertyName: 'assetpricetokenZero',
  })
  assetpricetokenZero?: AssetPrice[];

  @OneToMany(() => AssetPrice, (param: AssetPrice) => param.tokenOne, {
    nullable: true,
    modelName: 'Token',
    relModelName: 'AssetPrice',
    propertyName: 'assetpricetokenOne',
  })
  assetpricetokenOne?: AssetPrice[];

  @OneToMany(() => Pool, (param: Pool) => param.sharedAsset, {
    nullable: true,
    modelName: 'Token',
    relModelName: 'Pool',
    propertyName: 'poolsharedAsset',
  })
  poolsharedAsset?: Pool[];

  @OneToMany(() => Pool, (param: Pool) => param.tokenZero, {
    nullable: true,
    modelName: 'Token',
    relModelName: 'Pool',
    propertyName: 'pooltokenZero',
  })
  pooltokenZero?: Pool[];

  @OneToMany(() => Pool, (param: Pool) => param.tokenOne, {
    nullable: true,
    modelName: 'Token',
    relModelName: 'Pool',
    propertyName: 'pooltokenOne',
  })
  pooltokenOne?: Pool[];

  @OneToMany(() => SwapAction, (param: SwapAction) => param.tokenZero, {
    nullable: true,
    modelName: 'Token',
    relModelName: 'SwapAction',
    propertyName: 'swapactiontokenZero',
  })
  swapactiontokenZero?: SwapAction[];

  @OneToMany(() => SwapAction, (param: SwapAction) => param.tokenOne, {
    nullable: true,
    modelName: 'Token',
    relModelName: 'SwapAction',
    propertyName: 'swapactiontokenOne',
  })
  swapactiontokenOne?: SwapAction[];

  constructor(init?: Partial<Token>) {
    super();
    Object.assign(this, init);
  }
}
