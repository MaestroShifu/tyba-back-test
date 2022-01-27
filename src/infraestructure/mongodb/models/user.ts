import mongoose, { Schema } from 'mongoose';
import { User } from '../../../domain/entities/user';

const userSchema = new Schema(
  {
    password: {
      type: Schema.Types.String,
      required: true
    },
    email: {
      type: Schema.Types.String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    name: {
      type: Schema.Types.String,
      required: true,
      lowercase: true
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
      lowercase: true
    },
    phone: {
      type: Schema.Types.String
    },
    language: {
      type: Schema.Types.String,
      enum: ['es', 'en'],
      default: 'es'
    }
  },
  {
    timestamps: true
  }
);

const userModel = mongoose.model<User>('User', userSchema);

export default userModel;
