import { BaseModel, IntField, NumericField, Model, ManyToOne, OneToMany, StringField, JSONField } from 'warthog';

import BN from 'bn.js';

import { Token } from '../token/token.model';
import { Account } from '../account/account.model';
import { TradeTransfer } from '../trade-transfer/trade-transfer.model';
import { Pool } from '../pool/pool.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class SwapAction extends BaseModel {
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

  @StringField({})
  type!: string;

  @ManyToOne(
    () => Token,
    (param: Token) => param.swapactiontokenZero,
    {
      skipGraphQLField: true,
      nullable: true,
      modelName: 'SwapAction',
      relModelName: 'Token',
      propertyName: 'tokenZero'
    }
  )
  tokenZero?: Token;

  @ManyToOne(
    () => Token,
    (param: Token) => param.swapactiontokenOne,
    {
      skipGraphQLField: true,
      nullable: true,
      modelName: 'SwapAction',
      relModelName: 'Token',
      propertyName: 'tokenOne'
    }
  )
  tokenOne?: Token;

  @ManyToOne(
    () => Account,
    (param: Account) => param.swapactionaccount,
    {
      skipGraphQLField: true,
      nullable: true,
      modelName: 'SwapAction',
      relModelName: 'Account',
      propertyName: 'account'
    }
  )
  account?: Account;

  @OneToMany(
    () => TradeTransfer,
    (param: TradeTransfer) => param.swapAction,
    {
      nullable: true,
      modelName: 'SwapAction',
      relModelName: 'TradeTransfer',
      propertyName: 'directTrades'
    }
  )
  directTrades?: TradeTransfer[];

  @ManyToOne(
    () => Pool,
    (param: Pool) => param.swapActions,
    {
      skipGraphQLField: true,
      nullable: true,
      modelName: 'SwapAction',
      relModelName: 'Pool',
      propertyName: 'xykTradePool'
    }
  )
  xykTradePool?: Pool;

  constructor(init?: Partial<SwapAction>) {
    super();
    Object.assign(this, init);
  }
}
