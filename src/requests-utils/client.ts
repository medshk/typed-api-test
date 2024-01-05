import { baseURL } from 'app/constants';
import axios, { AxiosResponse } from 'axios';

import { Endpoint } from './shared';
import { Err } from './result.types';

type Payload = Record<string, string>;

export const makeClientForEndpoint = <In extends Object, Out>(ep: Endpoint<In, Out>) => ({
  fire: async (payload: Payload): Promise<Out | Err> => {
    // TODO. You can use axios which is already installed.
    // Let's say all endpoints use POST method for now.

    const response: AxiosResponse = await axios.post(baseURL + ep.path, payload);
    return response.data as Out;
  },
});
