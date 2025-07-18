import { Request, Response } from "express";
import { orders, products } from "../db/data";
import { nanoid } from "nanoid";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createOrder = (req: AuthRequest, res: Response) => {
    // ... validar stock, crear orden, generar URL MercadoPago y devolver url + orderId
};

export const getMyOrders = (req: AuthRequest, res: Response) => {
    // ... filtrar órdenes del usuario logueado y devolverlas
};

export const getOrderById = (req: AuthRequest, res: Response) => {
    // ... buscar orden por id y usuario, devolver detalle
};
