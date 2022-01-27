import { User } from '../entities/user';

export interface UserContract {
  findById(id: string): Promise<User | undefined>;
  create(user: Omit<User, '_id'>): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
