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
import { Product, CartItem, cartService, userService, orderService } from "@/services/api";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";
import { toast } from "react-hot-toast";
import { authService, User as AuthUser } from "@/services/auth";
import LoginButton from "@/components/LoginButton";
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

interface User {
  id: number;
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

interface Address {
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

interface Category {
  category_id: number;
  name: string;
}

interface ProductDetailsProps {
  product: Product;
  isLoggedIn: boolean;
  onAddToCart: (product: Product, quantity: number) => Promise<void>;
  onUpdateCart: (productId: number, quantity: number) => Promise<void>;
  onRemoveFromCart: (productId: number) => Promise<void>;
  cartItems: CartItem[];
  selectedAddress: string;
  onAddressChange: (address: string) => void;
  addresses: Address[];
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

const AppContent = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize user state from auth service
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = authService.isLoggedIn();
      setIsLoggedIn(isLoggedIn);
      
      if (isLoggedIn) {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      }
      
      // Initialize selected address from localStorage
      const savedAddress = localStorage.getItem('selectedAddress');
      if (savedAddress) {
        setSelectedAddress(savedAddress);
      }
    };
    
    checkAuth();
  }, []);

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

  // Fetch addresses when component mounts or user logs in
  useEffect(() => {
    const fetchAddresses = async () => {
      if (isLoggedIn) {
        try {
          const userAddresses = await userService.getAddresses();
          setAddresses(userAddresses);
          
          // If there's a saved address ID in localStorage, use it
          const savedAddressId = localStorage.getItem('selectedAddress');
          if (savedAddressId) {
            setSelectedAddress(savedAddressId);
          } else if (userAddresses.length > 0) {
            // If no saved address but user has addresses, use the first one
            setSelectedAddress(userAddresses[0].address_id.toString());
            localStorage.setItem('selectedAddress', userAddresses[0].address_id.toString());
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      }
    };

    fetchAddresses();
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

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogin = (userData: AuthUser) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setSelectedAddress("");
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedAddress');
    authService.logout();
  };

  const handleAddressChange = (addressId: string) => {
    setSelectedAddress(addressId);
    localStorage.setItem('selectedAddress', addressId);
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

    // Clear cart and show success message
    setCartItems([]);
    setIsCartOpen(false);
    setShowOrderSuccess(true);
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
            product={selectedProduct}
            isLoggedIn={isLoggedIn}
            onAddToCart={handleAddToCart}
            onUpdateCart={handleUpdateCart}
            onRemoveFromCart={handleRemoveFromCart}
            cartItems={cartItems}
            selectedAddress={selectedAddress}
            onAddressChange={handleAddressChange}
            addresses={addresses}
            user={user}
            onLogout={handleLogout}
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
        userId={user?.id}
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
      <Navbar
        toggleCart={toggleCart}
        cartItems={cartItems}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
        selectedAddress={selectedAddress}
        onAddressChange={handleAddressChange}
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
