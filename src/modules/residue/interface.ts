import { Types } from "mongoose";

export interface ICategory {
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}
