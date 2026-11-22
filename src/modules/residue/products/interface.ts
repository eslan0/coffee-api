import { Types } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  price: number;
  stock: number;
  images: {
    url: string;
    cloudinary_id?: string;
  }[];
  category: Types.ObjectId;
  section: Types.ObjectId;
  featured: boolean;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
