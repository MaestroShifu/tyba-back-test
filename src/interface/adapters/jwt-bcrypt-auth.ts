import {
  passwordEncrypt,
  passwordValidate
} from '../../infraestructure/auth/bcrypt';
import { tokenGenerate, tokenVerify } from '../../infraestructure/auth/jwt';
import { AuthContract } from '../../domain/contracts/auth-contracts';
import { PayloadToken } from '../../domain/entities/user';

class JwtBcryptAuth implements AuthContract {
  passwordEncrypt(password: string) {
    return passwordEncrypt(password);
  }
  passwordValidate(password: string, hash: string) {
    return passwordValidate(password, hash);
  }

  tokenGenerate(payload: PayloadToken) {
    return tokenGenerate(payload);
  }
  tokenVerify(hash: string) {
    return tokenVerify<PayloadToken>(hash);
  }
}

export default JwtBcryptAuth;
