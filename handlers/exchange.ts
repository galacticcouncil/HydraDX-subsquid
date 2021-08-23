import { EventContext, StoreContext } from '@subsquid/hydra-common';
import { Exchange } from '../types';

export async function handleIntentionRegistered({
  store,
  event,
  block,
}: EventContext & StoreContext): Promise<void> {
  const [accountId, acc1, acc2, amount, intentionType, intentionId] = new Exchange.IntentionRegisteredEvent(event).params
}
