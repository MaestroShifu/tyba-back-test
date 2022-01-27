import { PayloadToken } from '../entities/user';

export interface AuthContract {
  passwordEncrypt(password: string): string;
  passwordValidate(password: string, hash: string): boolean;
  tokenGenerate(payload: PayloadToken): string;
  tokenVerify(hash: string): PayloadToken;
}
