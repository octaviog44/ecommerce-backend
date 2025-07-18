import { Router } from "express";
import { requestLoginCode, validateCode } from "../controllers/authController";

const router = Router();

router.post("/", requestLoginCode);
router.post("/token", validateCode);

export default router;
