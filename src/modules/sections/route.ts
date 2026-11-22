import Router from "@koa/router";
import SectionController from "@/features/sections/controller";
import { verifyToken } from "@/middleware/auth.middleware";
import { isAdmin } from "@/middleware/role.middleware";

const router = new Router();

router.get("/sections", SectionController.index);
router.post("/sections", verifyToken, isAdmin, SectionController.create);
router.put("/sections/:id", verifyToken, isAdmin, SectionController.update);
router.delete("/sections/:id", verifyToken, isAdmin, SectionController.delete);

export default router;

/*
app.get('/', (c) => {
  return c.text('Hello Hono!')
})*/
