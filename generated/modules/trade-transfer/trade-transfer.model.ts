import { BaseModel, IntField, NumericField, Model, ManyToOne, StringField, JSONField } from 'warthog';

import BN from 'bn.js';

import { SwapAction } from '../swap-action/swap-action.model';
import { Account } from '../account/account.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class TradeTransfer extends BaseModel {
  @IntField({})
  isSuccess!: number;

  @NumericField({
    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined
    }
  })
  timestamp!: BN;

  @StringField({})
  block!: string;

  @ManyToOne(
    () => SwapAction,
    (param: SwapAction) => param.directTrades,
    {
      skipGraphQLField: true,

      modelName: 'TradeTransfer',
      relModelName: 'SwapAction',
      propertyName: 'swapAction'
    }
  )
  swapAction!: SwapAction;

  @ManyToOne(
    () => Account,
    (param: Account) => param.tradeTransferIn,
    {
      skipGraphQLField: true,

      modelName: 'TradeTransfer',
      relModelName: 'Account',
      propertyName: 'accountTo'
    }
  )
  accountTo!: Account;

  @ManyToOne(
    () => Account,
    (param: Account) => param.tradeTransferOut,
    {
      skipGraphQLField: true,

      modelName: 'TradeTransfer',
      relModelName: 'Account',
      propertyName: 'accountFrom'
    }
  )
  accountFrom!: Account;

  @StringField({})
  type!: string;

  @StringField({})
  path!: string;

  @StringField({})
  tokenZero!: string;

  @StringField({})
  tokenOne!: string;

  @StringField({})
  tokenZeroInput!: string;

  @StringField({})
  tokenOneInput!: string;

  @StringField({})
  result!: string;

  constructor(init?: Partial<TradeTransfer>) {
    super();
    Object.assign(this, init);
  }
}
