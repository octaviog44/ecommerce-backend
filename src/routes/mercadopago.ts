import express from 'express';
import mercadopago from 'mercadopago';

const router = express.Router();

router.post('/create_preference', async (req, res) => {
    try {
        const preference = {
            items: [
                {
                    title: 'Mi producto',
                    unit_price: 100,
                    quantity: 1,
                },
            ],
        };

        const response = await mercadopago.preferences.create(preference);
        res.json({ id: response.body.id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear preferencia' });
    }
});

export default router;