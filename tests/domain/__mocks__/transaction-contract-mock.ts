import { TransactionContract } from '../../../src/domain/contracts/transaction-contracts';

const transactionContractMock: TransactionContract = {
  create: jest.fn(),
  findByUserId: jest.fn()
};

export default transactionContractMock;
