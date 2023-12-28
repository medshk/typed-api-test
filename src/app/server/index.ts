import 'module-alias/register'; // this is required to do absolute imports

import { PORT } from 'app/constants';
import { endpoint_postLogin } from 'app/shared/auth/postLogin.endpoint';
import { endpoint_sendMessage } from 'app/shared/messaging/sendMessage.endpoint';
import express from 'express';
import { setupEndpoint } from 'requests-utils/server';

const app = express();

app.use(express.json());

// these are the app.post(...)
setupEndpoint(app, endpoint_sendMessage);
setupEndpoint(app, endpoint_postLogin);

const server = app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT} in ${app.get('env')} mode'}`);
});

export default server;
