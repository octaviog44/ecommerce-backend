import { Router } from "express";
import { searchProducts, getProduct } from "../controllers/productsController";

const router = Router();

router.get("/search", searchProducts);
router.get("/:id", getProduct);

export default router;
