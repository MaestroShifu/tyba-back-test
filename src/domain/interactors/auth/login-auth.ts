import { User } from '../../entities/user';
import { UserContract } from '../../contracts/user-contracts';
import { AuthContract } from '../../contracts/auth-contracts';
import { ErrorContract } from '../../contracts/error-contracts';
import createUser, { CreateUser } from '../../interactors/user/create-user';
import findUserByEmail from '../../interactors/user/find-user-by-email';
import { validEmail } from '../utils/validators';
import generateToken, {
  GenerateToken
} from '../../interactors/auth/generate-token';

const loginAuth =
  (
    userContract: UserContract,
    authContract: AuthContract,
    errorContract: ErrorContract
  ) =>
  async (
    user: Partial<CreateUser>,
    isRegistering: boolean
  ): Promise<GenerateToken> => {
    let userCreatedOrFound: User;
    const useCaseGenerateToken = generateToken(authContract);

    if (isRegistering) {
      const useCaseCreateUser = createUser(
        userContract,
        authContract,
        errorContract
      );
      userCreatedOrFound = await useCaseCreateUser(user);
    } else {
      const { email, password } = user;

      const useCaseFindUserByEmail = findUserByEmail(
        userContract,
        errorContract
      );

      if (!password)
        throw errorContract.errorBadRequest('The password is invalid');
      if (!(email && validEmail(email)))
        throw errorContract.errorBadRequest('The email is invalid');

      userCreatedOrFound = await useCaseFindUserByEmail(email);

      if (!authContract.passwordValidate(password, userCreatedOrFound.password))
        throw errorContract.errorUnauthorized('The password is invalid');
    }

    const loginAutenticated = await useCaseGenerateToken(userCreatedOrFound);
    return loginAutenticated;
  };

export default loginAuth;
