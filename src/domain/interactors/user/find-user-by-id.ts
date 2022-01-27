import { UserContract } from '../../contracts/user-contracts';
import { ErrorContract } from '../../contracts/error-contracts';
import { User } from '../../entities/user';

const findUserById =
  (userContract: UserContract, errorContract: ErrorContract) =>
  async (id: string): Promise<User> => {
    const user = await userContract.findById(id);
    if (!user) throw errorContract.errorNotFound('User does not exist');
    return user;
  };

export default findUserById;
