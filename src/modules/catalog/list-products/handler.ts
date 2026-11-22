import type { Context } from "hono";

import { CatalogRepository } from "@/modules/catalog/common/catalog.repository";
import { listProductsSchema } from "@/modules/catalog/list-products/schema";

const repository = new CatalogRepository();

export async function listProductsHandler(c: Context) {
  const query = listProductsSchema.safeParse(c.req.query());

  if (!query.success) {
    return c.json(
      {
        message: "Invalid query parameters",
        errors: query.error.flatten(),
      },
      400
    );
  }

  const products = await repository.findAll();

  return c.json(
    {
      data: products,
      pagination: {
        page: query.data.page,
        limit: query.data.limit,
      },
    },
    200
  );
}
