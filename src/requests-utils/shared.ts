import { In_postLogin, Out_postLogin } from 'app/shared/auth/postLogin.endpoint';
import { Result } from './result.types';
import { In_sendMessage, Out_sendMessage } from 'app/shared/messaging/sendMessage.endpoint';
import { In_postSignUp, Out_postSignUp } from 'app/shared/auth/postSignUp.endpoint';

type HandlerPostLogin = (payload: In_postLogin) => Result<Out_postLogin>;
type HandlerSendMessage = (payload: In_sendMessage) => Result<Out_sendMessage>;
type HandlerSignUp = (payload: In_postSignUp) => Result<Out_postSignUp>;

export type HanlderConstraint = HandlerSignUp | HandlerPostLogin | HandlerSendMessage;
export type Endpoint<T> = {
  path: string;
  handler: T;
};
