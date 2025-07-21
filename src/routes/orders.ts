import { Router } from "express";
import { createOrder, getMyOrders } from "../controllers/ordersController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const router = Router();

router.post("/", authMiddleware, createOrder);
router.get("/me", authMiddleware, getMyOrders);

export default router;
