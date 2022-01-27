import { TransactionContract } from '../../contracts/transaction-contracts';
import { Transaction } from '../../entities/transaction';

export type CreateTransaction = Omit<Transaction, '_id'>;

const createTransaction =
  (transactionContract: TransactionContract) =>
  async (transaction: CreateTransaction): Promise<Transaction> => {
    const newTransaction = await transactionContract.create(transaction);
    return newTransaction;
  };

export default createTransaction;
