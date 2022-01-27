import { UserContract } from '../../contracts/user-contracts';
import { AuthContract } from '../../contracts/auth-contracts';
import { ErrorContract } from '../../contracts/error-contracts';
import { validEmail, validOnlyLetters } from '../utils/validators';
import { User } from '../../entities/user';

export type CreateUser = Omit<User, '_id'>;

const createUser =
  (
    userContract: UserContract,
    authContract: AuthContract,
    errorContract: ErrorContract
  ) =>
  async (user: Partial<CreateUser>): Promise<User> => {
    const { email, name, lastName, phone, password } = user;

    if (!password)
      throw errorContract.errorBadRequest('The password is invalid');
    if (!(email && validEmail(email)))
      throw errorContract.errorBadRequest('The email is invalid');
    if (!(name && validOnlyLetters(name)))
      throw errorContract.errorBadRequest('The name is invalid');
    if (!(lastName && validOnlyLetters(lastName)))
      throw errorContract.errorBadRequest('The lastName is invalid');

    const validUser = await userContract.findByEmail(email);
    if (validUser)
      throw errorContract.errorBadRequest('The email is already registered');

    const passwordEncrypt = authContract.passwordEncrypt(password);

    const newUser = await userContract.create({
      email,
      name,
      lastName,
      phone,
      password: passwordEncrypt
    });
    return newUser;
  };

export default createUser;
