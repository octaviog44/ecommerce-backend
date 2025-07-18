
export interface User {
    id: string;
    email: string;
    code?: string;
    token?: string;
    name?: string;
    address?: Record<string, any>;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
}

export interface Order {
    id: string;
    userId: string;
    productId: string;
    status: "pending" | "paid" | "cancelled";
    paymentUrl?: string;
}

export const users: User[] = [];
export const products: Product[] = [
    { id: "1", name: "Producto 1", price: 100, stock: 10 },
    { id: "2", name: "Producto 2", price: 200, stock: 5 },
];
export const orders: Order[] = [];
