import { In_postLogin, Out_postLogin } from 'app/shared/auth/postLogin.endpoint';
import { Result } from './result.types';
import { In_sendMessage, Out_sendMessage } from 'app/shared/messaging/sendMessage.endpoint';
import { In_postSignUp, Out_postSignUp } from 'app/shared/auth/postSignUp.endpoint';

type HandlerPostLogin = (payload: In_postLogin) => Result<Out_postLogin>;
type HandlerSendMessage = (payload: In_sendMessage) => Result<Out_sendMessage>;
type handlerSignUp = (payload: In_postSignUp) => Result<Out_postSignUp>;
export type Endpoint = {
  path: string;
  handler: HandlerPostLogin | HandlerSendMessage | handlerSignUp;
};
