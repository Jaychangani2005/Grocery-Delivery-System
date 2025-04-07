import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import { Product, CartItem, Address } from "@/services/api";

// Constants
const IMAGE_BASE_URL = 'http://localhost:5000'; // Backend static files server URL

interface ProductDetailsProps {
  cartItems: CartItem[];
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  selectedAddress: string;
  onAddressChange: (address: string) => void;
  addresses: Address[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  cartItems,
  onAddToCart,
  onUpdateCart,
  onRemoveFromCart,
  isCartOpen,
  toggleCart,
  isLoggedIn,
  user,
  onLogout,
  selectedAddress,
  onAddressChange,
  addresses,
}) => {
  const location = useLocation();
  const product = location.state as Product;
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    // Check if product is in cart
    const cartItem = cartItems.find((item) => item.productId === product.id);
    if (cartItem) {
      setIsAddedToCart(true);
      setQuantity(cartItem.quantity || 1);
    } else {
      setIsAddedToCart(false);
      setQuantity(1);
    }
  }, [cartItems, product.id]);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const incrementQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = Math.min(prev + 1, 10);
      if (isAddedToCart) {
        onUpdateCart(product.id, newQuantity);
      }
      return newQuantity;
    });
  };

  const decrementQuantity = () => {
    if (quantity === 1) {
      setIsAddedToCart(false);
      onRemoveFromCart(product.id);
    } else {
      setQuantity((prev) => {
        const newQuantity = prev - 1;
        if (isAddedToCart) {
          onUpdateCart(product.id, newQuantity);
        }
        return newQuantity;
      });
    }
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    onAddToCart(product, quantity);
    toggleCart();
  };

  const getImageUrl = (imagePath: string) => {
    // If the image path is a full URL, use it as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // If it's a relative path, append it to the base URL
    return `${IMAGE_BASE_URL}${imagePath}`;
  };

  return (
    <div className="pt-16">
      <Navbar
        toggleCart={toggleCart}
        cartItems={cartItems}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
        selectedAddress={selectedAddress}
        onAddressChange={onAddressChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="rounded-lg w-full max-w-md object-cover aspect-square"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Name and Category */}
            <div>
              {product.category && (
                <span className="text-sm text-gray-500 uppercase tracking-wider">
                  {product.category}
                </span>
              )}
              <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg">{product.description}</p>

            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  {product.oldPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.oldPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-red-500">
                      {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Weight/Unit and Shelf Life */}
              <div className="flex flex-col gap-1 text-sm text-gray-600">
                {(product.weight || product.unit) && (
                  <div>
                    {product.weight ? (
                      <span>{product.weight}</span>
                    ) : product.unit ? (
                      <span>Sold per {product.unit}</span>
                    ) : null}
                  </div>
                )}
                {product.shelfLife && (
                  <div>Shelf Life: {product.shelfLife}</div>
                )}
              </div>
            </div>

            {/* Cart Interaction */}
            <div className="pt-4">
              {isAddedToCart ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 flex items-center justify-center p-0"
                      onClick={decrementQuantity}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-lg font-medium select-none">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 flex items-center justify-center p-0"
                      onClick={incrementQuantity}
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-gray-700">
                    Total: ₹{(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ) : (
                <Button
                  size="lg"
                  className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems}
        updateQuantity={onUpdateCart}
        removeFromCart={onRemoveFromCart}
        selectedAddress={selectedAddress}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => navigate('/auth')}
        onPlaceOrder={() => {}}
        addresses={addresses}
        onAddressChange={onAddressChange}
      />
    </div>
  );
};

export default ProductDetails;