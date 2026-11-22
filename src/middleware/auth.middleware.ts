import { createMiddleware } from "hono/factory";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyToken = createMiddleware(async (c, next) => {
  console.log(`${c.req.method} ${c.req.path}`);

  try {
    const authHeader = ctx.headers.authorization;

    if (!authHeader) {
      ctx.status = 401;
      ctx.body = { message: "Token not provided" };
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
    };

    ctx.state.user = decoded;

    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { message: "Invalid or expired token" };
  }

  await next();
});
