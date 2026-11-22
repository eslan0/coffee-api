import { Hono } from "hono";

import { listProductsHandler } from "@/modules/catalog/list-products/handler";

const catalogRoutes = new Hono();

catalogRoutes.get("/", listProductsHandler);

export default catalogRoutes;
