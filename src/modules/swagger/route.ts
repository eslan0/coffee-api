import { Hono } from "hono";
import swaggerMiddleware from "@/middleware/swagger.middleware";

const swaggerRouter = new Hono();

swaggerRouter.get("/docs", swaggerMiddleware());

export { swaggerRouter };
