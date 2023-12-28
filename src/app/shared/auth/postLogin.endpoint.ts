import { handler_postLogin } from 'app/server/api/auth/postLogin.handler';
import { makeClientForEndpoint } from 'requests-utils/client';

export const path_postLogin = '/api/login/';

export type In_postLogin = { password: string; username: string };
export type Out_postLogin = { jwtToken: string };

export const endpoint_postLogin = {
  path: path_postLogin,
  handler: handler_postLogin, // maybe you noticed here that there is a circular import. It's required for simplicity sake in this exercice, don't worry too much about it.
};

export const client_postLogin = makeClientForEndpoint(endpoint_postLogin);
