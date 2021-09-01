import {
  DatabaseManager,
  EventContext,
  StoreContext,
} from '@subsquid/hydra-common';
import { Exchange } from '../types/index';
import {
  Pool,
  SwapAction,
  SwapActionFees,
  DirectTradeFee,
  TradeTransfer,
} from '../generated/model';
import { getTokenById } from './token';
import BN from 'bn.js';
import { getHydraDxFormattedAddress } from '../helpers/utils';
import { getAccountById } from './account';
import { storeGet } from '../helpers/storeHelpers';
import { calculateSwapActionValues } from '../helpers/exchangeHelpers';
import {
  SubstrateBlock,
  SubstrateEvent,
} from '@subsquid/hydra-common/lib/interfaces';

const getSwapActionByIntentionId = (
  intentionId: string,
  store: DatabaseManager
): Promise<SwapAction | undefined> => {
  return storeGet(store, SwapAction, intentionId);
};

const createTradeTransfer = async (
  store: DatabaseManager,
  event: SubstrateEvent,
  block: SubstrateBlock,
  transferData: any
): Promise<TradeTransfer> => {
  const newTradeTransfer = new TradeTransfer();

  newTradeTransfer.timestamp = new Date(event.blockTimestamp);
  newTradeTransfer.block = block.hash;
  newTradeTransfer.parentSwapAction = transferData.parentSwapAction;
  newTradeTransfer.assetSent = transferData.assetSent;
  newTradeTransfer.assetReceived = transferData.assetReceived;
  newTradeTransfer.accountReceived = transferData.accountReceived;
  newTradeTransfer.accountSent = transferData.accountSent;
  newTradeTransfer.amountReceived = transferData.amountReceived;
  newTradeTransfer.amountSent = transferData.amountSent;

  await store.save(newTradeTransfer);

  return newTradeTransfer;
};

export async function onIntentionRegistered({
  store,
  event,
  block,
}: EventContext & StoreContext): Promise<void> {
  /**
   * parsedData: <Array> [AccountId, AssetId, AssetId, Balance, IntentionType, IntentionID]
   *                     [who, asset a, asset b, amount, intention type, intention id]
   */
  const [
    accountId,
    token0,
    token1,
    amount,
    intentionType,
    intentionId,
  ] = new Exchange.IntentionRegisteredEvent(event).params;

  const newSwapAction = new SwapAction();
  const newSwapActionFees = new SwapActionFees();
  const token0Inst = await getTokenById(token0.toString(), store);
  const token1Inst = await getTokenById(token1.toString(), store);

  const initiatedByAccount = await getAccountById(
    getHydraDxFormattedAddress(accountId.toString()),
    store
  );

  newSwapActionFees.directTrade = [];

  newSwapAction.id = intentionId.toString();
  newSwapAction.timestamp = new Date(event.blockTimestamp);
  newSwapAction.block = block.hash;
  newSwapAction.intentionType = intentionType.toString();
  newSwapAction.tokenZero = token0Inst; // Sent asset
  newSwapAction.tokenOne = token1Inst; // Received asset
  newSwapAction.amount = new BN(amount);
  newSwapAction.initiatedByAccount = initiatedByAccount;
  newSwapAction.fees = newSwapActionFees;
  newSwapAction.totalFeeFinal = new BN(0);
  newSwapAction.match = new BN(0);
  newSwapAction.totalDirectTradeExchanged = new BN(0);
  newSwapAction.saved = new BN(0);
  newSwapAction.amountXykTrade = new BN(0);
  newSwapAction.amountOutXykTrade = new BN(0);
  newSwapAction.amountSoldBought = new BN(0);
  newSwapAction.totalAmountFinal = new BN(0);

  await store.save(newSwapAction);

  /**
   * Add new swapAction to initializer account.
   */
  // initiatedByAccount.initiatedSwapActions = [
  //   ...(initiatedByAccount.initiatedSwapActions || []),
  //   newSwapAction,
  // ];
  // await store.save(initiatedByAccount);
}

export async function onIntentionResolvedAMMTrade({
  store,
  event,
  block,
}: EventContext & StoreContext): Promise<void> {
  /**
   * parsedData: <Array> [AccountId, IntentionType, IntentionID, Balance, Balance]
   *                     [who, intention type, intention id, amount, amount sold/bought]
   */

  const [
    accountId,
    intentionType,
    intentionId,
    amount,
    amountSoldBought,
  ] = new Exchange.IntentionResolvedAMMTradeEvent(event).params;

  const existingSwapAction = await getSwapActionByIntentionId(
    intentionId.toString(),
    store
  );

  if (!existingSwapAction) return;

  existingSwapAction.amountXykTrade = new BN(amount);
  existingSwapAction.amountOutXykTrade = new BN(amountSoldBought);

  const calculatedSwapActionData = calculateSwapActionValues(
    existingSwapAction,
    'IntentionResolvedAMMTrade'
  );

  await store.save(calculatedSwapActionData);
}

