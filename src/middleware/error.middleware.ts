import { Context } from "koa";
import createHttpError, { HttpError } from "http-errors";
import { env } from "@/config/env";

// middleware for global error
export const errorMiddleware = () => {
  const defaultMessage = "Internal Server Error";
  const defaultStatus = 500;

  return async (ctx: Context, next: () => Promise<void>) => {
    try {
      await next();

      if (ctx.status === 404) {
        throw createHttpError(404, "Resource Not Found");
      }
    } catch (error: HttpError | any) {
      const isProduction = env.NODE_ENV === "production";

      const statusCode = error.status || error.statusCode || defaultStatus;
      ctx.status = statusCode;

      let message = error.message;

      if (isProduction && statusCode >= 500) {
        message = defaultMessage;
      }

      if (statusCode >= 500) {
        console.error(`[SERVER ERROR]:`, error);
      }

      // response to the client
      ctx.body = {
        success: false,
        error: true,
        status: statusCode,
        message: message,
        // stack only in development
        stack: isProduction ? undefined : error.stack,
        data: null,
      };
    }
  };
};
