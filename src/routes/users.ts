import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const router = Router();

router.get("/me", authMiddleware, (req, res) => {
    // @ts-ignore
    res.json(req.user);
});

router.patch("/me", authMiddleware, (req, res) => {
    // @ts-ignore
    const user = req.user;
    const updates = req.body;
    // No permitir cambiar id ni email
    delete updates.id;
    delete updates.email;
    Object.assign(user, updates);
    res.json({ message: "Usuario actualizado", user });
});

router.patch("/me/address", authMiddleware, (req, res) => {
    // @ts-ignore
    const user = req.user;
    user.address = req.body;
    res.json({ message: "Dirección actualizada", address: user.address });
});

export default router;
