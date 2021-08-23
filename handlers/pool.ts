import { Pool } from '../generated/model';
import { XYK } from '../types/index'; // import via index.ts, this is a workaround related to ts-node
import BN from 'bn.js';
import { v4 as uuidv4 } from 'uuid';
import {
  ExtrinsicContext,
  EventContext,
  StoreContext,
} from '@subsquid/hydra-common';
import { storeGet } from '../helpers/storeHelpers';
import { getTokenById, fetchOnChainTokensDetails } from './token';
import { getAccountById } from './account';
import { getHydraDxFormattedAddress } from '../helpers/utils';

export async function createPool({
  store,
  event,
  block,
}: EventContext & StoreContext) {
  const [accountId, assetId0, assetId1, balance] = new XYK.PoolCreatedEvent(
    event
  ).params;

  const createdByAddressFormatted = getHydraDxFormattedAddress(
    accountId.toString()
  );

  // TODO Should be removed after merge https://github.com/galacticcouncil/Basilisk-node/pull/124
  await fetchOnChainTokensDetails(store);

  const token0Inst = await getTokenById(assetId0.toString(), store);
  const token1Inst = await getTokenById(assetId1.toString(), store);
  const createdByAccount = await getAccountById(
    createdByAddressFormatted,
    store
  );

  let newPool = new Pool();

  /**
   * newPool.id - must be changed to real new pool address when response from
   * "xyk.PoolCreated" event will be updated.
   */
  newPool.id = uuidv4();
  newPool.isActive = true;

  newPool.specVersion = block.runtimeVersion.toString(); // TODO make conversion
  // newPool.sharedAsset = '0';
  newPool.sharedAssetInitialBalance = new BN(balance.toString());
  newPool.tokenZero = token0Inst;
  newPool.tokenOne = token1Inst;
  newPool.swapActions = [];
  newPool.assetsVolume = [];
  newPool.ownerAccount = createdByAccount;
  newPool.createdAt = new Date(event.blockTimestamp);

  await store.save(newPool);

  /**
   * Add new pool to owner account.
   */
  const ownerAccountForUpdate = createdByAccount;
  ownerAccountForUpdate.createdPools = [
    ...(ownerAccountForUpdate.createdPools || []),
    newPool,
  ];
  await store.save(ownerAccountForUpdate);
}
