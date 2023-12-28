import 'module-alias/register';

import { client_postLogin } from 'app/shared/auth/postLogin.endpoint';
import { client_sendMessage } from 'app/shared/messaging/sendMessage.endpoint';

import { handleError } from './handleError';

// in a React App, it would look like
// <Button onClick={getAccessToken(form.name.value, form.password.value)}>Se connecter</Button>;
// <Button onClick={sendMessage(form.toPhoneNumber.value, form.content.value)}>Envoyer le message</Button>;
// but for simplicity sake, we can't bundle a full React app in this repo, even if it's less realistic

const USERNAME = 'Fusion';
const PASSWORD = '123456';

const PHONE_NUMBER = '0611223344';
const CONTENT = 'Hello world !';

const run = async () => {
  await getAccessToken(USERNAME, PASSWORD);
  await sendMessage(PHONE_NUMBER, CONTENT);
};

//

const getAccessToken = async (username: string, password: string) => {
  try {
    const data = await client_postLogin.fire({
      username,
      password,
    });
    console.log('Successful login ! Token:', data.jwtToken);
  } catch (error) {
    handleError(error);
  }
};

const sendMessage = async (toPhoneNumber: string, content: string) => {
  try {
    const data = await client_sendMessage.fire({
      toPhoneNumber,
      content,
    });
    console.log('Message sent ! Message:', data);
  } catch (error) {
    handleError(error);
  }
};

//

run().then(() => process.exit(0));
