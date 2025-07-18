import { Request, Response } from "express";
import { orders } from "../db/data";

export const mercadopagoIPN = (req: Request, res: Response) => {
    // ... validar pago, actualizar orden, enviar email, notificar internos
};
