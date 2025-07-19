import { Router } from "express";
import { crearPreferencia } from "../controllers/mercadopagoController";

const router = Router();

router.post("/crear-preferencia", crearPreferencia);

export default router;