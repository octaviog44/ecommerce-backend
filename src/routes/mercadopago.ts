import { Router } from "express";
import { crearPreferencia, mercadopagoIPN } from "../controllers/mercadopagoController.ts";

const router = Router();

router.post("/crear-preferencia", crearPreferencia);
router.post("/ipn/mercadopago", mercadopagoIPN);

export default router;