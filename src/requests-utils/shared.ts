import { In_postLogin, Out_postLogin } from 'app/shared/auth/postLogin.endpoint';
import { Result } from './result.types';
import { In_sendMessage, Out_sendMessage } from 'app/shared/messaging/sendMessage.endpoint';
import { In_postSignUp, Out_postSignUp } from 'app/shared/auth/postSignUp.endpoint';

export type Handler<In extends Object, out> = (payload: In) => out;
export type Endpoint<In extends Object, out> = {
  path: string;
  handler: Handler<In, out>;
};
