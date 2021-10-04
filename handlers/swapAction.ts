import { SwapAction } from '../generated/model';
import BN from 'bn.js';

import { Exchange } from '../chain-interfaces'; // import via index.ts, this is a workaround related to ts-node
import {
  ExtrinsicContext,
  EventContext,
  StoreContext,
  DatabaseManager,
} from '@subsquid/hydra-common';
import { storeGet } from '../helpers/storeHelpers';
import { getHydraDxFormattedAddress } from '../helpers/utils';

function generateIntention(intentionId: string) {
  const entity = new SwapAction();
  entity.id = intentionId;

  return entity;
}

export async function registerSwapAction({
  store,
  event,
  block,
}: EventContext & StoreContext) {

}
