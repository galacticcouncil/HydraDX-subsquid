import { Api, ApiPromise } from 'hydradx-js';

let hydraDxApi: ApiPromise | null = null;

export const initHydraDxApi = async (): Promise<void> => {
  hydraDxApi = await Api.initialize({
    error: (e: Error) => {
      console.log('on error listener - ', e);
    },
    disconnected: () => {
      console.log('on disconnected listener');
    },
    connected: () => {
      console.log('on connected listener');
    },
    ready: (apiInstance?: ApiPromise) => {
      console.log('on ready listener - ');
    },
    onTxEvent: eventData => {
      console.log('onTxEvent >>> >>> ');
    },
  }, process.env.API_CONNECTION_URL);
}


export default hydraDxApi;