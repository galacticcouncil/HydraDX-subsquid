import { BaseModel, NumericField, Model, ManyToOne, StringField, JSONField } from '@subsquid/warthog';

import BN from 'bn.js';

import { SwapAction } from '../swap-action/swap-action.model';
import { Account } from '../account/account.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class TradeTransfer extends BaseModel {
  @NumericField({
    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  timestamp!: BN;

  @StringField({})
  block!: string;

  @ManyToOne(() => SwapAction, (param: SwapAction) => param.directTrades, {
    skipGraphQLField: true,

    modelName: 'TradeTransfer',
    relModelName: 'SwapAction',
    propertyName: 'swapAction',
  })
  swapAction!: SwapAction;

  @ManyToOne(() => Account, (param: Account) => param.tradeTransferIn, {
    skipGraphQLField: true,

    modelName: 'TradeTransfer',
    relModelName: 'Account',
    propertyName: 'accountReceived',
  })
  accountReceived!: Account;

  @ManyToOne(() => Account, (param: Account) => param.tradeTransferOut, {
    skipGraphQLField: true,

    modelName: 'TradeTransfer',
    relModelName: 'Account',
    propertyName: 'accountSent',
  })
  accountSent!: Account;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  amountReceived?: BN;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  amountSent?: BN;

  constructor(init?: Partial<TradeTransfer>) {
    super();
    Object.assign(this, init);
  }
}
