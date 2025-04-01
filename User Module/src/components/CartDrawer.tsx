import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BestSellerProduct } from "./BestSellerCard";
import { X, Minus, Plus, ShoppingCart, CreditCard, MapPin, Check, Wallet, QrCode, BanknoteIcon } from "lucide-react";
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
import { useState } from "react";
import { format, addDays, addHours } from "date-fns";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: BestSellerProduct[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  selectedAddress: string;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  updateQuantity,
  selectedAddress,
  isLoggedIn,
  onLoginClick,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'payment' | 'summary'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod' | 'wallet'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      onLoginClick();
      return;
    }
    setCheckoutStep('address');
  };

  const handleProceedToPayment = () => {
    setCheckoutStep('payment');
  };

  const handleProceedToSummary = () => {
    setCheckoutStep('summary');
  };

  const handleBackToCart = () => {
    setCheckoutStep('cart');
  };

  const renderCartItems = () => (
    <div className="flex-1">
      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="space-y-4 p-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 bg-white rounded-lg p-3 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 object-cover rounded-md"
              />
              <div className="flex-1 space-y-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price}</p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600"
                onClick={() => removeFromCart(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total</span>
          <span className="font-bold">₹{calculateTotal().toFixed(2)}</span>
        </div>
        <Button
          className="w-full bg-primary"
          onClick={handleProceedToCheckout}
          disabled={cartItems.length === 0}
        >
          {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
        </Button>
        {!isLoggedIn && cartItems.length > 0 && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Please login to continue with checkout
          </p>
        )}
      </div>
    </div>
  );

  const renderAddressStep = () => (
    <div className="flex-1 p-4">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={handleBackToCart}
      >
        <X className="h-4 w-4 mr-2" /> Back to Cart
      </Button>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Delivery Address</h3>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-600">{selectedAddress}</p>
          </div>
        </div>

        <Button 
          className="w-full bg-primary"
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="flex-1 p-4">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => setCheckoutStep('address')}
      >
        <X className="h-4 w-4 mr-2" /> Back to Address
      </Button>

      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Payment Method</h3>
        </div>

        <ScrollArea className="h-[400px] rounded-md border">
          <div className="p-4">
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value: 'card' | 'upi' | 'cod' | 'wallet') => setPaymentMethod(value)}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Credit/Debit Card</span>
                </Label>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg ml-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        maxLength={3}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center space-x-2">
                  <QrCode className="h-4 w-4" />
                  <span>UPI Payment</span>
                </Label>
              </div>

              {paymentMethod === 'upi' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg ml-6">
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="username@upi"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Enter your UPI ID to proceed with the payment
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4" />
                  <span>Digital Wallet</span>
                </Label>
              </div>

              {paymentMethod === 'wallet' && (
                <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg ml-6">
                  {['PhonePe', 'Paytm', 'Google Pay'].map((wallet) => (
                    <Button
                      key={wallet}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-1"
                    >
                      <img 
                        src={`/${wallet.toLowerCase().replace(' ', '')}-icon.png`}
                        alt={wallet}
                        className="h-6 w-6"
                      />
                      <span className="text-xs">{wallet}</span>
                    </Button>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex items-center space-x-2">
                  <BanknoteIcon className="h-4 w-4" />
                  <span>Cash on Delivery</span>
                </Label>
              </div>

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-gray-50 rounded-lg ml-6">
                  <p className="text-sm text-gray-500">
                    Pay with cash upon delivery. Additional fee of ₹40 will be charged for COD.
                  </p>
                </div>
              )}
            </RadioGroup>
          </div>
        </ScrollArea>

        <Button 
          className="w-full bg-primary"
          onClick={handleProceedToSummary}
        >
          Proceed to Summary
        </Button>
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <div className="flex-1 p-4">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => setCheckoutStep('payment')}
      >
        <X className="h-4 w-4 mr-2" /> Back to Payment
      </Button>

      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Check className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Order Summary</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span>₹40.00</span>
            </div>
            {paymentMethod === 'cod' && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">COD Fee</span>
                <span>₹40.00</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span>₹{(calculateTotal() * 0.18).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{(
                calculateTotal() + 
                40 + // Standard delivery fee
                (paymentMethod === 'cod' ? 40 : 0) + // COD fee if applicable
                calculateTotal() * 0.18 // Tax
              ).toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Delivery Address</span>
            </div>
            <p className="text-sm text-gray-600 pl-6">{selectedAddress}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Payment Method</span>
            </div>
            <p className="text-sm text-gray-600 pl-6">
              {paymentMethod === 'card' ? 'Credit/Debit Card' : 
               paymentMethod === 'upi' ? 'UPI Payment' :
               paymentMethod === 'wallet' ? 'Digital Wallet' :
               'Cash on Delivery'}
            </p>
          </div>

          <Button 
            className="w-full bg-primary"
            onClick={() => {
              // Handle order placement
              onClose();
            }}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="space-y-2 pb-4">
          <SheetTitle className="flex items-center space-x-2">
            {checkoutStep === 'cart' && (
              <>
                <ShoppingCart className="h-5 w-5" />
                <span>Shopping Cart ({cartItems.length})</span>
              </>
            )}
            {checkoutStep === 'address' && (
              <>
                <MapPin className="h-5 w-5" />
                <span>Delivery Address</span>
              </>
            )}
            {checkoutStep === 'payment' && (
              <>
                <CreditCard className="h-5 w-5" />
                <span>Payment Method</span>
              </>
            )}
            {checkoutStep === 'summary' && (
              <>
                <Check className="h-5 w-5" />
                <span>Order Summary</span>
              </>
            )}
          </SheetTitle>
        </SheetHeader>

        {checkoutStep === 'cart' && (
          <>
            {renderCartItems()}
          </>
        )}

        {checkoutStep === 'address' && renderAddressStep()}
        {checkoutStep === 'payment' && renderPaymentStep()}
        {checkoutStep === 'summary' && renderOrderSummary()}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
