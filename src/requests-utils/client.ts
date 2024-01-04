import { baseURL } from 'app/constants';
import axios, { AxiosResponse } from 'axios';

import { Endpoint } from './shared';
import { Err, Result } from './result.types';

type Payload = Record<string, string>;

export const makeClientForEndpoint = <T extends object>(ep: Endpoint) => ({
  fire: async (payload: Payload): Promise<T | Err> => {
    // TODO. You can use axios which is already installed.
    // Let's say all endpoints use POST method for now.
    try {
      const response: AxiosResponse = await axios.post(baseURL + ep.path, payload);
      return response.data as Promise<T>;
    } catch (error) {
      return error as Err;
    }
  },
});
