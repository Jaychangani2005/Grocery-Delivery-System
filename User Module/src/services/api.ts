import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { authService } from './auth';

// Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  image?: string;
  image_url?: string;
  category: string;
  rating: number;
  isOrganic: boolean;
  unit: string;
  stock: number;
  weight?: string;
  shelfLife?: string;
}

export interface Category {
  id: number;
  name: string;
  adminId: number;
  image: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  id: number;
  userId: number;
  total: number;
  status: 'new' | 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled' | 'Out For delivery';
  items: CartItem[];
  createdAt: string;
  paymentMethod?: string;
}

export interface UserAddress {
  id: number;
  userId: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Address {
  address_id: number;
  address_type: 'Home' | 'Work' | 'Hotel' | 'Other';
  name: string;
  phone: string;
  house_no: string;
  building_name?: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface PlaceOrderData {
  userId: number;
  items: CartItem[];
  addressId: number;
  paymentMethod: string;
  total: number;
}

interface ApiError {
  error: string;
}

interface OrdersResponse {
  orders?: Order[];
}

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle API errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const message = error.response?.data?.error || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      console.log('Fetching all products...');
      
      // Try to fetch from API first
      try {
    const response = await api.get<Product[]>('/products');
        console.log('Products fetched successfully:', response.data);
    return response.data;
      } catch (apiError) {
        console.log('API error, using mock data:', apiError);
        
        // If API fails, use mock data
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "Organic Apples",
            description: "Fresh from Kashmir",
            price: 150.00,
            oldPrice: 180.00,
            image: "/images/products/apples.jpg",
            category: "Fruits",
            rating: 4.5,
            isOrganic: true,
            unit: "1kg",
            stock: 50
          },
          {
            id: 2,
            name: "Amul Butter",
            description: "Salted 500g",
            price: 250.00,
            oldPrice: 280.00,
            image: "/images/products/butter.jpg",
            category: "Dairy",
            rating: 4.2,
            isOrganic: false,
            unit: "500g",
            stock: 30
          },
          {
            id: 3,
            name: "Basmati Rice",
            description: "Extra long grain",
            price: 600.00,
            oldPrice: 650.00,
            image: "/images/products/rice.jpg",
            category: "Grains",
            rating: 4.7,
            isOrganic: false,
            unit: "5kg",
            stock: 20
          },
          {
            id: 4,
            name: "Fresh Tomatoes",
            description: "Locally grown",
            price: 80.00,
            oldPrice: 100.00,
            image: "/images/products/tomatoes.jpg",
            category: "Vegetables",
            rating: 4.0,
            isOrganic: true,
            unit: "1kg",
            stock: 40
          },
          {
            id: 5,
            name: "Whole Wheat Bread",
            description: "Freshly baked",
            price: 60.00,
            oldPrice: 70.00,
            image: "/images/products/bread.jpg",
            category: "Bakery",
            rating: 4.3,
            isOrganic: false,
            unit: "400g",
            stock: 25
          }
        ];
        
