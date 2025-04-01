// import { createContext, useContext, useState } from "react";

// interface CartItem {
//   productId: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   unit?: string;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (product: CartItem, quantity: number) => void;
//   updateQuantity: (productId: number, quantity: number) => void;
//   removeItem: (productId: number) => void;
//   totalItemsInCart: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const addToCart = (product: CartItem, quantity: number) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find((item) => item.productId === product.productId);

//       if (existingItem) {
//         return prev.map((item) =>
//           item.productId === product.productId ? { ...item, quantity: item.quantity + quantity } : item
//         );
//       } else {
//         return [...prev, { ...product, quantity }];
//       }
//     });
//   };

//   const updateQuantity = (productId: number, quantity: number) => {
//     setCartItems((prev) =>
//       prev.map((item) => (item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item))
//     );
//   };

//   const removeItem = (productId: number) => {
//     setCartItems((prev) => prev.filter((item) => item.productId !== productId));
//   };

//   const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, totalItemsInCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };


import { createContext, useContext, useState, ReactNode } from "react";

// Define cart item structure
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Define the context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
