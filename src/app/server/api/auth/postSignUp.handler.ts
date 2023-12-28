import { In_postSignUp, Out_postSignUp } from 'app/shared/auth/postSignUp.endpoint';
import { Result } from 'requests-utils/result.types';

export const handler_postSignUp = async (payload: In_postSignUp): Result<Out_postSignUp> => {
  const { username, password, email } = payload;

  //   regEx for email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (username === 'Fusion') {
    return { error: { status: 401, message: 'Cet utilisateur existe déja.' } };
  }

  if (!emailRegex.test(email as string)) {
    return { error: { status: 401, message: 'Email est invalid.' } };
  }

  if (password.length < 5) {
    return {
      error: { status: 401, message: 'Le mot de passe doit comporter au moins 6 caractères.' },
    };
  }

  return { data: { jwtToken: '123_new_secretJWTAccessToken_ABC' } };
};
