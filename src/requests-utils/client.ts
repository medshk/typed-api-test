import { baseURL } from 'app/constants';
import axios, { AxiosResponse } from 'axios';

import { Endpoint } from './shared';

export const makeClientForEndpoint = (ep: Endpoint) => ({
  fire: async (
    payload: any // TODO
  ): Promise<any> => {
    // TODO. You can use axios which is already installed.
    // Let's say all endpoints use POST method for now.
  },
});
