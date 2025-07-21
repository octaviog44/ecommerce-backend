import axios from "axios";
import { orders, users } from "../db/data.ts";
import { sendEmail } from "../services/emailService.ts";

export const crearPreferencia = async (req, res) => {
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

        const response = await axios.post(
            "https://api.mercadopago.com/checkout/preferences",
            preference,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                },
            }
        );

        res.json({ id: response.data.id, init_point: response.data.init_point });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
};

export const mercadopagoIPN = async (req, res) => {
    try {
        const { id, topic } = req.query;
        if (topic !== "payment") return res.status(400).json({ error: "Solo se aceptan notificaciones de pago" });
        // Consultar el pago a la API de Mercado Pago
        const paymentRes = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });
        const payment = paymentRes.data;
        if (!payment || !payment.external_reference) return res.status(400).json({ error: "Pago inválido" });
        // Buscar la orden por external_reference
        const order = orders.find(o => o.id === payment.external_reference);
        if (!order) return res.status(404).json({ error: "Orden no encontrada" });
        // Actualizar estado de la orden
        if (payment.status === "approved") {
            order.status = "paid";
            // Notificar al usuario
            const user = users.find(u => u.id === order.userId);
            if (user) {
                sendEmail(user.email, `¡Tu pago fue aprobado! Orden: ${order.id}`);
            }
            // Aquí podrías notificar internamente (ej: log, email, etc)
        } else if (payment.status === "cancelled") {
            order.status = "cancelled";
        }
        res.json({ message: "Notificación procesada" });
    } catch (error) {
        res.status(500).json({ error: "Error procesando IPN" });
    }
};
