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
      
      // Check if product already exists in cart
      const existingItem = cartItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // If product exists, update its quantity
        const newQuantity = existingItem.quantity + quantity;
        await cartService.updateQuantity(product.id, newQuantity);
        setCartItems(prev => 
          prev.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: newQuantity } 
              : item
          )
        );
      } else {
        // If product doesn't exist, add it as a new item
        const newItem = await cartService.addToCart(product.id, quantity);
        setCartItems(prev => [...prev, { product, quantity }]);
      }
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

  const handlePlaceOrder = async (paymentMethod: string) => {
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

      // Calculate total
      const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

      // Format order data
      const orderData: PlaceOrderData = {
        userId: user.id,
        items: cartItems.map(item => ({
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            description: item.product.description,
            unit: item.product.unit,
            image: item.product.image
          },
          quantity: item.quantity
        })),
        addressId: selectedAddressObj.address_id,
        paymentMethod,
        total
      };

      console.log('Placing order with data:', orderData);
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

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Navbar 
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={handleLogout}
          cartItems={cartItems}
          isCartOpen={isCartOpen}
          toggleCart={toggleCart}
          selectedAddress={selectedAddress}
          onAddressChange={handleAddressChange}
        />
        <Routes>
          <Route path="/" element={
            <Home
              cartItems={cartItems}
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
              onLoginClick={() => window.location.href = '/auth'}
              addresses={addresses}
              onPlaceOrder={handlePlaceOrder}
            />
          } />
          <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
          <Route path="/category/:categoryName" element={
            <Home
              cartItems={cartItems}
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
              onLoginClick={() => window.location.href = '/auth'}
              addresses={addresses}
              onPlaceOrder={handlePlaceOrder}
            />
          } />
          <Route path="/product/:productId" element={
            <Home
              cartItems={cartItems}
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
              onLoginClick={() => window.location.href = '/auth'}
              addresses={addresses}
              onPlaceOrder={handlePlaceOrder}
            />
          } />
          <Route
            path="/orders"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Orders 
                  isLoggedIn={isLoggedIn}
                  user={user}
                  onLogout={handleLogout}
                  selectedAddress={selectedAddress}
                  onAddressChange={handleAddressChange}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart 
                cartItems={cartItems}
                onUpdateCart={handleUpdateCart}
                onRemoveFromCart={handleRemoveFromCart}
                isLoggedIn={isLoggedIn}
                user={user}
                onLogout={handleLogout}
                selectedAddress={selectedAddress}
                onAddressChange={handleAddressChange}
              />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile 
                isLoggedIn={isLoggedIn}
                user={user}
                onLogout={handleLogout}
                addresses={addresses}
                onAddressChange={handleAddressChange}
              />
            </ProtectedRoute>
          } />
          <Route path="/addresses" element={
            <ProtectedRoute>
              <Addresses 
                isLoggedIn={isLoggedIn}
                user={user}
                onLogout={handleLogout}
                addresses={addresses}
                onAddressChange={handleAddressChange}
                cartItems={cartItems}
                isCartOpen={isCartOpen}
                toggleCart={toggleCart}
              />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
