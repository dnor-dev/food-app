import mongoose, { Model, Schema } from 'mongoose';
import { Iproduct } from '../src/utils/interface';

const ProductSchema: Schema<Iproduct> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 60,
    },
    img: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true },
);

const Products: Model<Iproduct> =
  mongoose.models.Products || mongoose.model('Products', ProductSchema);

export default Products;
