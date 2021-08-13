import { BaseModel, Model, ManyToOne, StringField, JSONField } from 'warthog';

import { Token } from '../token/token.model';
import { AssetPriceInTime } from '../asset-price-in-time/asset-price-in-time.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class AssetPrice extends BaseModel {
  @ManyToOne(
    () => Token,
    (param: Token) => param.assetpricetokenZero,
    {
      skipGraphQLField: true,
      nullable: true,
      modelName: 'AssetPrice',
      relModelName: 'Token',
      propertyName: 'tokenZero'
    }
  )
  tokenZero?: Token;

  @ManyToOne(
    () => Token,
    (param: Token) => param.assetpricetokenOne,
    {
      skipGraphQLField: true,
      nullable: true,
      modelName: 'AssetPrice',
      relModelName: 'Token',
      propertyName: 'tokenOne'
    }
  )
  tokenOne?: Token;

  @StringField({})
  pairName!: string;

  @ManyToOne(
    () => AssetPriceInTime,
    (param: AssetPriceInTime) => param.assetpriceprices,
    {
      skipGraphQLField: true,
      nullable: true,
      modelName: 'AssetPrice',
      relModelName: 'AssetPriceInTime',
      propertyName: 'prices'
    }
  )
  prices?: AssetPriceInTime;

  constructor(init?: Partial<AssetPrice>) {
    super();
    Object.assign(this, init);
  }
}
