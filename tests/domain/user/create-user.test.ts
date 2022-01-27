import createUser from '../../../src/domain/interactors/user/create-user';
import authContractMock from '../__mocks__/auth-contract-mock';
import errorContractMock from '../__mocks__/error-contract-mock';
import userContractMock from '../__mocks__/user-contract-mock';
import { User } from '../../../src/domain/entities/user';

describe('Create User', () => {
  it('Password was not sent', (done) => {
    const execute = createUser(
      userContractMock,
      authContractMock,
      errorContractMock
    );
    execute({}).catch((error) => {
      expect(error.message).toEqual('The password is invalid');
      done();
    });
  });

  it('Email was not sent', (done) => {
    const execute = createUser(
      userContractMock,
      authContractMock,
      errorContractMock
    );
    execute({ password: 'maestroShifu' }).catch((err) => {
      expect(err.message).toEqual('The email is invalid');
      done();
    });
  });

  it('The email entered is not valid', (done) => {
    const execute = createUser(
      userContractMock,
      authContractMock,
      errorContractMock
    );
    execute({
      password: 'maestroShifu',
      email: 'sdanielsarsantos'
    }).catch((err) => {
      expect(err.message).toEqual('The email is invalid');
      done();
    });
  });

  it('Name was not sent', (done) => {
    const execute = createUser(
      userContractMock,
      authContractMock,
      errorContractMock
    );
    execute({
      password: 'MaestroShifu',
      email: 'sdanielsarsantos@gmail.com',
      name: ''
    }).catch((err) => {
      expect(err.message).toEqual('The name is invalid');
      done();
    });
  });

  it('The name entered is not valid', (done) => {
    const execute = createUser(
      userContractMock,
      authContractMock,
      errorContractMock
    );
    execute({
      password: 'MaestroShifu',
      email: 'sdanielsarsantos@gmail.com',
      name: 'daniel19'
    }).catch((err) => {
      expect(err.message).toEqual('The name is invalid');
      done();
    });
  });

  it('LastName was not sent', (done) => {
    const execute = createUser(
      userContractMock,
      authContractMock,
      errorContractMock
    );
    execute({
      password: 'MaestroShifu',
      email: 'sdanielsarsantos@gmail.com',
      name: 'daniel',
      lastName: ''
    }).catch((err) => {
      expect(err.message).toEqual('The lastName is invalid');
      done();
    });
  });

  it('The LastName entered is not valid', (done) => {
    const execute = createUser(
      userContractMock,
      authContractMock,
      errorContractMock
    );
    execute({
      password: 'MaestroShifu',
      email: 'sdanielsarsantos@gmail.com',
      name: 'daniel',
      lastName: 'santos19'
    }).catch((err) => {
      expect(err.message).toEqual('The lastName is invalid');
      done();
    });
  });

  it('The email is already registered', (done) => {
    const userMock = {
      password: 'MaestroShifu',
      email: 'sdanielsarsantos@gmail.com',
      name: 'daniel',
      lastName: 'santos'
    };
    const findByEmail = jest.fn((email: string) => {
      expect(email).toEqual(userMock.email);
      const user: User = {
        ...userMock,
        _id: ''
      };
      return Promise.resolve(user);
    });
    const execute = createUser(
      {
        ...userContractMock,
        findByEmail
      },
      authContractMock,
      errorContractMock
    );
    execute(userMock).catch((err) => {
      expect(err.message).toEqual('The email is already registered');
      done();
    });
  });

  it('New user created successfully', (done) => {
    const userMock = {
      password: 'MaestroShifu',
      email: 'sdanielsarsantos@gmail.com',
      name: 'daniel',
      lastName: 'santos'
    };
    const passwordEncryptMock = 'qazwsxedcrfv';
    const findByEmail = jest.fn((email: string) => {
      expect(email).toEqual(userMock.email);
      return Promise.resolve(undefined);
    });
    const passwordEncrypt = jest.fn((password) => {
      expect(password).toEqual(userMock.password);
      return passwordEncryptMock;
    });
    const create = jest.fn((args: Omit<User, '_id' | 'language'>) => {
      expect(args.email).toEqual(userMock.email);
      expect(args.password).toEqual(passwordEncryptMock);
      const user: User = {
        ...userMock,
        _id: '',
        password: passwordEncryptMock
      };
      return Promise.resolve(user);
    });
    const execute = createUser(
      {
        ...userContractMock,
        findByEmail,
        create
      },
      {
        ...authContractMock,
        passwordEncrypt
      },
      errorContractMock
    );
    execute(userMock).then((res) => {
      expect(res.email).toEqual(userMock.email);
      expect(res.password).toEqual(passwordEncryptMock);
      done();
    });
  });
});
