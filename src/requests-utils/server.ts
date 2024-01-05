import { Express, NextFunction } from 'express';

import { isError } from './result.types';
import { Endpoint, HanlderConstraint } from './shared';

export const setupEndpoint = <T extends HanlderConstraint>(app: Express, endpoint: Endpoint<T>) => {
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
