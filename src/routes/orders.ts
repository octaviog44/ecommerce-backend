import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createOrder, getMyOrders, getOrderById } from "../controllers/ordersController";

const router = Router();

router.use(authMiddleware);

router.post("/", createOrder);
router.get("/me", getMyOrders);
router.get("/:orderId", getOrderById);

export default router;
