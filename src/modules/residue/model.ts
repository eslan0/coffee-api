import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "@/interfaces/category.interface";

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CategorySchema.index({ slug: 1 }, { unique: true });

const Category: Model<ICategory> = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
