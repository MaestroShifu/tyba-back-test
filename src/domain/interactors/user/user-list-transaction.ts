import { TransactionContract } from '../../contracts/transaction-contracts';
import { Transaction } from '../../entities/transaction';

const userListTransaction =
  (transactionContract: TransactionContract) =>
  async (userId: string): Promise<Transaction[]> => {
    const transactions = await transactionContract.findByUserId(userId);
    return transactions;
  };

export default userListTransaction;
