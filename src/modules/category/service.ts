import Category from "@/modules/category";

export class categoryService {
  static async findAll() {
    return await Category.findAll();
  }

  static async create(category: ICategory) {
    return await Category.create(category);
  }

  static async update(id: string, category: ICategory) {
    return await Category.findOneAndUpdate({ _id: id }, category, { new: true });
  }

  static async delete(id: string) {
    return await Category.findOneAndDelete({ _id: id });
  }
}
