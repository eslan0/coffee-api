import { Hono } from "hono";
import { verifyToken } from "@/middleware/auth.middleware";
import { isAdmin } from "@/middleware/role.middleware";
import { categoryController } from "@/modules/catalog";

const categoryRoutes = new Hono();

categoryRoutes.get("/categories", categoryController.index);
categoryRoutes.post("/categories", verifyToken, isAdmin, categoryController.create);
categoryRoutes.put("/categories/:id", verifyToken, isAdmin, categoryController.update);
categoryRoutes.delete("/categories/:id", verifyToken, isAdmin, categoryController.delete);

export { categoryRoutes };
