import { Pool, Token } from '../generated/model';
import { XYK } from '../chain-interfaces'; // import via index.ts, this is a workaround related to ts-node
import BN from 'bn.js';
import {
  EventContext,
  StoreContext,
  DatabaseManager,
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
  const [
    ownerAccountId,
    assetId0,
    assetId1,
    sharedTokenBalance,
    sharedTokenId,
    poolAddress,
  ] = new XYK.PoolCreatedEvent(event).params;

  const createdByAddressFormatted = getHydraDxFormattedAddress(
    ownerAccountId.toString()
  );

  // TODO Should be removed after merge https://github.com/galacticcouncil/Basilisk-node/pull/124
  await fetchOnChainTokensDetails(store);

  const token0Inst = await getTokenById(assetId0.toString(), store);
  const token1Inst = await getTokenById(assetId1.toString(), store);
  const sharedTokenInst = await getTokenById(sharedTokenId.toString(), store);
  const createdByAccount = await getAccountById(
    createdByAddressFormatted,
    store
  );

  let newPool = new Pool();

  newPool.id = getHydraDxFormattedAddress(poolAddress.toString());
  newPool.isActive = true;

  newPool.specVersion = block.runtimeVersion.toString(); // TODO make conversion
  newPool.sharedToken = sharedTokenInst;
  newPool.sharedAssetInitialBalance = new BN(sharedTokenBalance.toString());
  newPool.tokenZero = token0Inst;
  newPool.tokenOne = token1Inst;
  newPool.swapActions = [];
  newPool.assetsVolume = [];
  newPool.ownerAccount = createdByAccount;
  newPool.createdAt = new Date(event.blockTimestamp);

  await store.save(newPool);
}

export async function getPoolById(poolId: string, store: DatabaseManager) {
  return storeGet(store, Pool, poolId);
}
