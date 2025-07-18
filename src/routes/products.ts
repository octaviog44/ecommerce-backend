import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json([
        { id: 1, name: "Producto 1", price: 100 },
        { id: 2, name: "Producto 2", price: 200 }
    ]);
});

export default router;
