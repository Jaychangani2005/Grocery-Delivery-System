export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    license_number: string;
    created_at: Date;
    updated_at: Date;
}

export interface Order {
    id: string;
    user_id: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    delivery_address: string;
    total_amount: number;
    created_at: Date;
    updated_at: Date;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price_at_time: number;
    created_at: Date;
    updated_at: Date;
}
