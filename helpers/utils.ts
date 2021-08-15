import { encodeAddress } from '@polkadot/util-crypto';
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