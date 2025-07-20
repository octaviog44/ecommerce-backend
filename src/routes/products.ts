import { Router } from "express";
import { searchProducts, getProduct } from "../controllers/productsController.ts";

const router = Router();

router.get("/search", searchProducts);
router.get("/:id", getProduct);

export default router;
