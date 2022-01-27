import loginAuth from '../../../src/domain/interactors/auth/generate-token';
import { User } from '../../../src/domain/entities/user';
import { AuthContract } from '../../../src/domain/contracts/auth-contracts';

const authContractMock: AuthContract = {
  passwordEncrypt: jest.fn(),
  passwordValidate: jest.fn(),
  tokenGenerate: jest.fn(),
  tokenVerify: jest.fn()
};

describe('Login auth', () => {
  it('Authentication token created successfully', (done) => {
    const userMock: User = {
      _id: 'QAZWSX',
      email: 'sdanielsarsantos@gmail.com',
      name: 'daniel',
      lastName: 'sarmiento',
      password: 'ASDFxce$'
    };
    const token = 'ujmiklop';
    const tokenGenerate = jest.fn((args) => {
      const { sub, iss } = args;
      expect(sub).toEqual(userMock._id);
      expect(iss).toEqual(`${userMock.name} ${userMock.lastName}`);
      return token;
    });
    const execute = loginAuth({
      ...authContractMock,
      tokenGenerate
    });
    execute(userMock).then((res) => {
      expect(res._id).toEqual(userMock._id);
      expect(res.email).toEqual(userMock.email);
      expect(res.token).toEqual(token);
      expect('password' in res).toEqual(false);
      done();
    });
  });
});
