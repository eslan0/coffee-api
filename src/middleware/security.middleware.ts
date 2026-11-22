import ratelimit from "koa-ratelimit";

const db = new Map();

// middleware for rate limit
const limitMiddleware = () =>
  ratelimit({
    driver: "memory",
    db: db,
    duration: 60000, // 1 minute
    max: 100, // limit of 100 requests
    id: (ctx) => ctx.ip,
  });

export default limitMiddleware;
