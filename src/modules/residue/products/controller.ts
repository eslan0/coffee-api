import { Context } from "koa";
import productService from "@/features/products/service";

class ProductController {
  // get /products - list all products
  async getProducts(ctx: Context) {
    try {
      ctx.body = await productService.getAll();
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error when searching for products" };
    }
  }

  // get /products/featured - get featured products
  async getFeatured(ctx: Context) {
    try {
      ctx.body = await productService.getFeatured();
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error when searching for featured products" };
    }
  }

  // get /products/:id - search for a specific product by id
  async showProduct(ctx: Context) {
    try {
      const product = await productService.getById(ctx.params.id);
      if (!product) {
        ctx.status = 404;
        ctx.body = { message: "Product not found" };
        return;
      }
      ctx.body = product;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error when searching for product" };
    }
  }

  // post /products - create a new product
  async createProduct(ctx: Context) {
    try {
      ctx.body = await productService.createProduct(ctx.request.body);
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error creating product" };
    }
  }

  // put /products/:id - update an existing product
  async updateProduct(ctx: Context) {
    try {
      const product = await productService.updateProduct(ctx.params.id, ctx.request.body);
      if (!product) {
        ctx.status = 404;
        ctx.body = { message: "Product not found" };
        return;
      }
      ctx.body = product;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error when updating product" };
    }
  }

  // patch /products/:id/stock - update only the stock of a product
  async updateStock(ctx: Context) {
    try {
      const product = await productService.updateStock(ctx.params.id, ctx.request.body);
      if (!product) {
        ctx.status = 404;
        ctx.body = { message: "Product not found" };
        return;
      }
      ctx.body = product;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error updating product stock" };
    }
  }

  // delete /products/:id - delete an existing product
  async deleteProduct(ctx: Context) {
    try {
      const product = await productService.deleteProduct(ctx.params.id);
      if (!product) {
        ctx.status = 404;
        ctx.body = { message: "Product not found" };
        return;
      }
      ctx.body = product;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error deleting product" };
    }
  }
}

export default new ProductController();
