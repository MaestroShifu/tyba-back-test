import findUserById from '../../../src/domain/interactors/user/find-user-by-id';
import errorContractMock from '../__mocks__/error-contract-mock';
import userContractMock from '../__mocks__/user-contract-mock';
import { User } from '../../../src/domain/entities/user';

describe('Find user by id', () => {
  it('User does not exist', (done) => {
    const _idMock = 'qazwsxedc';
    const execute = findUserById(
      {
        ...userContractMock,
        findById: jest.fn((id: string) => {
          expect(id).toEqual(_idMock);
          return Promise.resolve(undefined);
        })
      },
      errorContractMock
    );
    execute(_idMock).catch((err) => {
      expect(err.message).toEqual('User does not exist');
      done();
    });
  });

  it('Found a user by id', (done) => {
    const userMock = {
      password: 'MaestroShifu',
      email: 'sdanielsarsantos@gmail.com',
      name: 'daniel',
      lastName: 'santos',
      _id: 'qazwsxedc'
    };
    const execute = findUserById(
      {
        ...userContractMock,
        findById: jest.fn((id: string) => {
          expect(id).toEqual(userMock._id);
          const user: User = {
            ...userMock
          };
          return Promise.resolve(user);
        })
      },
      errorContractMock
    );
    execute(userMock._id).then((res) => {
      expect(res.email).toEqual(userMock.email);
      expect(res._id).toEqual(userMock._id);
      done();
    });
  });
});
