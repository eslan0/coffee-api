import Product from "@/features/products/model";

class ProductService {
  // search all products
  async getAll() {
    const products = await Product.find();
    return products;
  }

  // search for featured products
  async getFeatured() {
    const products = await Product.find({ featured: true });
    return products;
  }

  // search for a product by id
  async getById(id: string) {
    const product = await Product.findById(id);
    return product;
  }

  // create a new product
  async createProduct(data: any) {
    // here, extra validations would be included, e.g., checking if the SKU already exists
    const product = await Product.create(data);
    return product;
  }

  // update an existing product
  async updateProduct(id: string, data: any) {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    return product;
  }

  // deletes an existing product
  async deleteProduct(id: string) {
    const product = await Product.findByIdAndDelete(id);
    return product;
  }

  // update only the stock of a product
  async updateStock(id: string, data: any) {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    return product;
  }
}

export default new ProductService();