export async function onIntentionResolvedDirectTrade({
  store,
  event,
  block,
}: EventContext & StoreContext): Promise<void> {
  /**
   * parsedData: <Array> [AccountId, AccountId, IntentionID, IntentionID, Balance, Balance]
   *                     [User1 acc id, User2 acc id, intention id 1, intention id 2, amount 1, amount 2]
   *
   * First amount is amount of asset A going from first account to second account,
   * and the second amount is asset B going from second account to first account.
   *
   * Which assets have been used - check in event "IntentionRegistered" by
   * appropriate IntentionID.
   *
   * One exchange action (sell/buy) can includes multiple direct trade transactions,
   * that's why we need track all direct trade transactions for one exchange action.
   */

  const [
    account0,
    account1,
    intentionId0,
    intentionId1,
    amountAsset0,
    amountAsset1,
  ] = new Exchange.IntentionResolvedDirectTradeEvent(event).params;

  const existingSwapAction0 = await getSwapActionByIntentionId(
    intentionId0.toString(),
    store
  );

  const existingSwapAction1 = await getSwapActionByIntentionId(
    intentionId1.toString(),
    store
  );

  const account0Inst = await getAccountById(
    getHydraDxFormattedAddress(account0.toString()),
    store
  );

  const account1Inst = await getAccountById(
    getHydraDxFormattedAddress(account1.toString()),
    store
  );

  if (
    !existingSwapAction0 ||
    !existingSwapAction0.tokenZero ||
    !existingSwapAction1 ||
    !existingSwapAction1.tokenZero ||
    !account0Inst ||
    !account1Inst
  )
    return;

  const token0Sa0Inst = await getTokenById(existingSwapAction0.tokenZero.id, store);
  const token1Sa0Inst = await getTokenById(existingSwapAction0.tokenZero.id, store);

  const token0Sa1Inst = await getTokenById(existingSwapAction1.tokenZero.id, store);
  const token1Sa1Inst = await getTokenById(existingSwapAction1.tokenZero.id, store);

  console.log('existingSwapAction0 >>>> ', token0Sa0Inst)

  const tradeTransfer0 = await createTradeTransfer(store, event, block, {
    parentSwapAction: existingSwapAction0,
    assetSent: token0Sa0Inst,
    assetReceived: token1Sa0Inst,
    accountSent: account0Inst,
    accountReceived: account1Inst,
    amountSent: new BN(amountAsset0),
    amountReceived: new BN(amountAsset1),
  });

  const tradeTransfer1 = await createTradeTransfer(store, event, block, {
    parentSwapAction: existingSwapAction1,
    assetSent: token0Sa1Inst,
    assetReceived: token1Sa1Inst,
    accountSent: account1Inst,
    accountReceived: account0Inst,
    amountSent: new BN(amountAsset1),
    amountReceived: new BN(amountAsset0),
  });

  existingSwapAction0.directTrades = [
    ...(existingSwapAction0.directTrades || []),
    tradeTransfer0,
  ];
  existingSwapAction1.directTrades = [
    ...(existingSwapAction1.directTrades || []),
    tradeTransfer1,
  ];

  const calculatedSwapAction0Data = calculateSwapActionValues(
    existingSwapAction0,
    'IntentionResolvedDirectTrade'
  );
  const calculatedSwapAction1Data = calculateSwapActionValues(
    existingSwapAction1,
    'IntentionResolvedDirectTrade'
  );

  await store.save(calculatedSwapAction0Data);
  await store.save(calculatedSwapAction1Data);

}

export async function onIntentionResolvedDirectTradeFees({
  store,
  event,
  block,
}: EventContext & StoreContext): Promise<void> {
  /**
   * parsedData: <Array> [AccountId, IntentionID, AccountId, AssetId, Balance]
   *                     [who, IntentionID, account paid to, asset, fee amount]
   */

  const [
    accountIdWho,
    intentionId,
    accountIdTo,
    assetId,
    amountFee,
  ] = new Exchange.IntentionResolvedDirectTradeFeesEvent(event).params;

  const existingSwapAction = await getSwapActionByIntentionId(
    intentionId.toString(),
    store
  );

  if (!existingSwapAction) return;

  const newDirectTradeFeeDetailsItem = new DirectTradeFee();

  newDirectTradeFeeDetailsItem.accountIdWho = accountIdWho.toString();
  newDirectTradeFeeDetailsItem.accountIdTo = accountIdTo.toString();
  newDirectTradeFeeDetailsItem.assetId = assetId.toString();
  newDirectTradeFeeDetailsItem.amount = new BN(amountFee);

  existingSwapAction.fees.directTrade = [
    ...(existingSwapAction.fees.directTrade || []),
    newDirectTradeFeeDetailsItem,
  ];

  const calculatedSwapActionData = calculateSwapActionValues(
    existingSwapAction,
    'IntentionResolvedAMMTrade'
  );

  console.log('calculatedSwapActionData >>> ', calculatedSwapActionData)

  await store.save(calculatedSwapActionData);
}

export async function onIntentionResolveErrorEvent({
  store,
  event,
  block,
}: EventContext & StoreContext): Promise<void> {
  /**
   * parsedData: <Array> [AccountId, AssetPair, IntentionType, IntentionId, dispatch]
   *                     [who, assets, sell or buy, intention id, error detail]
   */

  const [
    accountId,
    assetPair,
    intentionType,
    intentionId,
    dispatch,
  ] = new Exchange.IntentionResolveErrorEventEvent(event).params;
}
