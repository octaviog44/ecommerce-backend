import { Router } from "express";
import { crearPreferencia } from "../controllers/mercadopagoController.ts";

const router = Router();

router.post("/crear-preferencia", crearPreferencia);

export default router;