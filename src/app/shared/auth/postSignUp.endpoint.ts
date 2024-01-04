import { handler_postSignUp } from 'app/server/api/auth/postSignUp.handler';
import { makeClientForEndpoint } from 'requests-utils/client';

export const path_postSignUp = '/api/signup/';

export type In_postSignUp = { password: string; username: string; email: String };
export type Out_postSignUp = { jwtToken: string };

export const endpoint_postSignUp = {
  path: path_postSignUp,
  handler: handler_postSignUp, // maybe you noticed here that there is a circular import. It's required for simplicity sake in this exercice, don't worry too much about it.
};

export const client_postSignUp = makeClientForEndpoint<Out_postSignUp>(endpoint_postSignUp);
