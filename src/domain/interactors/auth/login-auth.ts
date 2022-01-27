import { UserContract } from '../../contracts/user-contracts';
import { AuthContract } from '../../contracts/auth-contracts';
import { ErrorContract } from '../../contracts/error-contracts';
import createUser, { CreateUser } from '../../interactors/user/create-user';
import generateToken, {
  GenerateToken
} from '../../interactors/auth/generate-token';

const loginAuth =
  (
    userContract: UserContract,
    authContract: AuthContract,
    errorContract: ErrorContract
  ) =>
  async (user: Partial<CreateUser>): Promise<GenerateToken> => {
    const useCaseCreateUser = createUser(
      userContract,
      authContract,
      errorContract
    );
    const useCaseGenerateToken = generateToken(authContract);

    const userCreated = await useCaseCreateUser(user);
    const loginAutenticated = await useCaseGenerateToken(userCreated);

    return loginAutenticated;
  };

export default loginAuth;
