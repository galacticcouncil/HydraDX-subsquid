import { Account } from '../generated/model';
import BN from 'bn.js';

import { System } from '../types/index'; // import via index.ts, this is a workaround related to ts-node
import {
  ExtrinsicContext,
  EventContext,
  StoreContext,
  DatabaseManager,
} from '@subsquid/hydra-common';
import { storeGet } from '../helpers/storeHelpers';
import { getHydraDxFormattedAddress } from '../helpers/utils';

function generateAccount(accountId: string) {
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
  const formattedAccountAddress = getHydraDxFormattedAddress(
    account.toString()
  );
  let existingAccount = await storeGet(store, Account, formattedAccountAddress);

  if (existingAccount == null) {
    existingAccount = generateAccount(formattedAccountAddress);
    await store.save(existingAccount);
  }
}

/**
 * @param accountId - address already formatted for HydraDX format (63)
 * @param store
 */
export async function ensureAccountById(
  accountId: string,
  store: DatabaseManager
) {
  let account = await storeGet(store, Account, accountId);

  if (account == null) {
    account = generateAccount(accountId);
    await store.save(account);
  }

  return account;
}

export async function getAccountById(
  accountId: string,
  store: DatabaseManager
) {
  return await ensureAccountById(accountId, store);
}
