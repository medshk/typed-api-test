import { In_postLogin, Out_postLogin } from 'app/shared/auth/postLogin.endpoint';
import { Result } from './result.types';
import { In_sendMessage, Out_sendMessage } from 'app/shared/messaging/sendMessage.endpoint';
import { In_postSignUp, Out_postSignUp } from 'app/shared/auth/postSignUp.endpoint';

export type Endpoint<T> = {
  path: string;
  handler: T;
};
