import findUserByEmail from '../../../src/domain/interactors/user/find-user-by-email';
import errorContractMock from '../__mocks__/error-contract-mock';
import userContractMock from '../__mocks__/user-contract-mock';
import { User } from '../../../src/domain/entities/user';

describe('Find user by email', () => {
  it('User does not exist', (done) => {
    const emailMock = 'sdanielsarsantos@gmail.com';
    const execute = findUserByEmail(
      {
        ...userContractMock,
        findByEmail: jest.fn((email: string) => {
          expect(email).toEqual(emailMock);
          return Promise.resolve(undefined);
        })
      },
      errorContractMock
    );
    execute(emailMock).catch((err) => {
      expect(err.message).toEqual('User does not exist');
      done();
    });
  });

  it('Found a user by email', (done) => {
    const userMock = {
      password: 'MaestroShifu',
      email: 'sdanielsarsantos@gmail.com',
      name: 'daniel',
      lastName: 'santos'
    };
    const execute = findUserByEmail(
      {
        ...userContractMock,
        findByEmail: jest.fn((email: string) => {
          expect(email).toEqual(userMock.email);
          const user: User = {
            ...userMock,
            _id: 'qazwsxedc'
          };
          return Promise.resolve(user);
        })
      },
      errorContractMock
    );
    execute(userMock.email).then((res) => {
      expect(res.email).toEqual(userMock.email);
      expect(res._id).toEqual('qazwsxedc');
      done();
    });
  });
});
