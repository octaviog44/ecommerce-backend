import { Request, Response } from "express";
import { products } from "../db/data";

export const searchProducts = (req: Request, res: Response) => {
    // ... filtrado con query, offset y limit
};

export const getProduct = (req: Request, res: Response) => {
    // ... buscar producto por id y devolverlo
};
