import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import CartDrawer from "./components/CartDrawer";
import { Product, CartItem, cartService } from "@/services/api";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";
import { toast } from "react-hot-toast";
import { authService } from "@/services/auth";
import LoginButton from "@/components/LoginButton";

const queryClient = new QueryClient();

interface User {
  name: string;
  email: string;
}

interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  address: string;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled';
}

const AppContent = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [selectedAddress, setSelectedAddress] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem("selectedAddress") || "";
  });
  const [addresses, setAddresses] = useState<string[]>(() => {
    const savedAddresses = localStorage.getItem("addresses");
    return savedAddresses ? JSON.parse(savedAddresses) : [
      "123 Main Street, City, State, Country",
      "456 Park Avenue, City, State, Country",
      "789 Beach Road, City, State, Country"
    ];
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Fetch cart items when component mounts or user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn) {
        try {
          console.log('Fetching cart items...');
          const items = await cartService.getCart();
          console.log('Cart items fetched:', items);
          setCartItems(items);
        } catch (error) {
          console.error('Error fetching cart items:', error);
          toast.error('Failed to load cart items');
        }
      } else {
        setCartItems([]);
      }
    };

    fetchCart();
  }, [isLoggedIn]);

  // Persist authentication state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [isLoggedIn, user]);

  // Persist selectedAddress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedAddress", selectedAddress);
  }, [selectedAddress]);

  // Persist addresses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogin = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleAddressChange = (address: string) => {
    setSelectedAddress(address);
  };

  const handleAddToCart = async (product: Product, quantity: number) => {
    try {
      console.log('Adding to cart:', { product, quantity });
      const newItem = await cartService.addToCart(product.id, quantity);
      console.log('New cart item:', newItem);
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.productId === product.id);
        console.log('Existing items:', prevItems);
        console.log('Existing item found:', existingItem);
        
        if (existingItem) {
          const updatedItems = prevItems.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          console.log('Updated items:', updatedItems);
          return updatedItems;
        }
        
        const newItems = [...prevItems, newItem];
        console.log('New items array:', newItems);
        return newItems;
      });
      toast.success('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const handleUpdateCart = async (productId: number, quantity: number) => {
    try {
      const updatedItem = await cartService.updateCartItem(productId, quantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId ? updatedItem : item
        )
      );
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      await cartService.removeFromCart(productId);
      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
      toast.success('Removed from cart successfully!');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to place an order");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const orderData = {
        items: cartItems,
        address: selectedAddress,
        paymentMethod: 'cod' as const
      };

      await cartService.placeOrder(orderData);
      setCartItems([]);
      setIsCartOpen(false);
      setShowOrderSuccess(true);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  const commonProps = {
    cartItems,
    toggleCart,
    isLoggedIn,
    user,
    onLogout: handleLogout,
    selectedAddress,
    onAddressChange: handleAddressChange,
    orders,
    showOrderSuccess,
    setShowOrderSuccess
  };

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Index
            {...commonProps}
            onAddToCart={handleAddToCart}
            onUpdateCart={handleUpdateCart}
            onRemoveFromCart={handleRemoveFromCart}
            isCartOpen={isCartOpen}
            onLoginClick={() => navigate('/auth')}
            addresses={addresses}
            onPlaceOrder={handlePlaceOrder}
          />
        } />
        <Route path="/auth" element={
          <Auth
            onLogin={handleLogin}
            isLoggedIn={isLoggedIn}
          />
        } />
        <Route path="/orders" element={<Orders {...commonProps} />} />
        <Route path="/addresses" element={<Addresses {...commonProps} />} />
        <Route path="/product/:id" element={
          <ProductDetails
            {...commonProps}
            onAddToCart={handleAddToCart}
            onUpdateCart={handleUpdateCart}
            onRemoveFromCart={handleRemoveFromCart}
            isCartOpen={isCartOpen}
          />
        } />
        <Route path="/category/:category" element={
          <CategoryPage
            {...commonProps}
            onAddToCart={handleAddToCart}
            onUpdateCart={handleUpdateCart}
            onRemoveFromCart={handleRemoveFromCart}
            isCartOpen={isCartOpen}
            onLoginClick={() => navigate('/auth')}
            addresses={addresses}
            onPlaceOrder={handlePlaceOrder}
          />
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems}
        updateQuantity={handleUpdateCart}
        removeFromCart={handleRemoveFromCart}
        selectedAddress={selectedAddress}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => navigate('/auth')}
        onPlaceOrder={handlePlaceOrder}
        addresses={addresses}
        onAddressChange={handleAddressChange}
      />
      {showOrderSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-4">Thank you for your order. We'll notify you when it's ready for delivery.</p>
            <button
              onClick={() => setShowOrderSuccess(false)}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
      <div className="fixed top-4 right-4 z-50">
        {!isLoggedIn && (
          <LoginButton onLogin={handleLogin} />
        )}
      </div>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
