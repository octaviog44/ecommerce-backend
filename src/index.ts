import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRoutes from "./routes/products.js";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";
import mercadopagoRoutes from "./routes/mercadopago"
import mercadopago from 'mercadopago';

dotenv.config();
const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});

const app = express();
app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use("/products", productRoutes);
app.use("/order", orderRoutes);
app.use("/", mercadopagoRoutes);

declare module 'mercadopago';



app.use(express.json());
app.use(cors());

const mp = new mercadopago(process.env.ACCESS_TOKEN as string);

const preference = {
    items: [
        {
            title: "Mi producto",
            quantity: 1,
            unit_price: 100,
        },
    ],
};

mercadopago.preferences.create(preference)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });


app.get("/", (req, res) => {
    res.send("Servidor funcionando con TypeScript 🚀");
});

app.use("/api/products", productsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});