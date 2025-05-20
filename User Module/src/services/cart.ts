import axios, { AxiosInstance } from 'axios';
import { API_URL } from '@/config';
import { CartItem } from './api';

export class CartService {
  private static instance: CartService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (token && isLoggedIn) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        throw new Error('Authentication required');
      }
      return config;
    });
  }

  public static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  async getCartItems(): Promise<CartItem[]> {
    try {
      const userStr = localStorage.getItem('user');
      const userData = userStr ? JSON.parse(userStr) : null;
      
      if (!userData?.id) {
        throw new Error('User data not found');
      }

      // Get cart items using the base cart endpoint
      const response = await this.api.get<CartItem[]>('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  }

  async addToCart(productId: number, quantity: number): Promise<CartItem> {
    try {
      const userStr = localStorage.getItem('user');
      const userData = userStr ? JSON.parse(userStr) : null;
      
      if (!userData?.id) {
        throw new Error('User data not found');
      }

      // Add item to cart using the add endpoint
      const response = await this.api.post<CartItem>('/cart/add', {
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  async updateQuantity(productId: number, quantity: number): Promise<CartItem> {
    try {
      // Update using the product ID directly
      const response = await this.api.put<CartItem>(`/cart/items/${productId}`, {
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  }

  async removeFromCart(productId: number): Promise<void> {
    try {
      await this.api.delete(`/cart/items/${productId}`);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  async clearCart(): Promise<void> {
    try {
      const userStr = localStorage.getItem('user');
      const userData = userStr ? JSON.parse(userStr) : null;
      
      if (!userData?.id) {
        throw new Error('User data not found');
      }

      // Clear cart by removing all items
      const cartItems = await this.getCartItems();
      await Promise.all(cartItems.map(item => this.removeFromCart(item.product.id)));
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
}

// Export the singleton instance
export const cartService = CartService.getInstance(); 