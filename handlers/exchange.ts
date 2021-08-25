import { EventContext, StoreContext } from '@subsquid/hydra-common';
import { Exchange } from '../types';
import { SwapAction } from '../generated/model';
import { getTokenById } from './token';
import BN from 'bn.js';
import { getHydraDxFormattedAddress } from '../helpers/utils';
import { getAccountById } from './account';

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
  const token0Inst = await getTokenById(token0.toString(), store);
  const token1Inst = await getTokenById(token1.toString(), store);

  const createdByAccount = await getAccountById(
    getHydraDxFormattedAddress(accountId.toString()),
    store
  );

  newSwapAction.id = intentionId.toString();
  newSwapAction.timestamp = new Date(event.blockTimestamp);
  newSwapAction.block = block.hash;
  newSwapAction.intentionType = intentionType.toString();
  newSwapAction.tokenZero = token0Inst;
  newSwapAction.tokenOne = token1Inst;
  newSwapAction.amount = new BN(amount);
  newSwapAction.account = createdByAccount;
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
    account1,
    account2,
    intentionId1,
    intentionId2,
    amount1,
    amount2,
  ] = new Exchange.IntentionResolvedDirectTradeEvent(event).params;
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
