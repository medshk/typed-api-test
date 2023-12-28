import { In_sendMessage, Out_sendMessage } from 'app/shared/messaging/sendMessage.endpoint';
import { Status } from 'app/shared/messaging/types';
import { Result } from 'requests-utils/result.types';

export const handler_sendMessage = async (payload: In_sendMessage): Result<Out_sendMessage> => {
  if (!isPhoneValid(payload.toPhoneNumber)) {
    return { error: { status: 400, message: "Le numéro de téléphone n'est pas valide" } };
  }

  const message = { ...payload, sentOn: new Date(), status: Status.QUEUED, id: generateRandomID() };

  return { data: message };
};

const generateRandomID = () => Math.floor(Math.random() * 999999999);

const isPhoneValid = (phoneNumber: string) => phoneNumber.match(/\d{10}/); // expected format: 0611223344
