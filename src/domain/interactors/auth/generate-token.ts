import { AuthContract } from '../../contracts/auth-contracts';
import { User } from '../../entities/user';

export type GenerateToken = Omit<User, 'password'> & {
  password?: string;
  token: string;
};

const generateToken =
  (authContract: AuthContract) =>
  async (user: User): Promise<GenerateToken> => {
    // Crear token
    const token = authContract.tokenGenerate({
      sub: user._id,
      iss: `${user.name} ${user.lastName}`,
      iat: new Date().getTime()
    });
    // Agregar el token
    const newUser: GenerateToken = {
      ...user,
      token
    };
    // Eliminamos el campo password
    delete newUser.password;
    // Retornarlo
    return newUser;
  };

export default generateToken;
