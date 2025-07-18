
import { Request, Response } from "express";
import { users } from "../db/data";
import { nanoid } from "nanoid";
import { sendEmail } from "../services/emailService";

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
