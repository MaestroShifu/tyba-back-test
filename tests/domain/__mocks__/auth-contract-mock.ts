import { AuthContract } from '../../../src/domain/contracts/auth-contracts';

const authContractMock: AuthContract = {
  passwordEncrypt: jest.fn(),
  passwordValidate: jest.fn(),
  tokenGenerate: jest.fn(),
  tokenVerify: jest.fn()
};

export default authContractMock;
