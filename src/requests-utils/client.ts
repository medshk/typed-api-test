import { baseURL } from 'app/constants';
import axios, { AxiosResponse } from 'axios';

import { Endpoint } from './shared';
import { Err } from './result.types';

export const makeClientForEndpoint = <In extends Object, Out extends Object>(
  ep: Endpoint<In, Out>
) => ({
  fire: async (payload: In): Promise<Out | Err> => {
    // TODO. You can use axios which is already installed.
    // Let's say all endpoints use POST method for now.

    const response = await axios.post<In, AxiosResponse<Out>>(baseURL + ep.path, payload);
    return response.data;
  },
});
