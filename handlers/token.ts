import { Token } from '../generated/model';
import { AssetRecord } from '../helpers/types';
import BN from 'bn.js';
import { DatabaseManager } from '@subsquid/hydra-common';
import { storeGet } from '../helpers/storeHelpers';
import hydraDxApi from '../helpers/hydradxApi';

let assetListOnChain: AssetRecord[] = [{ assetId: 0, name: 'HDX' }];

function generateToken(assetId: string) {
  const entity = new Token();

  const onChainTokenDetails = assetListOnChain.find(
    item => +item.assetId === +assetId
  );

  entity.id = assetId;

  entity.decimal = 12;
  entity.name = onChainTokenDetails ? onChainTokenDetails.name : '';
  entity.shared = false;
  // entity.parentPool = undefined;

  return entity;
}

export async function ensureTokenById(assetId: string, store: DatabaseManager) {
  let token = await storeGet(store, Token, assetId);

  if (token == undefined) {
    token = generateToken(assetId);
    await store.save(token);
  } else {
    const onChainTokenDetails = assetListOnChain.find(
      item => token && +item.assetId === +token.id
    );
    if (onChainTokenDetails) {
      token.name = onChainTokenDetails.name;
      await store.save(token);
    }
  }

  return token;
}

export async function fetchOnChainTokensDetails(store: DatabaseManager) {
  const api = hydraDxApi.getApi();
  let newAssetList = [];

  try {
    newAssetList = await api.hydraDx.query.getAssetList();
  } catch (e) {
    console.log(e);
  }
  if (!newAssetList && newAssetList.length === 0) return;

  const newIds = newAssetList.map(
    (item: AssetRecord) => +item.assetId
  );

  assetListOnChain = [
    ...newAssetList,
    ...assetListOnChain.filter(item => !newIds.includes(+item.assetId)),
  ];
}

export async function getTokenById(tokenId: string, store: DatabaseManager) {
  return await ensureTokenById(tokenId, store);
}
