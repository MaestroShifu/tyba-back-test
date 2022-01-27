import userListTransaction from '../../../src/domain/interactors/user/user-list-transaction';
import transactionContractMock from '../__mocks__/transaction-contract-mock';
import { Transaction } from '../../../src/domain/entities/transaction';

describe('User list transaction', () => {
  it('successful transaction query empty', (done) => {
    const _idMock = 'qazwsxedc';
    const execute = userListTransaction({
      ...transactionContractMock,
      findByUserId: jest.fn((id: string) => {
        expect(id).toEqual(_idMock);
        return Promise.resolve([]);
      })
    });
    execute(_idMock).then((res) => {
      expect(res.length).toEqual(0);
      done();
    });
  });

  it('successful transaction query', (done) => {
    const _idMock = 'qazwsxedc';
    const execute = userListTransaction({
      ...transactionContractMock,
      findByUserId: jest.fn((id: string) => {
        expect(id).toEqual(_idMock);
        const transaction: Transaction = {
          _id: 'qaz',
          userId: _idMock,
          coordinates: {
            lat: 0,
            lng: 0
          },
          payload: ''
        };
        return Promise.resolve([transaction]);
      })
    });
    execute(_idMock).then((res) => {
      expect(res.length).toEqual(1);
      expect(res[0].userId).toEqual(_idMock);
      done();
    });
  });
});
