import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryProducts from "./components/CategoryProducts";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import CartDrawer from "./components/CartDrawer";
import { BestSellerProduct } from "./components/BestSellerCard";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";
import { toast } from "react-hot-toast";

const queryClient = new QueryClient();

interface User {
  name: string;
  email: string;
}

interface Order {
  id: string;
  items: BestSellerProduct[];
  totalAmount: number;
  address: string;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled';
}

const AppContent = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<BestSellerProduct[]>([]);
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
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

  const handleAddressChange = (address: string) => {
    setSelectedAddress(address);
  };

  const handleAddToCart = (product: BestSellerProduct, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity }];
    });
  };

  const handleUpdateCart = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handlePlaceOrder = () => {
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

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder: Order = {
      id: `ORD${Date.now()}`,
      items: [...cartItems],
      totalAmount,
      address: selectedAddress,
      date: new Date().toISOString(),
      status: 'pending'
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    setCartItems([]);
    setIsCartOpen(false);
    setShowOrderSuccess(true);
    toast.success("Order placed successfully!");
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
          <CategoryProducts
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
