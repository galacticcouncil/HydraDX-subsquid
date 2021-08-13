import { StoreContext } from '@subsquid/hydra-common';

type EntityType<T> = {
  new (...args: any[]): T;
};

export function storeGet<T>(
  store: StoreContext['store'],
  entityType: EntityType<T>,
  id: string
): Promise<T | undefined> {
  return store.get(entityType, { where: { id } });
}
