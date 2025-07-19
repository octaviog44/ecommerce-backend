import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRoutes from "./routes/products.ts";
console.log("productsRoutes importado");
import authRoutes from "./routes/auth.ts";
console.log("authRoutes importado");
import userRoutes from "./routes/users.ts";
console.log("userRoutes importado");
import productRoutes from "./routes/products.ts";
console.log("productRoutes importado");
import orderRoutes from "./routes/orders.ts";
console.log("orderRoutes importado");
import mercadopagoRoutes from "./routes/mercadopago.ts";
console.log("mercadopagoRoutes importado");

console.log("Hola mundo desde index.ts");

dotenv.config();
console.log("dotenv configurado");

const app = express();
app.use(express.json());
app.use(cors());
console.log("Express y middlewares configurados");

app.use("/auth", authRoutes);
console.log("/auth configurado");

// app.use("/products", productsRoutes);
// console.log("/products configurado");

// app.use("/users", userRoutes);
// console.log("/users configurado");

// app.use("/orders", orderRoutes);
// console.log("/orders configurado");

app.use("/mercadopago", mercadopagoRoutes);
console.log("/mercadopago configurado");

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});
console.log("Endpoint raíz configurado");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
console.log("Listener configurado");
