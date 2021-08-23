import { BaseModel, NumericField, Model, OneToMany, StringField, JSONField } from '@subsquid/warthog';

import BN from 'bn.js';

import { AssetPrice } from '../asset-price/asset-price.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class AssetPriceInTime extends BaseModel {
  @NumericField({
    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  timestamp!: BN;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  price?: BN;

  @OneToMany(() => AssetPrice, (param: AssetPrice) => param.prices, {
    nullable: true,
    modelName: 'AssetPriceInTime',
    relModelName: 'AssetPrice',
    propertyName: 'assetpriceprices',
  })
  assetpriceprices?: AssetPrice[];

  constructor(init?: Partial<AssetPriceInTime>) {
    super();
    Object.assign(this, init);
  }
}
