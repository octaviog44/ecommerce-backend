
import { Request, Response } from "express";
import { users } from "../db/data.ts";
import { nanoid } from "nanoid";
import { sendEmail } from "../services/emailService.ts";
import jwt from "jsonwebtoken";

export const requestLoginCode = (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email requerido" });

    let user = users.find(u => u.email === email);
    if (!user) {
        user = { id: nanoid(), email };
        users.push(user);
    }
    // Generar código simple y asignarlo
    user.code = Math.floor(100000 + Math.random() * 900000).toString();

    // Enviar email con código (implementá sendEmail)
    sendEmail(user.email, `Tu código de acceso es: ${user.code}`);

    res.json({ message: "Código enviado al email" });
};

export const validateCode = (req: Request, res: Response) => {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: "Email y código requeridos" });

    const user = users.find(u => u.email === email);
    if (!user || user.code !== code) {
        return res.status(401).json({ error: "Código o email incorrecto" });
    }

    // Invalida el código
    user.code = undefined;

    // Genera el token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || "secreto", { expiresIn: "2h" });

    res.json({ token });
};
