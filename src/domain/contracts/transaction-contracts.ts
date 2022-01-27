import { Transaction } from '../entities/transaction';

export interface TransactionContract {
  create(transaction: Omit<Transaction, '_id'>): Promise<Transaction>;
  findByUserId(userId: string): Promise<Transaction[]>;
}
