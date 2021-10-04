import {
  DatabaseManager,
  EventContext,
  StoreContext,
} from '@subsquid/hydra-common';
import { Exchange } from '../chain-interfaces';
import {
  Pool,
  SwapAction,
  SwapActionFees,
  DirectTradeFee,
  TradeTransfer,
  SwapActionMetadata,
  SwapEventMeta,
} from '../generated/model';
import { getTokenById } from './token';
import BN from 'bn.js';
import {
  getHydraDxFormattedAddress,
  getEventStatusesScope,
} from '../helpers/utils';
import { getAccountById } from './account';
import { storeGet } from '../helpers/storeHelpers';
import { calculateSwapActionValues } from '../helpers/exchangeHelpers';
import appConstants from '../variables';
import {
  SubstrateBlock,
  SubstrateEvent,
} from '@subsquid/hydra-common/lib/interfaces';
import hydraDxApi from '../helpers/hydradxApi';

const getSwapActionByIntentionId = (
  intentionId: string,
  store: DatabaseManager
): Promise<SwapAction | undefined> => {
  return storeGet(
    store,
    SwapAction,
    intentionId,
    appConstants.store.storeGetRelationsSwapAction
  );
};

const getSwapEventMetaItem = (
  section: string = '',
  method: string = '',
  dispatchInfo: string = ''
): SwapEventMeta => {
  const newSwapEventMeta = new SwapEventMeta();

  newSwapEventMeta.section = section;
  newSwapEventMeta.method = method;
  newSwapEventMeta.dispatchInfo = dispatchInfo;

  return newSwapEventMeta;
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
  const newSwapActionMetadata = new SwapActionMetadata();

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

  /**
   * Create event meta data
   */

  newSwapActionMetadata.eventsMeta = [
    getSwapEventMetaItem(
      'exchange',
      appConstants.chain.hydraDXEvents.intentionRegistered
    ),
  ];

  newSwapActionMetadata.statusReady = false;
  newSwapActionMetadata.statusInBlock = false;
  newSwapActionMetadata.statusFinalized = false;
  newSwapActionMetadata.statusError = false;
  newSwapActionMetadata.errorsDetails = [];

  const eventStatusesScope = getEventStatusesScope(
    event,
    newSwapActionMetadata
  );

  newSwapActionMetadata.statusReady = eventStatusesScope.statusReady;
  newSwapActionMetadata.statusInBlock = eventStatusesScope.statusInBlock;
  newSwapActionMetadata.statusFinalized = eventStatusesScope.statusFinalized;
  newSwapActionMetadata.statusError = eventStatusesScope.statusError;

  newSwapAction.actionMetadata = newSwapActionMetadata;

  await store.save(newSwapAction);
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

  if (existingSwapAction.actionMetadata) {
    /**
     * Collect event meta data
     */

    existingSwapAction.actionMetadata.eventsMeta = [
      ...(existingSwapAction.actionMetadata.eventsMeta || []),
      getSwapEventMetaItem(
        'exchange',
        appConstants.chain.hydraDXEvents.intentionResolvedAMMTrade
      ),
    ];

    const eventStatusesScope = getEventStatusesScope(
      event,
      existingSwapAction.actionMetadata
    );

    existingSwapAction.actionMetadata.statusReady =
      eventStatusesScope.statusReady;
    existingSwapAction.actionMetadata.statusInBlock = eventStatusesScope.statusInBlock;
    existingSwapAction.actionMetadata.statusFinalized = eventStatusesScope.statusFinalized;
    existingSwapAction.actionMetadata.statusError = eventStatusesScope.statusError;
  }

  const calculatedSwapActionData = calculateSwapActionValues(
    existingSwapAction,
    appConstants.chain.hydraDXEvents.intentionResolvedAMMTrade
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
  ); // TODO can be removed and replaced by Account entity from existingSwapAction0

  const account1Inst = await getAccountById(
    getHydraDxFormattedAddress(account1.toString()),
    store
  ); // TODO can be removed and replaced by Account entity from existingSwapAction1

  if (
    !existingSwapAction0 ||
    !existingSwapAction0.tokenZero ||
    !existingSwapAction0.tokenOne ||
    !existingSwapAction1 ||
    !existingSwapAction1.tokenZero ||
    !existingSwapAction1.tokenOne ||
    !account0Inst ||
    !account1Inst
  )
    return;

  const tradeTransfer0 = await createTradeTransfer(store, event, block, {
    parentSwapAction: existingSwapAction0,
    assetSent: existingSwapAction0.tokenZero,
    assetReceived: existingSwapAction0.tokenOne,
    accountSent: account0Inst,
    accountReceived: account1Inst,
    amountSent: new BN(amountAsset0),
    amountReceived: new BN(amountAsset1),
  });

  const tradeTransfer1 = await createTradeTransfer(store, event, block, {
    parentSwapAction: existingSwapAction1,
    assetSent: existingSwapAction1.tokenZero,
    assetReceived: existingSwapAction1.tokenOne,
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

  if (
    existingSwapAction0.actionMetadata &&
    existingSwapAction1.actionMetadata
  ) {
    /**
     * Collect event meta data
     */

    existingSwapAction0.actionMetadata.eventsMeta = [
      ...(existingSwapAction0.actionMetadata.eventsMeta || []),
      getSwapEventMetaItem(
        'exchange',
        appConstants.chain.hydraDXEvents.intentionResolvedDirectTrade
      ),
    ];
    existingSwapAction1.actionMetadata.eventsMeta = [
      ...(existingSwapAction1.actionMetadata.eventsMeta || []),
      getSwapEventMetaItem(
        'exchange',
        appConstants.chain.hydraDXEvents.intentionResolvedDirectTrade
      ),
    ];
  }

  const calculatedSwapAction0Data = calculateSwapActionValues(
    existingSwapAction0,
    appConstants.chain.hydraDXEvents.intentionResolvedDirectTrade
  );
  const calculatedSwapAction1Data = calculateSwapActionValues(
    existingSwapAction1,
    appConstants.chain.hydraDXEvents.intentionResolvedDirectTrade
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

  newDirectTradeFeeDetailsItem.accountIdWho = getHydraDxFormattedAddress(
    accountIdWho.toString()
  );
  newDirectTradeFeeDetailsItem.accountIdTo = getHydraDxFormattedAddress(
    accountIdTo.toString()
  );
  newDirectTradeFeeDetailsItem.assetId = assetId.toString();
  newDirectTradeFeeDetailsItem.amount = amountFee.toString();

  existingSwapAction.fees.directTrade = [
    ...(existingSwapAction.fees.directTrade || []),
    newDirectTradeFeeDetailsItem,
  ];

  if (existingSwapAction.actionMetadata) {
    /**
     * Collect event meta data
     */
    existingSwapAction.actionMetadata.eventsMeta = [
      ...(existingSwapAction.actionMetadata.eventsMeta || []),
      getSwapEventMetaItem(
        'exchange',
        appConstants.chain.hydraDXEvents.intentionResolvedDirectTradeFees
      ),
    ];
  }

  const calculatedSwapActionData = calculateSwapActionValues(
    existingSwapAction,
    appConstants.chain.hydraDXEvents.intentionResolvedDirectTradeFees
  );

  console.log('calculatedSwapActionData >>> ', calculatedSwapActionData);

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

  const existingSwapAction = await getSwapActionByIntentionId(
    intentionId.toString(),
    store
  );

  if (!existingSwapAction) return;

  const api = hydraDxApi.getApi();
}
