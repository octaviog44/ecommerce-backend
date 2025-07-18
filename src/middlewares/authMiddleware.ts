
import { Request, Response, NextFunction } from "express";
import { users } from "../db/data";

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Token requerido" });

    const token = authHeader.replace("Bearer ", "");
    const user = users.find(u => u.token === token);
    if (!user) return res.status(401).json({ error: "Token inválido" });

    req.user = user;
    next();
};
