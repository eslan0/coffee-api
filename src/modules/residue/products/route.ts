import Router from "@koa/router";
import ProductController from "@/features/products/controller";
import { uploadPhotos } from "@/middleware/upload.middleware";
import { verifyToken } from "@/middleware/auth.middleware";
import { isAdmin } from "@/middleware/role.middleware";

const router = new Router();

router.get("/products", ProductController.getProducts);
router.get("/products/featured", ProductController.getFeatured);
router.get("/products/:id", ProductController.showProduct);
router.get("/products/search?q=:query", ProductController.searchProducts);
router.post("/products", verifyToken, isAdmin, uploadPhotos, ProductController.createProduct);
router.put("/products/:id", verifyToken, isAdmin, ProductController.updateProduct);
router.patch("/products/:id/stock", verifyToken, isAdmin, ProductController.updateStock);
router.delete("/products/:id", verifyToken, isAdmin, ProductController.deleteProduct);

export default router;
