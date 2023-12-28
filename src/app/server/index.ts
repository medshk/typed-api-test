import 'module-alias/register'; // this is required to do absolute imports

import { PORT } from 'app/constants';
import { endpoint_postLogin } from 'app/shared/auth/postLogin.endpoint';
import { endpoint_sendMessage } from 'app/shared/messaging/sendMessage.endpoint';
import express, { NextFunction, Request, Response } from 'express';
import { setupEndpoint } from 'requests-utils/server';
import { endpoint_postSignUp } from 'app/shared/auth/postSignUp.endpoint';

const app = express();

app.use(express.json());

// these are the app.post(...)
setupEndpoint(app, endpoint_sendMessage);
setupEndpoint(app, endpoint_postLogin);
setupEndpoint(app, endpoint_postSignUp);

// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Something went wrong!');
});

const server = app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT} in ${app.get('env')} mode'}`);
});

export default server;
