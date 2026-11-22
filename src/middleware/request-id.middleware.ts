import { createMiddleware } from "hono/factory";

export const requestIdMiddleware = createMiddleware(async (c, next) => {});
