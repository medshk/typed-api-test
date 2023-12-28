import { baseURL } from 'app/constants';
import axios, { AxiosResponse } from 'axios';

import { Endpoint } from './shared';

type Payload = Record<string, string>;

export const makeClientForEndpoint = (ep: Endpoint) => ({
  fire: async (payload: Payload): Promise<any> => {
    // TODO. You can use axios which is already installed.
    // Let's say all endpoints use POST method for now.
    try {
      const response: AxiosResponse = await axios.post(baseURL + ep.path, payload);
      return response.data;
    } catch (error: any) {
      return error;
    }
  },
});
