import jwt, { SignOptions } from 'jsonwebtoken';
import env from '../config/config';

const jwtOptions: SignOptions = {
  expiresIn: '20m' // '2 days' '1d' '10h' '2.5 hrs' '2h' '1m' '5s' '1y' '100' '-3 days' '-1h' '-200'
};

const tokenGenerate = (payload: object) => {
  return jwt.sign(
    payload,
    env.SECRET_KEY,
    env.ENV_NODE === 'dev' ? undefined : jwtOptions
  );
};

const tokenVerify = <T = unknown>(hash: string) => {
  return jwt.verify(hash, env.SECRET_KEY) as T;
};

export { tokenGenerate, tokenVerify };
