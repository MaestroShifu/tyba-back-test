import { UserContract } from '../../../src/domain/contracts/user-contracts';

const userContractMock: UserContract = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn()
};

export default userContractMock;
