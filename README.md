       # E-commerce Backend

Este proyecto es un backend para un e-commerce, desarrollado en Node.js + TypeScript. Incluye autenticación por email, gestión de usuarios y productos, órdenes de compra y pagos integrados con Mercado Pago.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express
- TypeScript
- JWT (jsonwebtoken)
- Mercado Pago (checkout y webhook)
- Axios
- Nanoid
- Dotenv

---

## 📦 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz con:
   ```
   ACCESS_TOKEN=tu_access_token_de_mercadopago
   JWT_SECRET=un_secreto_para_jwt
   PORT=3000
   ```

4. **Inicia el servidor:**
   ```bash
   npm run dev
   ```

5.   Descarga la colección de Postman desde [aquí](./postman/New-Collection.postman_collection.json)
---

## 🛠️ Endpoints disponibles

### **Autenticación y usuario**
- `POST /auth`  
  Recibe un email, encuentra/crea un usuario y le envía un código (mock).
- `POST /auth/token`  
  Recibe email y código, valida y devuelve un JWT.
- `GET /users/me`  
  Devuelve info del usuario autenticado (requiere JWT).
- `PATCH /users/me`  
  Modifica datos del usuario autenticado (requiere JWT).
- `PATCH /users/me/address`  
  Modifica solo la dirección del usuario autenticado (requiere JWT).

### **Productos**
- `GET /products/search?q=query&offset=0&limit=10`  
  Busca productos por nombre, con paginación.
- `GET /products/:id`  
  Devuelve la información de un producto.

### **Órdenes y pagos**
- `POST /orders?productId={id}`  
  Crea una orden y una preferencia de pago en Mercado Pago. Devuelve la URL de pago y el orderId (requiere JWT).
- `GET /orders/me`  
  Devuelve todas las órdenes del usuario autenticado (requiere JWT).
- `GET /orders/:orderId`  
  Devuelve la información de una orden específica (requiere JWT).
- `POST /mercadopago/ipn/mercadopago`  
  Webhook para recibir notificaciones de Mercado Pago y actualizar el estado de la orden.

---

## 🔑 Autenticación

- Los endpoints protegidos requieren el header:
  ```
  Authorization: Bearer TU_TOKEN
  ```
- El token se obtiene al validar el código en `/auth/token`.

---

## 🧪 Pruebas y colección de Postman

- [Descarga la colección de Postman aquí](URL_DE_TU_COLLECTION)
- Incluye ejemplos de uso para todos los endpoints.
- Puedes probar el flujo completo: registro, login, consulta y modificación de usuario, creación de órdenes y pagos.

---

## 💡 Notas

- El envío de emails es un mock (se imprime en consola).
- La base de datos es en memoria (se reinicia al reiniciar el servidor).
- El webhook de Mercado Pago puede probarse localmente simulando requests o usando [ngrok](https://ngrok.com/) para exponer el backend.

---

## 📄 Licencia

MIT

---


