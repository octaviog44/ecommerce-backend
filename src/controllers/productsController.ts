import { Request, Response } from "express";
import { products } from "../db/data.ts";

export const searchProducts = (req: Request, res: Response) => {
    const { q = "", offset = 0, limit = 10 } = req.query;
    // Filtrar productos por nombre que contenga la query (insensible a mayúsculas)
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes((q as string).toLowerCase())
    );
    // Paginación
    const paginated = filtered.slice(Number(offset), Number(offset) + Number(limit));
    res.json({
        total: filtered.length,
        results: paginated
    });
};

export const getProduct = (req: Request, res: Response) => {
    // ... buscar producto por id y devolverlo
};