        return mockProducts;
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryIdOrName: number | string): Promise<Product[]> => {
    try {
      console.log('Fetching products for category:', categoryIdOrName);
      
      // Try to fetch from API first
      try {
        // If category is "all", fetch all products
        if (categoryIdOrName === 'all') {
          const response = await api.get<Product[]>('/products');
          console.log('All products fetched successfully:', response.data);
          return response.data;
        }
        
        // Otherwise fetch products for specific category
        const response = await api.get<Product[]>(`/products/category/${encodeURIComponent(String(categoryIdOrName).toLowerCase())}`);
        console.log('Products fetched successfully:', response.data);
        return response.data;
      } catch (apiError) {
        console.log('API error, using mock data:', apiError);
        
        // If API fails, use mock data
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "Organic Apples",
            description: "Fresh from Kashmir",
            price: 150.00,
            oldPrice: 180.00,
            image: "/images/products/apples.jpg",
            category: "Fruits",
            rating: 4.5,
            isOrganic: true,
            unit: "1kg",
            stock: 50
          },
          {
            id: 2,
            name: "Amul Butter",
            description: "Salted 500g",
            price: 250.00,
            oldPrice: 280.00,
            image: "/images/products/butter.jpg",
            category: "Dairy",
            rating: 4.2,
            isOrganic: false,
            unit: "500g",
            stock: 30
          },
          {
            id: 3,
            name: "Basmati Rice",
            description: "Extra long grain",
            price: 600.00,
            oldPrice: 650.00,
            image: "/images/products/rice.jpg",
            category: "Grains",
            rating: 4.7,
            isOrganic: false,
            unit: "5kg",
            stock: 20
          },
          {
            id: 4,
            name: "Fresh Tomatoes",
            description: "Locally grown",
            price: 80.00,
            oldPrice: 100.00,
            image: "/images/products/tomatoes.jpg",
            category: "Vegetables",
            rating: 4.0,
            isOrganic: true,
            unit: "1kg",
            stock: 40
          },
          {
            id: 5,
            name: "Whole Wheat Bread",
            description: "Freshly baked",
            price: 60.00,
            oldPrice: 70.00,
            image: "/images/products/bread.jpg",
            category: "Bakery",
            rating: 4.3,
            isOrganic: false,
            unit: "400g",
            stock: 25
          }
        ];
        
        // If category is "all", return all mock products
        if (categoryIdOrName === 'all') {
          return mockProducts;
        }
        
        // Otherwise filter products by category
        const categoryName = String(categoryIdOrName).toLowerCase();
        const filteredProducts = mockProducts.filter(
          product => product.category.toLowerCase() === categoryName
        );
        
        return filteredProducts;
      }
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Get best sellers
  getBestSellers: async (): Promise<Product[]> => {
    try {
      console.log('Fetching best sellers...');
      
      // Try to fetch from API first
      try {
    const response = await api.get<Product[]>('/products/best-sellers');
        console.log('Best sellers fetched successfully:', response.data);
    return response.data;
      } catch (apiError) {
        console.log('API error, using mock data:', apiError);
        
        // If API fails, use mock data
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "Organic Apples",
            description: "Fresh from Kashmir",
            price: 150.00,
            oldPrice: 180.00,
            image: "/images/products/apples.jpg",
            category: "Fruits",
            rating: 4.5,
            isOrganic: true,
            unit: "1kg",
            stock: 50
          },
          {
            id: 2,
            name: "Amul Butter",
            description: "Salted 500g",
            price: 250.00,
            oldPrice: 280.00,
            image: "/images/products/butter.jpg",
            category: "Dairy",
            rating: 4.2,
            isOrganic: false,
            unit: "500g",
            stock: 30
          },
          {
            id: 3,
            name: "Basmati Rice",
            description: "Extra long grain",
            price: 600.00,
            oldPrice: 650.00,
            image: "/images/products/rice.jpg",
            category: "Grains",
            rating: 4.7,
            isOrganic: false,
            unit: "5kg",
            stock: 20
          }
        ];
        
        // Return top 3 products as best sellers
        return mockProducts.slice(0, 3);
      }
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      throw error;
    }
  },

  // Get featured products
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      console.log('Fetching featured products...');
      
      // Try to fetch from API first
      try {
    const response = await api.get<Product[]>('/products/featured');
        console.log('Featured products fetched successfully:', response.data);
    return response.data;
      } catch (apiError) {
        console.log('API error, using mock data:', apiError);
        
        // If API fails, use mock data
        const mockProducts: Product[] = [
          {
            id: 4,
            name: "Fresh Tomatoes",
            description: "Locally grown",
            price: 80.00,
            oldPrice: 100.00,
            image: "/images/products/tomatoes.jpg",
            category: "Vegetables",
            rating: 4.0,
            isOrganic: true,
            unit: "1kg",
            stock: 40
          },
          {
            id: 5,
            name: "Whole Wheat Bread",
            description: "Freshly baked",
            price: 60.00,
            oldPrice: 70.00,
            image: "/images/products/bread.jpg",
            category: "Bakery",
            rating: 4.3,
            isOrganic: false,
            unit: "400g",
            stock: 25
          }
        ];
        
        return mockProducts;
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      console.log('Searching products with query:', query);
      
      // Try to fetch from API first
      try {
        const response = await api.get<Product[]>(`/products/search?q=${encodeURIComponent(query.trim())}`);
        console.log('Search results from API:', response.data);
        
        // Ensure we have an array of products
        if (Array.isArray(response.data)) {
          return response.data;
        } else {
          console.warn('API returned non-array data:', response.data);
          throw new Error('Invalid response format');
        }
      } catch (apiError) {
        console.log('API error, using mock data:', apiError);
        
        // If API fails, use mock data with improved search filtering
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "Organic Apples",
            description: "Fresh from Kashmir",
            price: 150.00,
            oldPrice: 180.00,
            image: "/images/products/apples.jpg",
            category: "Fruits",
            rating: 4.5,
            isOrganic: true,
            unit: "1kg",
            stock: 50
          },
          {
            id: 2,
            name: "Amul Butter",
            description: "Salted 500g",
            price: 250.00,
            oldPrice: 280.00,
            image: "/images/products/butter.jpg",
            category: "Dairy",
            rating: 4.2,
            isOrganic: false,
            unit: "500g",
            stock: 30
          },
          {
            id: 3,
            name: "Basmati Rice",
            description: "Extra long grain",
            price: 600.00,
            oldPrice: 650.00,
            image: "/images/products/rice.jpg",
            category: "Grains",
            rating: 4.7,
            isOrganic: false,
            unit: "5kg",
            stock: 20
          },
          {
            id: 4,
            name: "Fresh Tomatoes",
            description: "Locally grown",
            price: 80.00,
            oldPrice: 100.00,
            image: "/images/products/tomatoes.jpg",
            category: "Vegetables",
            rating: 4.0,
            isOrganic: true,
            unit: "1kg",
            stock: 40
          },
          {
            id: 5,
            name: "Whole Wheat Bread",
            description: "Freshly baked",
            price: 60.00,
            oldPrice: 70.00,
            image: "/images/products/bread.jpg",
            category: "Bakery",
            rating: 4.3,
            isOrganic: false,
            unit: "400g",
            stock: 25
          }
        ];
        
        // Filter mock products based on search query with improved matching
        const searchTerm = query.toLowerCase().trim();
        console.log('Filtering mock products with search term:', searchTerm);
        
        const getRelevanceScore = (product: Product): number => {
          const name = product.name.toLowerCase();
          const desc = product.description.toLowerCase();
          const category = product.category.toLowerCase();
          
          if (name === searchTerm) return 10;
          if (name.includes(` ${searchTerm} `)) return 8;
          if (name.startsWith(`${searchTerm} `)) return 7;
          if (name.endsWith(` ${searchTerm}`)) return 7;
          if (name.includes(searchTerm)) return 5;
          if (desc.includes(searchTerm)) return 3;
          if (category.includes(searchTerm)) return 1;
          return 0;
        };
        
        const filteredProducts = mockProducts
          .map(product => ({
            ...product,
            relevance: getRelevanceScore(product)
          }))
          .filter(product => product.relevance > 0)
          .sort((a, b) => {
            if (a.relevance !== b.relevance) {
              return b.relevance - a.relevance;
            }
            return b.rating - a.rating;
          })
          .map(({ relevance, ...product }) => product);
        
        console.log(`Found ${filteredProducts.length} mock products matching "${query}"`);
        return filteredProducts;
      }
    } catch (error) {
      console.error('Error in searchProducts:', error);
      return []; // Return empty array if both API and mock data fail
    }
  },

  // Get product by ID
  getProductById: async (id: number): Promise<Product> => {
    try {
      console.log('Fetching product by ID:', id);
      
      // Try to fetch from API first
      try {
        const response = await api.get<Product>(`/products/${id}`);
        console.log('Product fetched successfully:', response.data);
        return response.data;
      } catch (apiError) {
        console.log('API error, using mock data:', apiError);
        
        // If API fails, combine all available mock data
        const mockProducts: Product[] = [
          // Best seller products
          {
            id: 1,
            name: "Organic Apples",
            description: "Fresh from Kashmir",
            price: 150.00,
            oldPrice: 180.00,
            image: "/images/products/apples.jpg",
            category: "Fruits",
            rating: 4.5,
            isOrganic: true,
            unit: "1kg",
            stock: 50
          },
          {
            id: 2,
            name: "Amul Butter",
            description: "Salted 500g",
            price: 250.00,
            oldPrice: 280.00,
            image: "/images/products/butter.jpg",
            category: "Dairy",
            rating: 4.2,
            isOrganic: false,
            unit: "500g",
            stock: 30
          },
          {
            id: 3,
            name: "Basmati Rice",
            description: "Extra long grain",
            price: 600.00,
            oldPrice: 650.00,
            image: "/images/products/rice.jpg",
            category: "Grains",
            rating: 4.7,
            isOrganic: false,
            unit: "5kg",
            stock: 20
          },
          {
            id: 4,
            name: "Fresh Tomatoes",
            description: "Locally grown",
            price: 80.00,
            oldPrice: 100.00,
            image: "/images/products/tomatoes.jpg",
            category: "Vegetables",
            rating: 4.0,
            isOrganic: true,
            unit: "1kg",
            stock: 40
          },
          {
            id: 5,
            name: "Whole Wheat Bread",
            description: "Freshly baked",
            price: 60.00,
            oldPrice: 70.00,
            image: "/images/products/bread.jpg",
            category: "Bakery",
            rating: 4.3,
            isOrganic: false,
            unit: "400g",
            stock: 25
          },
          // Add more products from other categories
          {
            id: 101,
            name: "Whole Wheat Atta",
            description: "Premium chakki fresh atta",
            price: 249.00,
            oldPrice: 299.00,
            image: "/images/products/atta.jpg",
            category: "Atta",
            rating: 4.5,
            isOrganic: true,
            unit: "5 kg",
            stock: 100
          },
          {
            id: 201,
            name: "Turmeric Powder",
            description: "Pure turmeric powder with high curcumin content",
            price: 149.00,
            oldPrice: 179.00,
            image: "/images/products/turmeric.jpg",
            category: "Masalas",
            rating: 4.6,
            isOrganic: true,
            unit: "200g",
            stock: 100
          }
        ];
        
        // Try to find the product in our mock data
        const product = mockProducts.find(p => p.id === id);
        
        if (product) {
          return product;
        }
        
        // If product not found in mock data, create a dynamic mock product
        console.log(`Product with ID ${id} not found in mock data, creating dynamic mock product`);
        
        // Create a dynamic mock product based on the ID
        const dynamicProduct: Product = {
          id: id,
          name: `Generic Product ${id}`,
          description: `A high-quality product for your needs`,
          price: 100.00 + (id * 10),
          oldPrice: 150.00 + (id * 10),
          image: "/images/products/default.jpg",
          category: "General",
          rating: 4.0,
          isOrganic: id % 2 === 0,
          unit: "1 unit",
          stock: 50
        };
        
        return dynamicProduct;
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
};

export const categoryService = {
  // Get all categories
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  // Get category by ID
  getCategoryById: async (categoryId: number): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${categoryId}`);
    return response.data;
  }
};

export const cartService = {
  getCart: async (): Promise<CartItem[]> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, returning empty cart');
        return [];
      }

      const response = await fetch(`${API_BASE_URL}/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      console.log('Fetched cart items:', data);
      return data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return [];
    }
  },

  addToCart: async (productId: number, quantity: number): Promise<CartItem> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User must be logged in to add items to cart');
      }

      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add item to cart');
      }

      const data = await response.json();
      console.log('Added item to cart:', data);
      return data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  updateCartItem: async (productId: number, quantity: number): Promise<CartItem> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User must be logged in to update cart');
      }

      const response = await fetch(`${API_BASE_URL}/cart/items/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update cart item');
      }

      const data = await response.json();
      console.log('Updated cart item:', data);
      return data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  removeFromCart: async (productId: number): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User must be logged in to remove items from cart');
      }

      const response = await fetch(`${API_BASE_URL}/cart/items/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to remove item from cart');
      }

      console.log('Removed item from cart:', productId);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  placeOrder: async (addressId: number): Promise<Order> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User must be logged in to place order');
      }

      // Get the current user from localStorage
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('User data not found. Please log in again.');
      }

      const user = JSON.parse(userStr);
      if (!user || !user.id) {
        throw new Error('User ID not found. Please log in again.');
      }

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          addressId,
          userId: user.id 
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to place order');
      }

      const data = await response.json();
      console.log('Placed order:', data);
      return data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  }
};

