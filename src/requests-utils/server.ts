import { Express, NextFunction, RequestHandler, response } from 'express';

import { isError, Result, Err } from './result.types';
import { Endpoint } from './shared';

export const setupEndpoint = (app: Express, endpoint: Endpoint) => {
  app.post(endpoint.path, async (req, res, next: NextFunction) => {
    const response = await endpoint.handler(req.body);
    if ('error' in response && isError(response)) {
      const err = new Error(`${response.error.message}`);
      // err = response.error.status;
      next(err);
    } else {
      res.status(200).json(response.data);
    }
  });
};
