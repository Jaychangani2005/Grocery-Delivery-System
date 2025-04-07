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
import { CartItem, Address, orderService } from "@/services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  selectedAddress: string;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onPlaceOrder: () => void;
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
  onPlaceOrder: onPlaceOrderProp,
  addresses = [],
  onAddressChange,
  userId,
}: CartDrawerProps) => {
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 40;
  const codFee = selectedPaymentMethod === 'cod' ? 40 : 0;
  const tax = total * 0.18;
  const finalTotal = total + deliveryFee + codFee + tax;

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "https://placehold.co/300x300/e2e8f0/1e293b?text=No+Image";
    if (imagePath.startsWith('http')) return imagePath;
    // If the image path is relative, prepend the backend URL
    return `http://localhost:5000${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
  };

  // Format address for display
  const formatAddress = (address: Address) => {
    if (!address) return '';
    return `${address.house_no}${address.building_name ? `, ${address.building_name}` : ''}, ${address.street}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`;
  };

  const handleProceedToPayment = () => {
    setShowPaymentMethod(true);
  };

  const handleBackToAddress = () => {
    setShowPaymentMethod(false);
  };

  const handleProceedToSummary = (method: string) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethod(false);
    setShowOrderSummary(true);
  };

  const handleBackToPayment = () => {
    setShowOrderSummary(false);
    setShowPaymentMethod(true);
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      onLoginClick();
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    try {
      setIsPlacingOrder(true);
      const orderData = {
        userId: userId,
        items: cartItems,
        addressId: parseInt(selectedAddress),
        paymentMethod: selectedPaymentMethod,
        total: finalTotal
      };

      console.log("Sending order data:", orderData);
      const response = await orderService.placeOrder(orderData);
      
      toast.success("Order placed successfully!");
      onPlaceOrderProp();
      setShowOrderSummary(false);
      setShowPaymentMethod(false);
    onClose();
      navigate('/orders'); // Redirect to orders page
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const selectedAddressObj = selectedAddress 
    ? addresses.find(addr => addr.address_id?.toString() === selectedAddress)
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
                  {/* Cart items */}
          {cartItems.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4">
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
                        <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                            size="sm"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.productId)}
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
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl transform transition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
      </Button>
          </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4">
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
                        <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
        <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                          >
                            <Plus className="h-4 w-4" />
        </Button>
      <Button
        variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.productId)}
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
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                {selectedPaymentMethod === 'cod' && (
                  <div className="flex justify-between">
                    <span>COD Fee</span>
                    <span>₹{codFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
              </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address</label>
                  {addresses.length > 0 ? (
                    <select
                      value={selectedAddress || ""}
                      onChange={(e) => onAddressChange(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select an address</option>
                      {addresses.map((address, index) => (
                        <option 
                          key={`address-${address.address_id || `temp-${index}`}`} 
                          value={address.address_id?.toString() || ""}
                        >
                          {formatAddress(address)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-center py-4 border rounded">
                      <p className="text-gray-500 mb-2">No addresses saved</p>
                      <Link to="/addresses" className="text-primary hover:underline flex items-center justify-center gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Add a new address
                      </Link>
                </div>
              )}
                </div>

        <Button 
                  className="w-full"
                  onClick={handleProceedToPayment}
                  disabled={!selectedAddress || cartItems.length === 0}
                >
                  Proceed to Payment
      </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPaymentMethod && (
        <PaymentMethod
          onBack={handleBackToAddress}
          onProceed={handleProceedToSummary}
        />
      )}

      {showOrderSummary && selectedAddressObj && (
        <OrderSummary
          cartItems={cartItems}
          selectedAddress={selectedAddressObj}
          onBack={handleBackToPayment}
          onPlaceOrder={handlePlaceOrder}
          paymentMethod={selectedPaymentMethod}
          isLoading={isPlacingOrder}
        />
      )}
    </>
  );
};

export default CartDrawer;
