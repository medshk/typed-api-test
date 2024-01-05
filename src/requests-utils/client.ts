import { baseURL } from 'app/constants';
import axios, { AxiosResponse } from 'axios';

import { Endpoint } from './shared';
import { Err, Result } from './result.types';

type Payload = Record<string, string>;

export const makeClientForEndpoint = <T extends (...args: any[]) => any>(ep: Endpoint<T>) => ({
  fire: async (payload: Payload): Promise<ReturnType<T> | Err> => {
    // TODO. You can use axios which is already installed.
    // Let's say all endpoints use POST method for now.
    try {
      const response: AxiosResponse = await axios.post(baseURL + ep.path, payload);
      return response.data as ReturnType<T>;
    } catch (error) {
      return error as Err;
    }
  },
});
