import { StoreContext } from '@subsquid/hydra-common';

type EntityType<T> = {
  new (...args: any[]): T;
};

export function storeGet<T>(
  store: StoreContext['store'],
  entityType: EntityType<T>,
  id: string,
  relations: string[] = []
): Promise<T | undefined> {
  const getConfig: {
    where: { id: string };
    loadEagerRelations: boolean;
    relations?: string[];
  } = {
    where: { id },
    loadEagerRelations: true,
  };
  if (relations && relations.length > 0) getConfig.relations = relations;
  return store.get(entityType, getConfig);
}
