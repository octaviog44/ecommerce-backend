import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getProfile, updateProfile, updateAddress } from "../controllers/userController";

const router = Router();

router.use(authMiddleware);

router.get("/me", getProfile);
router.patch("/me", updateProfile);
router.patch("/me/address", updateAddress);

export default router;
