
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { users } from "../db/data.ts";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Token requerido" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secreto");
        const user = users.find(u => u.id === decoded.userId);
        if (!user) return res.status(401).json({ error: "Usuario no encontrado" });
        // @ts-ignore
        req.user = user;
        next();
    } catch (e) {
        return res.status(401).json({ error: "Token inválido" });
    }
}
