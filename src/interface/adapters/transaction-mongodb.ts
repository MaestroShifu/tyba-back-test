import { Transaction } from '../../domain/entities/transaction';
import { TransactionContract } from '../../domain/contracts/transaction-contracts';
import transactionModel from '../../infraestructure/mongodb/models/transaction';

class TransactionMongoDB implements TransactionContract {
  async create(transactions: Omit<Transaction, '_id'>): Promise<Transaction> {
    const transactionUser = new transactionModel({
      ...transactions,
      payload: JSON.stringify(transactions.payload)
    });
    await transactionUser.save();
    return {
      ...transactionUser.toObject(),
      _id: transactionUser._id.toString()
    };
  }
  async findByUserId(userId: string): Promise<Transaction[]> {
    const transactions = await transactionModel.find({
      userId: {
        $in: userId
      }
    });
    return transactions.map((tr) => tr.toObject());
  }
}

export default TransactionMongoDB;
