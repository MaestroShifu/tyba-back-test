import mongoose, { Schema } from 'mongoose';
import { Transaction } from '../../../domain/entities/transaction';

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.String,
      required: true,
      index: true
    },
    coordinates: {
      lat: {
        type: Schema.Types.Number,
        required: true
      },
      lng: {
        type: Schema.Types.Number,
        required: true
      }
    },
    payload: {
      // JSON
      type: Schema.Types.String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const transactionModel = mongoose.model<Transaction>(
  'Transaction',
  transactionSchema
);

export default transactionModel;
