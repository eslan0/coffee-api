import { Hono } from "hono";

//import { env } from "@/config/env";

//import { errorMiddleware } from "@/middleware/error.middleware";
//import { requestIdMiddleware } from "@/middleware/request-id.middleware";

//import { catalogRoutes } from "@/modules/catalog";
//import { userRoutes } from "@/modules/users";
//import { authRoutes } from "@/modules/auth";
import catalogRoutes from "@/routes/catalog.routes";

const app = new Hono();

//app.use("*", requestIdMiddleware);
//app.use("*", errorMiddleware);

app.route("/products", catalogRoutes);
//app.route("/api/v1.0.5/catalog", catalogRoutes);
//app.route("/api/v1/users", userRoutes);
//app.route("/api/v1/auth", authRoutes);

export default app;
