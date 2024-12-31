import mongoose from 'mongoose';
import { isEmail } from 'validator';

export interface IOrder {
  items: string[],
  total: number,
  payment: string,
  email: string,
  phone: string,
  address: string
}

const orderSchema = new mongoose.Schema<IOrder>({
  items: [{
    type: String,
    required: [true, 'Field "items" is required'],
  }],
  total: {
    type: Number,
    required: [true, 'Field "total" is required'],
  },
  payment: {
    type: String,
    enum: ['card', 'online'],
    required: [true, 'Field "payment" is required'],
  },
  email: {
    type: String,
    validate: isEmail,
    required: [true, 'Field "email" is required'],
  },
  phone: {
    type: String,
    required: [true, 'Field "phone" is required'],
  },
  address: {
    type: String,
    required: [true, 'Field "address" is required'],
  },
});

export default mongoose.model<IOrder>('order', orderSchema);
