import axios from "axios";

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

export const mercadopagoIPN = (req, res) => {
    // ... validar pago, actualizar orden, enviar email, notificar internos
};