export const userService = {
  // Get user profile
  getProfile: async (): Promise<{ name: string; email: string }> => {
    const response = await api.get<{ name: string; email: string }>('/users/profile');
    return response.data;
  },

  // Address related endpoints
  getAddresses: async () => {
    const response = await api.get<Address[]>('/addresses');
    return response.data;
  },

  addAddress: async (address: Omit<Address, 'address_id'>) => {
    const response = await api.post<Address>('/addresses', address);
    return response.data;
  },

  updateAddress: async (addressId: number, address: Omit<Address, 'address_id'>) => {
    const response = await api.put<Address>(`/addresses/${addressId}`, address);
    return response.data;
  },

  deleteAddress: async (addressId: number) => {
    const response = await api.delete(`/addresses/${addressId}`);
    return response.data;
  },
};

export const orderService = {
  placeOrder: async (orderData: PlaceOrderData) => {
    try {
      console.log('Placing order with data:', orderData);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await api.post('/orders', {
        ...orderData,
        paymentMethod: orderData.paymentMethod || 'cod',
        status: 'new'
      });

      console.log('Order placed successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  },

  getOrders: async (): Promise<Order[]> => {
    try {
      console.log('Fetching orders...');
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      const userData = userStr ? JSON.parse(userStr) : null;
      
      if (!token) {
        console.warn('No authentication token found');
        throw new Error('Authentication token is required');
      }

      if (!userData?.id) {
        console.warn('No user data found');
        throw new Error('User data is missing');
      }

      console.log('Fetching orders with auth token for user:', userData.id);
      
      const response = await api.get<{orders: Order[]}>('/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          userId: userData.id
        }
      });

      if (!response.data) {
        console.warn('No response data found');
        return [];
      }

      // Handle both {orders: []} and direct array response formats
      const orders = Array.isArray(response.data) 
        ? response.data 
        : response.data.orders || [];

      console.log('Orders fetched successfully:', orders);
      return orders;

    } catch (error) {
      console.error('Error in getOrders:', error);
      throw error;
    }
  }
};

export default api; 