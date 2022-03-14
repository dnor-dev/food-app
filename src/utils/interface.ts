import { Document } from 'mongoose';

export interface Iproduct extends Document {
  title: string;
  desc: string;
  img: string;
  prices: number[];
  extraOptions: {
    text: string;
    price: number;
  }[];
}

export interface Iorder extends Document {
  customer: string;
  address: string;
  total: number;
  status: string;
  method: number;
}
