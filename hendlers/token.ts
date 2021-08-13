import {
  Token,
} from '../generated/model';
import { Staking } from '../types/index'; // import via index.ts, this is a workaround related to ts-node
import BN from 'bn.js';
import {
  DatabaseManager
} from '@subsquid/hydra-common';
import { storeGet } from '../helpers/storeHelpers';

function generateToken(assetId: string){
  const entity = new Token();
  entity.id = assetId;

  entity.decimal = 12;
  entity.name = '';
  entity.shared = false;
  // entity.parentPool = undefined;

  return entity;
}

export async function ensureTokenById(assetId: string, store: DatabaseManager) {
  let token = await storeGet(store, Token, assetId);

  if (token == null) {
    token = generateToken(assetId);
    await store.save(token);
  }

  return token;
}


export async function getTokenById(tokenId: string, store: DatabaseManager) {

  return await ensureTokenById(tokenId, store);

}