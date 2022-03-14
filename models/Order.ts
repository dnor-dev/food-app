import mongoose, { Model, Schema } from 'mongoose';
import { Iorder } from '../src/utils/interface';

export enum statusType {
  paid = 'paid',
  preparing = 'preparing',
  onTheWay = 'onTheWay',
  delivered = 'delivered',
}

const OrderSchema: Schema<Iorder> = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: statusType,
      default: statusType.paid,
    },
    method: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Orders: Model<Iorder> =
  mongoose.models.Orders || mongoose.model('Orders', OrderSchema);

export default Orders;
