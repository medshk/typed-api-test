import 'module-alias/register';

import { client_postLogin } from 'app/shared/auth/postLogin.endpoint';
import { client_sendMessage } from 'app/shared/messaging/sendMessage.endpoint';

import { handleError } from './handleError';
import { client_postSignUp } from 'app/shared/auth/postSignUp.endpoint';

// in a React App, it would look like
// <Button onClick={getAccessToken(form.name.value, form.password.value)}>Se connecter</Button>;
// <Button onClick={sendMessage(form.toPhoneNumber.value, form.content.value)}>Envoyer le message</Button>;
// but for simplicity sake, we can't bundle a full React app in this repo, even if it's less realistic

const USERNAME = 'Fusion';
const USERNAME2 = 'notfusion';
const PASSWORD = '123456';
const EMAIL = 'fusion@gmail.com';

const PHONE_NUMBER = '06112233';
const CONTENT = 'Hello world !';

const run = async () => {
  await getAccessToken(EMAIL, PASSWORD);
  await sendMessage(PHONE_NUMBER, CONTENT);
  await signUp(USERNAME2, PASSWORD, 'EMAIL');
};

//

const getAccessToken = async (username: string, password: string) => {
  try {
    const data = await client_postLogin.fire({
      username,
      password,
    });
    if (!data.jwtToken) {
      throw Error(data.response.data);
    }
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
    if (!data.toPhoneNumber) {
      throw Error(data.response.data);
    }
    console.log('Message sent ! Message:', data);
  } catch (error) {
    handleError(error);
  }
};

//

const signUp = async (username: string, password: string, email: string) => {
  try {
    const data = await client_postSignUp.fire({
      username,
      password,
      email,
    });
    if (!data.jwtToken) {
      throw Error(data.response.data);
    }
    console.log('Successful sign up ! Token::', data.jwtToken);
  } catch (error) {
    handleError(error);
  }
};

run().then(() => process.exit(0));
