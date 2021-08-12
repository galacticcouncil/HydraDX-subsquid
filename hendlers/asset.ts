import {
  SumReward,
  NoBondRecordAccount,
  StakingReward,
  StakingSlash,
} from '../generated/model';
import { Staking } from '../types/index'; // import via index.ts, this is a workaround related to ts-node
import BN from 'bn.js';
import {
  ExtrinsicContext,
  EventContext,
  StoreContext,
} from '@subsquid/hydra-common';

export async function ensureAssets({
  store,
  event,
  block,
}: EventContext & StoreContext) {

}
