import { Context } from "hono";
import { categoryService } from "@/modules/category";

export class categoryController {
  static async index(c: Context) {
    const category = await categoryService.findAll();

    return c.json(category, 200);
  }

  static async create(c: Context) {
    const body = await c.req.json();

    const category = await categoryService.create(body);

    return c.json(category, 201);
  }

  static async update(c: Context) {
    const id = c.req.param("id");
    const body = await c.req.json();

    const category = await categoryService.update(id as string, body);

    return c.json(category, 200);
  }

  static async delete(c: Context) {
    const id = c.req.param("id");

    await categoryService.delete(id as string);

    return c.body(null, 204);
  }
}
