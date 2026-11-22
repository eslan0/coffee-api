import mongoose, { Schema, Model } from "mongoose";
import { IProduct } from "@/interfaces/product.interface";

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    images: [
      {
        url: { type: String, required: true },
        cloudinary_id: { type: String },
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProductSchema.post("save", function () {
  if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
    console.log("Middleware called after saving the product is (product is been Save )", this);
  }
});

const Product: Model<IProduct> = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
