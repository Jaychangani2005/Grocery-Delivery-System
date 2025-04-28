import { useState, useEffect } from "react";
import { Product } from "@/services/api";
import { cartService } from "@/services/cart";
import { authService } from "@/services/auth";
import { toast } from "react-hot-toast";

interface CartItem {
  product: Product;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart items when component mounts or when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const isLoggedIn = authService.isLoggedIn();
        const user = authService.getCurrentUser();
        
        if (isLoggedIn && user) {
          console.log('Fetching cart for logged in user:', user);
          const items = await cartService.getCartItems();
          console.log('Fetched cart items:', items);
          setCartItems(items);
        } else {
          console.log('User not logged in or user data missing, clearing cart');
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCartItems([]);
        toast.error('Failed to fetch cart items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const handleAuthChange = () => {
      const isLoggedIn = authService.isLoggedIn();
      const user = authService.getCurrentUser();
      
      if (!isLoggedIn || !user) {
        setCartItems([]);
      }
    };

    window.addEventListener('storage', handleAuthChange);
    return () => window.removeEventListener('storage', handleAuthChange);
  }, []);

  const addToCart = async (product: Product, quantity: number) => {
    try {
      const isLoggedIn = authService.isLoggedIn();
      const user = authService.getCurrentUser();
      
      if (!isLoggedIn || !user) {
        throw new Error('Please login to add items to cart');
      }

      console.log('Adding to cart:', { product, quantity });
      const newItem = await cartService.addToCart(product.id, quantity);
      console.log('Added to cart successfully:', newItem);
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.product.id === product.id);
        if (existingItem) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, newItem];
      });
      toast.success('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
      throw error;
    }
  };

  const updateCartItem = async (productId: number, quantity: number) => {
    try {
      const isLoggedIn = authService.isLoggedIn();
      const user = authService.getCurrentUser();
      
      if (!isLoggedIn || !user) {
        throw new Error('Please login to update cart');
      }

      console.log('Updating cart item:', { productId, quantity });
      const updatedItem = await cartService.updateQuantity(productId, quantity);
      console.log('Updated cart item:', updatedItem);
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? updatedItem : item
        )
      );
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast.error('Failed to update cart');
      throw error;
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const isLoggedIn = authService.isLoggedIn();
      const user = authService.getCurrentUser();
      
      if (!isLoggedIn || !user) {
        throw new Error('Please login to remove items from cart');
      }

      console.log('Removing from cart:', productId);
      await cartService.removeFromCart(productId);
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
      throw error;
    }
  };

  const isInCart = (productId: number) => {
    return cartItems.some((item) => item.product.id === productId);
  };

  const getCartQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.product.id === productId);
    return item?.quantity || 0;
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return {
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    isInCart,
    getCartQuantity,
    isCartOpen,
    toggleCart,
    isLoading
  };
}; 