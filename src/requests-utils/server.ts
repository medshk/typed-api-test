import { Express, NextFunction } from 'express';

import { Result, isError } from './result.types';
import { Endpoint } from './shared';
import { AxiosResponse } from 'axios';

export const setupEndpoint = <In extends Object, Out extends object>(
  app: Express,
  endpoint: Endpoint<In, Out>
) => {
  app.post(endpoint.path, async (req, res, next: NextFunction) => {
    try {
      const response = (await endpoint.handler(req.body)) as AxiosResponse<Result<Out>>;

      if ('error' in response && isError(response)) {
        const err = new Error(`${response.error.message}`);
        next(err);
      } else {
        res.status(200).json(response.data);
      }
    } catch (error) {
      next(error);
    }
  });
};
