import { Request, Response } from "express";
import mercadopago from "mercadopago";

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN as string,
});

export const crearPreferencia = async (req: Request, res: Response) => {
    try {
        const { description, price, quantity } = req.body;

        const preference = {
            items: [
                {
                    title: description,
                    unit_price: Number(price),
                    quantity: Number(quantity),
                },
            ],
            back_urls: {
                success: "https://tusitio.com/success",
                failure: "https://tusitio.com/failure",
                pending: "https://tusitio.com/pending",
            },
            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preference);
        res.json({ id: response.body.id, init_point: response.body.init_point });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
};

export const mercadopagoIPN = (req: Request, res: Response) => {
    // ... validar pago, actualizar orden, enviar email, notificar internos
};
