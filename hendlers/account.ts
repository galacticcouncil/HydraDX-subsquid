import {
  SumReward,
  NoBondRecordAccount,
  StakingReward,
  StakingSlash,
  Account
} from '../generated/model';
import BN from 'bn.js';

import { System } from '../types/index'; // import via index.ts, this is a workaround related to ts-node
import {
  ExtrinsicContext,
  EventContext,
  StoreContext,
} from '@subsquid/hydra-common';
import { storeGet } from '../helpers/storeHelpers';

function generateAccount(accountId: string){
  const entity = new Account();
  entity.id = accountId;
  entity.specVersion = 0;
  entity.tradeTransferOut = [];
  entity.tradeTransferIn = [];

  return entity;
}

export async function ensureAccount({
  store,
  event,
  block,
}: EventContext & StoreContext) {
  const [account] = new System.NewAccountEvent(event).params;
  let existingAccount = await storeGet(store, Account, account.toString());

  if (existingAccount == null) {
    existingAccount = generateAccount(account.toString());
    await store.save(existingAccount);
  }

}
