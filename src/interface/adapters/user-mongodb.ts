import { User } from '../../domain/entities/user';
import { UserContract } from '../../domain/contracts/user-contracts';
import UserModel from '../../infraestructure/mongodb/models/user';

class UserMongoDB implements UserContract {
  async findById(id: string) {
    const user = await UserModel.findById(id);
    return user?.toObject() || undefined;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ email });
    return user?.toObject() || undefined;
  }
  async create(user: Omit<User, '_id'>): Promise<User> {
    const newUser = new UserModel({
      ...user
    });
    await newUser.save();
    return {
      ...newUser.toObject(),
      _id: newUser._id.toString()
    };
  }
}

export default UserMongoDB;
