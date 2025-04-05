import { useState, useEffect } from "react";
import { Product } from "@/services/api";
import { cartService } from "@/services/api";

interface CartItem {
  product: Product;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart items when component mounts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const items = await cartService.getCart();
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (product: Product, quantity: number) => {
    try {
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
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateCartItem = async (productId: number, quantity: number) => {
    try {
      const updatedItem = await cartService.updateCartItem(productId, quantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? updatedItem : item
        )
      );
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await cartService.removeFromCart(productId);
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
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