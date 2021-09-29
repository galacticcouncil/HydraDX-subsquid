import { encodeAddress } from '@polkadot/util-crypto';
import { SubstrateEvent } from '@subsquid/hydra-common/lib/interfaces';
import { SwapActionMetadata } from '../generated/model';

// import { TokenItem } from '../appTypes/types';
// import type { Hash } from '@polkadot/types/interfaces/runtime';

export type TokenItem = {
  id: string;
  decimal: number;
  name: string;
};

export const getHydraDxFormattedAddress: (
  address: string,
  format?: number
) => string = (address = '', format = 63) => {
  return encodeAddress(address, format);
};

export const getEventPhase = (eventRecord: SubstrateEvent): string => {
  const { params } = eventRecord;
  console.log('>>> getEventPhase - params - ', params);
  return '';
};

export const getEventStatusesScope = (
  eventRecord: SubstrateEvent,
  currentSwapActionMetadata: SwapActionMetadata
) => {
  const eventPhase = getEventPhase(eventRecord);

  console.log('>>> eventPhase >>> - ', eventPhase);

  return {
    statusReady:
      currentSwapActionMetadata.statusReady || eventPhase === 'isReady',
    statusInBlock:
      currentSwapActionMetadata.statusInBlock || eventPhase === 'isInBlock',
    statusFinalized:
      currentSwapActionMetadata.statusFinalized || eventPhase === 'isFinalized',
    statusError: currentSwapActionMetadata.statusError,
  };
};

// export const getTokensList = async (blockHash: Hash): Promise<TokenItem[]> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//
//       const assetIds = await api.query.assetRegistry.assetIds.entries();
//
//       const assetList: TokenItem[] = [{ id: '0', name: 'HDX', decimal: 9999 }];
//
//       assetIds.forEach(([assetName, id]) => {
//         const assetId = api.createType('Option<u32>', id).toString();
//         const name = assetName.toHuman()?.toString() || '0xERR';
//         assetList[assetId] = { id: assetId, name, decimal: 9999 };
//       });
//
//       resolve(assetList);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
