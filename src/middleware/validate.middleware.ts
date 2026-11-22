import { createMiddleware } from "hono/factory";
import type { MiddlewareHandler } from "hono";
import Joi from "joi";

export const validatorMiddleware = (schema: Joi.ObjectSchema): MiddlewareHandler => {
  return createMiddleware(async (c, next) => {
    const body = await c.req.json();

    const { error, value } = schema.validate(body, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      return c.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.details.map((detail) => detail.message),
        },
        422
      );
    }

    c.set("validatedBody", value);

    await next();
  });
};
