import { handler_sendMessage } from 'app/server/api/messaging/sendMessage.handler';
import { makeClientForEndpoint } from 'requests-utils/client';

import { Message } from './types';

export const path_sendMessage = '/api/send-message/';

export type In_sendMessage = Pick<Message, 'toPhoneNumber' | 'content'>;
export type Out_sendMessage = Message;

export const endpoint_sendMessage = {
  path: path_sendMessage,
  handler: handler_sendMessage, // maybe you noticed here that there is a circular import. It's required for simplicity sake in this exercice, don't worry too much about it.
};

export const client_sendMessage = makeClientForEndpoint(endpoint_sendMessage);
