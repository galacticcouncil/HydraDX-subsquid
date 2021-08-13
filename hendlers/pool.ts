import { Pool } from '../generated/model';
import { XYK } from '../types/index'; // import via index.ts, this is a workaround related to ts-node
import BN from 'bn.js';
import {
  ExtrinsicContext,
  EventContext,
  StoreContext,
} from '@subsquid/hydra-common';
import { storeGet } from '../helpers/storeHelpers';
import { getTokenById } from './token';

export async function createPool({
  store,
  event,
  block,
}: EventContext & StoreContext) {
  const [accountId, assetId0, assetId1, balance] = new XYK.PoolCreatedEvent(
    event
  ).params;

  const token0Inst = await getTokenById(assetId0.toString(), store);
  const token1Inst = await getTokenById(assetId1.toString(), store);

  let newPool = new Pool();

  newPool.id = accountId.toString();
  newPool.specVersion = 0;
  // newPool.sharedAsset = '0';
  newPool.sharedAssetInitialBalance = new BN(balance.toString());
  newPool.token0 = token0Inst;
  newPool.token1 = token1Inst;
  newPool.swapActions = [];
  newPool.assetsVolume = [];

  await store.save(newPool);
}
