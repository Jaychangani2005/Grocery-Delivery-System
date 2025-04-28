import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './pages/Auth';
import Home from './pages/Index';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Addresses from './pages/Addresses';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import { authService } from './services/auth';
import { orderService, userService, PlaceOrderData, Address } from './services/api';
import { toast } from 'react-hot-toast';
import { cartService } from './services/cart';
import { useCart } from './hooks/use-cart';
import Navbar from './components/Navbar';
import LoginButton from './components/LoginButton';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isLoggedIn());
  const [user, setUser] = useState(authService.getCurrentUser());
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Initialize cart state when user logs in
  useEffect(() => {
    const initializeCart = async () => {
      if (isLoggedIn && user) {
        try {
          const items = await cartService.getCartItems();
          console.log('Initialized cart with items:', items);
          setCartItems(items);
        } catch (error) {
          console.error('Error initializing cart:', error);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };

    initializeCart();
  }, [isLoggedIn, user]);

  // Fetch addresses when user is logged in
  useEffect(() => {
    const fetchAddresses = async () => {
      if (isLoggedIn) {
        try {
          const addressesData = await userService.getAddresses();
          setAddresses(addressesData);
          // Set default address if available
          if (addressesData.length > 0) {
            setSelectedAddress(addressesData[0].address_id.toString());
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
          toast.error('Failed to load addresses');
        }
      }
    };

    fetchAddresses();
  }, [isLoggedIn]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsLoggedIn(false);
    setSelectedAddress('');
    setAddresses([]);
    setCartItems([]);
  };

  const handleAddressChange = (address: string) => {
    setSelectedAddress(address);
  };

  const handleAddToCart = async (product, quantity) => {
    try {
      if (!isLoggedIn) {
        throw new Error('Please login to add items to cart');
      }
      const newItem = await cartService.addToCart(product.id, quantity);
      setCartItems(prev => [...prev, { product, quantity }]);
      setIsCartOpen(true); // Open cart drawer when item is added
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const handleUpdateCart = async (productId, quantity) => {
    try {
      if (!isLoggedIn) {
        throw new Error('Please login to update cart');
      }
      await cartService.updateQuantity(productId, quantity);
      setCartItems(prev => 
        prev.map(item => 
          item.product.id === productId 
            ? { ...item, quantity } 
            : item
        )
      );
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      if (!isLoggedIn) {
        throw new Error('Please login to remove items from cart');
      }
      await cartService.removeFromCart(productId);
      setCartItems(prev => 
        prev.filter(item => item.product.id !== productId)
      );
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const handlePlaceOrder = async (paymentMethod: string, feeComponents?: any) => {
    if (!user || !selectedAddress) {
      toast.error('Please select an address and ensure you are logged in');
      return;
    }

    try {
      // Find the selected address object
      const selectedAddressObj = addresses.find(addr => addr.address_id.toString() === selectedAddress);
      if (!selectedAddressObj) {
        toast.error('Invalid address selected');
        return;
      }

      // If feeComponents is provided, use it directly
      if (feeComponents && 
          typeof feeComponents.subtotal !== 'undefined' && 
          typeof feeComponents.deliveryFee !== 'undefined' && 
          typeof feeComponents.codFee !== 'undefined' && 
          typeof feeComponents.tax !== 'undefined' && 
          typeof feeComponents.total !== 'undefined') {
        
        // Format order data with provided fee components
        const orderData: PlaceOrderData = {
          userId: user.id,
          items: cartItems.map(item => ({
            id: item.id,
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            product: item.product
          })),
          addressId: selectedAddressObj.address_id,
          paymentMethod,
          total: feeComponents.total,
          subtotal: feeComponents.subtotal,
          deliveryFee: feeComponents.deliveryFee,
          codFee: feeComponents.codFee,
          tax: feeComponents.tax
        };

        console.log('Placing order with provided fee components:', orderData);
        const response = await orderService.placeOrder(orderData);
        console.log('Order placed successfully:', response);

        // Clear cart and close cart drawer
        setCartItems([]);
        setIsCartOpen(false);
        toast.success('Order placed successfully');
        return;
      }

      // Otherwise calculate the values
      const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const deliveryFee = 30;
      const codFee = paymentMethod === 'cod' ? 30 : 0;
      const tax = subtotal * 0.18;
      const total = subtotal + deliveryFee + codFee + tax;

      // Format order data
      const orderData: PlaceOrderData = {
        userId: user.id,
        items: cartItems.map(item => ({
          id: item.id,
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          product: item.product
        })),
        addressId: selectedAddressObj.address_id,
        paymentMethod,
        total: total,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        codFee: codFee,
        tax: tax
      };

      console.log('Placing order with calculated values:', orderData);
      const response = await orderService.placeOrder(orderData);
      console.log('Order placed successfully:', response);

      // Clear cart and close cart drawer
      setCartItems([]);
      setIsCartOpen(false);
      toast.success('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  // Common props for all routes
  const commonProps = {
    cartItems,
    onAddToCart: handleAddToCart,
    onUpdateCart: handleUpdateCart,
    onRemoveFromCart: handleRemoveFromCart,
    isCartOpen,
    toggleCart,
    isLoggedIn,
    user,
    onLogout: handleLogout,
    selectedAddress,
    onAddressChange: handleAddressChange,
    onLoginClick: () => setIsCartOpen(true),
    addresses,
    onPlaceOrder: handlePlaceOrder
  };

  // Props for components that expect string[] for addresses
  const addressStringProps = {
    ...commonProps,
    addresses: addresses.map(addr => addr.address_id.toString())
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Navbar {...commonProps} />
        <Routes>
          <Route path="/" element={<Home {...commonProps} />} />
          <Route path="/auth" element={<Auth onLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
          <Route path="/orders" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Orders {...commonProps} />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Cart {...commonProps} />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile {...commonProps} />
            </ProtectedRoute>
          } />
          <Route path="/addresses" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Addresses {...addressStringProps} />
            </ProtectedRoute>
          } />
          <Route path="/category/:category" element={<CategoryPage {...commonProps} />} />
          <Route path="/product/:productId" element={<ProductPage {...commonProps} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
