import mongoose from 'mongoose';

export interface IImage {
  fileName: string,
  originalName: string
}

export interface IProduct {
    title: string,
    image: IImage,
    category: string,
    description: string,
    price: null
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: {
    type: String,
    required: [true, 'Field "fileName" in image is required'],
  },
  originalName: {
    type: String,
    required: [true, 'Field "originalName" in image is required'],
  },
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Field "title" is required'],
    minlength: [2, 'Minimal length of the field "title" is 2'],
    maxlength: [30, 'Maximal length of the field "title" is 30'],
    unique: [true, 'Product\'s title must be unique'],
  },
  image: {
    type: imageSchema,
    required: [true, 'Field "image" is required'],
  },
  category: {
    type: String,
    required: [true, 'Field "category" is required'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
