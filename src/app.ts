import { Hono } from "hono";

/*import { env } from "@/config/env";
import { errorMiddleware } from "@/middleware/error.middleware";
import { requestIdMiddleware } from "@/middleware/request-id.middleware";
*/
import { coffeeRoutes } from "@/modules/coffee";
import { categoryRoutes } from "@/modules/category"; /*
import { userRoutes } from "@/modules/users";
import { authRoutes } from "@/modules/auth";*/

const app = new Hono();

/*
app.use("*", requestIdMiddleware);

app.use("*", errorMiddleware);*/

app.route("/api/v1.0.5/coffee", coffeeRoutes);
app.route("/api/v1.0.5/category", categoryRoutes); /*
app.route("/api/v1/users", userRoutes);
app.route("/api/v1/auth", authRoutes);*/

export default app;
