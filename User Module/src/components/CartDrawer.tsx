import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Minus, Plus, ShoppingCart, CreditCard, MapPin, Check, Wallet, QrCode, BanknoteIcon, PlusCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { format, addDays, addHours } from "date-fns";
import { CartItem, Address, orderService, Product } from "@/services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { product: Product; quantity: number }[];
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  selectedAddress: string;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onPlaceOrder: (paymentMethod: string) => void;
  addresses: Address[];
  onAddressChange: (address: string) => void;
  userId?: number;
}

const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  selectedAddress,
  isLoggedIn,
  onLoginClick,
  onPlaceOrder,
  addresses,
  onAddressChange,
  userId,
}: CartDrawerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cod' | 'online'>('cod');
  const navigate = useNavigate();
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handlePlaceOrder = async (paymentMethod: string) => {
    if (!isLoggedIn) {
      onLoginClick();
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    setIsLoading(true);
    try {
      await onPlaceOrder(paymentMethod);
      setShowOrderSummary(false);
      onClose();
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error("Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);
  const deliveryFee = 30;
  const codFee = selectedPaymentMethod === 'cod' ? 30 : 0;
  const tax = total * 0.18;
  const finalTotal = total + deliveryFee + codFee + tax;

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "https://placehold.co/300x300/e2e8f0/1e293b?text=No+Image";
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.replace(/^\/+/, '');
    return `http://localhost:5000/${cleanPath}`;
  };

  // Format address for display
  const formatAddress = (address: Address) => {
    if (!address) return '';
    return `${address.house_no}${address.building_name ? `, ${address.building_name}` : ''}, ${address.street}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`;
  };

  const selectedAddressObj = selectedAddress && addresses.length > 0
    ? addresses.find(addr => addr && addr.address_id && addr.address_id.toString() === selectedAddress)
    : undefined;

  // Early return if not logged in
  if (!isLoggedIn) {
    return (
      <Sheet open={isOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4">
                      <img
                        src={getImageUrl(item.product.image)}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/300x300/e2e8f0/1e293b?text=No+Image";
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">₹{item.product.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold">₹{total.toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={onLoginClick}>
                Login to Checkout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-4">
                Add items to your cart to continue shopping
              </p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-20 h-20">
                    <img
                      src={getImageUrl(item.product.image)}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/300x300/e2e8f0/1e293b?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.product.unit}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-4">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Delivery Address</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/addresses')}
                  className="text-primary"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  {addresses.length > 0 ? 'Change' : 'Add'}
                </Button>
              </div>
              {addresses.length > 0 ? (
                <select
                  value={selectedAddress || ''}
                  onChange={(e) => onAddressChange(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select an address</option>
                  {addresses.map((address, index) => (
                    <option 
                      key={address?.address_id || index} 
                      value={address?.address_id?.toString() || ''}
                    >
                      {address ? formatAddress(address) : 'Invalid address'}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-center py-4 border rounded-md">
                  <p className="text-gray-500">No addresses saved</p>
                  <Button
                    variant="link"
                    onClick={() => navigate('/addresses')}
                    className="text-primary"
                  >
                    Add a new address
                  </Button>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Payment Method</h3>
              <div className="flex space-x-4">
                <Button
                  variant={selectedPaymentMethod === 'cod' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setSelectedPaymentMethod('cod')}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  COD
                </Button>
                <Button
                  variant={selectedPaymentMethod === 'online' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setSelectedPaymentMethod('online')}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Online
                </Button>
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-bold">₹{total.toFixed(2)}</span>
            </div>
            <Button
              className="w-full"
              onClick={() => setShowOrderSummary(true)}
              disabled={isLoading || !isLoggedIn || !selectedAddress}
            >
              {isLoading ? "Processing..." : "Proceed to Checkout"}
            </Button>
          </div>
        )}
      </div>

      {showOrderSummary && (
        <OrderSummary
          cartItems={cartItems}
          selectedAddress={selectedAddress}
          onBack={() => setShowOrderSummary(false)}
          onPlaceOrder={handlePlaceOrder}
          paymentMethod={selectedPaymentMethod}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default CartDrawer;
