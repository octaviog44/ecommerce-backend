import { Router } from "express";
import { createOrder, getMyOrders, getOrderById } from "../controllers/ordersController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const router = Router();

router.post("/", authMiddleware, createOrder);
router.get("/me", authMiddleware, getMyOrders);
router.get("/:orderId", authMiddleware, getOrderById);

export default router;
