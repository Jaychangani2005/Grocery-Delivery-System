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

const queryClient = new QueryClient();

interface User {
  name: string;
  email: string;
}

const AppContent = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<BestSellerProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedAddress, setSelectedAddress] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem("selectedAddress") || "";
  });

  // Persist selectedAddress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedAddress", selectedAddress);
  }, [selectedAddress]);

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

  const commonProps = {
    cartItems,
    toggleCart,
    isLoggedIn,
    user,
    onLogout: handleLogout,
    selectedAddress,
    onAddressChange: handleAddressChange,
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
            toggleCart={toggleCart}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
            selectedAddress={selectedAddress}
            onAddressChange={handleAddressChange}
            onLoginClick={() => navigate('/auth')}
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
      />
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
