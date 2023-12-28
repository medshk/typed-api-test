import { In_postLogin, Out_postLogin } from 'app/shared/auth/postLogin.endpoint';
import { Result } from 'requests-utils/result.types';

export const handler_postLogin = async (payload: In_postLogin): Result<Out_postLogin> => {
  const { email, password } = payload;

  if (email !== 'fusion@gmail.com') {
    return { error: { status: 401, message: "Cet utilisateur n'existe pas" } };
  }

  if (password !== '123456') {
    return { error: { status: 401, message: 'Mot de passe incorrect' } };
  }

  return { data: { jwtToken: '123_secretJWTAccessToken_ABC' } };
};
