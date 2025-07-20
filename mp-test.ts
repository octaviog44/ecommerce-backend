import { MercadoPagoConfig } from "mercadopago";

const mp = new MercadoPagoConfig({
    accessToken: "TU_ACCESS_TOKEN_AQUI"
});

console.log("Instancia creada correctamente");
console.log("Métodos de mp:", Object.keys(mp));