import { Router } from "express";
import { requestLoginCode, validateCode } from "../controllers/authController.ts";

const router = Router();

router.post("/", requestLoginCode);
router.post("/token", validateCode);

export default router;
