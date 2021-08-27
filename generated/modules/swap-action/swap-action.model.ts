import {
  BaseModel,
  NumericField,
  DateTimeField,
  Model,
  ManyToOne,
  OneToMany,
  StringField,
  JSONField,
} from '@subsquid/warthog';

import BN from 'bn.js';

import { Account } from '../account/account.model';
import { Token } from '../token/token.model';
import { Pool } from '../pool/pool.model';
import { TradeTransfer } from '../trade-transfer/trade-transfer.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class SwapAction extends BaseModel {
  @DateTimeField({})
  timestamp!: Date;

  @StringField({})
  block!: string;

  @ManyToOne(() => Account, (param: Account) => param.initiatedSwapActions, {
    skipGraphQLField: true,

    modelName: 'SwapAction',
    relModelName: 'Account',
    propertyName: 'initiatedByAccount',
  })
  initiatedByAccount!: Account;

  @StringField({})
  intentionType!: string;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  amount?: BN;

  @ManyToOne(() => Token, (param: Token) => param.swapactiontokenZero, {
    skipGraphQLField: true,
    nullable: true,
    modelName: 'SwapAction',
    relModelName: 'Token',
    propertyName: 'tokenZero',
  })
  tokenZero?: Token;

  @ManyToOne(() => Token, (param: Token) => param.swapactiontokenOne, {
    skipGraphQLField: true,
    nullable: true,
    modelName: 'SwapAction',
    relModelName: 'Token',
    propertyName: 'tokenOne',
  })
  tokenOne?: Token;

  @StringField({
    nullable: true,
  })
  assetsPair?: string;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  slippage?: BN;

  @JSONField({ filter: true, gqlFieldType: jsonTypes.DirectTradeFee, nullable: true })
  fees?: jsonTypes.DirectTradeFee;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  totalFeeFinal?: BN;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  match?: BN;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  totalDirectTradeExchanged?: BN;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  saved?: BN;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  amountXykTrade?: BN;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  amountOutXykTrade?: BN;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  amountSoldBought?: BN;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  totalAmountFinal?: BN;

  @ManyToOne(() => Pool, (param: Pool) => param.swapActions, {
    skipGraphQLField: true,
    nullable: true,
    modelName: 'SwapAction',
    relModelName: 'Pool',
    propertyName: 'xykTradePool',
  })
  xykTradePool?: Pool;

  @OneToMany(() => TradeTransfer, (param: TradeTransfer) => param.swapAction, {
    nullable: true,
    modelName: 'SwapAction',
    relModelName: 'TradeTransfer',
    propertyName: 'directTrades',
  })
  directTrades?: TradeTransfer[];

  constructor(init?: Partial<SwapAction>) {
    super();
    Object.assign(this, init);
  }
}
