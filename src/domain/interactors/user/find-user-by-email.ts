import { UserContract } from '../../contracts/user-contracts';
import { ErrorContract } from '../../contracts/error-contracts';
import { User } from '../../entities/user';

const findUserByEmail =
  (userContract: UserContract, errorContract: ErrorContract) =>
  async (email: string): Promise<User> => {
    const user = await userContract.findByEmail(email);
    if (!user) throw errorContract.errorNotFound('User does not exist');
    return user;
  };

export default findUserByEmail;
