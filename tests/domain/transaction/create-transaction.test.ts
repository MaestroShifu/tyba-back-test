import createTransaction from '../../../src/domain/interactors/transaction/create-transaction';
import transactionContractMock from '../__mocks__/transaction-contract-mock';
import { Transaction } from '../../../src/domain/entities/transaction';

describe('Create transaction', () => {
  it('successful transaction create', (done) => {
    const transactionMock = {
      userId: 'asx',
      coordinates: {
        lat: 0,
        lng: 0
      },
      payload: ''
    };
    const execute = createTransaction({
      ...transactionContractMock,
      create: jest.fn((args: Omit<Transaction, '_id'>) => {
        expect(args.userId).toEqual(transactionMock.userId);
        const transaction: Transaction = {
          ...transactionMock,
          _id: 'qaz'
        };
        return Promise.resolve(transaction);
      })
    });
    execute(transactionMock).then((res) => {
      expect(res._id).toEqual('qaz');
      expect(res.userId).toEqual(transactionMock.userId);
      done();
    });
  });
});
