import { BaseModel, IntField, Model, OneToMany, StringField, JSONField } from 'warthog';

import { TradeTransfer } from '../trade-transfer/trade-transfer.model';
import { SwapAction } from '../swap-action/swap-action.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class Account extends BaseModel {
  @IntField({
    nullable: true
  })
  specVersion?: number;

  @OneToMany(
    () => TradeTransfer,
    (param: TradeTransfer) => param.accountFrom,
    {
      nullable: true,
      modelName: 'Account',
      relModelName: 'TradeTransfer',
      propertyName: 'tradeTransferOut'
    }
  )
  tradeTransferOut?: TradeTransfer[];

  @OneToMany(
    () => TradeTransfer,
    (param: TradeTransfer) => param.accountTo,
    {
      nullable: true,
      modelName: 'Account',
      relModelName: 'TradeTransfer',
      propertyName: 'tradeTransferIn'
    }
  )
  tradeTransferIn?: TradeTransfer[];

  @OneToMany(
    () => SwapAction,
    (param: SwapAction) => param.account,
    {
      nullable: true,
      modelName: 'Account',
      relModelName: 'SwapAction',
      propertyName: 'swapactionaccount'
    }
  )
  swapactionaccount?: SwapAction[];

  constructor(init?: Partial<Account>) {
    super();
    Object.assign(this, init);
  }
}
