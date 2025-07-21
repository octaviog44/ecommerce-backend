import { Request, Response } from "express";
import { orders, products } from "../db/data.ts";
import axios from "axios";
import { nanoid } from "nanoid";

export const createOrder = async (req: Request, res: Response) => {
    const { productId } = req.query;
    // @ts-ignore
    const user = req.user;
    if (!productId) return res.status(400).json({ error: "productId requerido" });
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    if (product.stock < 1) return res.status(400).json({ error: "Sin stock" });

    // Crear orden en base de datos
    const order = {
        id: nanoid(),
        userId: user.id,
        productId: product.id,
        status: "pending" as "pending",
        paymentUrl: ""
    };
    orders.push(order);

    // Crear preferencia de pago en Mercado Pago
    try {
        const preference = {
            items: [
                {
                    title: product.name,
                    unit_price: product.price,
                    quantity: 1,
                },
            ],
            back_urls: {
                success: "https://tusitio.com/success",
                failure: "https://tusitio.com/failure",
                pending: "https://tusitio.com/pending",
            },
            auto_return: "approved",
            external_reference: order.id
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
        order.paymentUrl = response.data.init_point;
        res.json({ orderId: order.id, paymentUrl: order.paymentUrl });
    } catch (error) {
        res.status(500).json({ error: "Error al crear preferencia de pago" });
    }
};

export const getMyOrders = (req: Request, res: Response) => {
    // @ts-ignore
    const user = req.user;
    const myOrders = orders.filter(o => o.userId === user.id);
    // Opcional: incluir info del producto en cada orden
    const detailedOrders = myOrders.map(order => ({
        ...order,
        product: products.find(p => p.id === order.productId) || null
    }));
    res.json({ orders: detailedOrders });
};

export const getOrderById = (req: Request, res: Response) => {
    // @ts-ignore
    const user = req.user;
    const { orderId } = req.params;
    const order = orders.find(o => o.id === orderId && o.userId === user.id);
    if (!order) return res.status(404).json({ error: "Orden no encontrada" });
    const product = products.find(p => p.id === order.productId) || null;
    res.json({ ...order, product });
};
