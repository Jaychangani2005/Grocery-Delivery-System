import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CartItem, Address, Product } from "@/services/api";
import { MapPin, CreditCard, Loader2, ArrowLeft, Wallet } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
  cartItems: { product: Product; quantity: number }[];
  selectedAddress: string;
  onBack: () => void;
  onPlaceOrder: (paymentMethod: string) => Promise<void>;
  paymentMethod: string;
  isLoading: boolean;
}

const OrderSummary = ({
  cartItems,
  selectedAddress,
  onBack,
  onPlaceOrder,
  paymentMethod,
  isLoading,
}: OrderSummaryProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const userData = userStr ? JSON.parse(userStr) : null;
    
    if (!token || !userData?.id) {
      navigate('/auth');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  const deliveryFee = 30;
  const codFee = paymentMethod === 'cod' ? 30 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + deliveryFee + codFee + tax;

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'cod') {
      setIsProcessing(true);
      try {
        await onPlaceOrder('cod');
        toast.success('Order placed successfully!');
      } catch (error) {
        console.error('Error placing order:', error);
        toast.error('Failed to place order');
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Get Razorpay key from environment variables
      const razorpayKey = 'rzp_test_Zh8vw3mYOkcIBE';
      
      if (!razorpayKey) {
        toast.error('Payment system is not configured. Please contact support.');
        return;
      }

      // Initialize Razorpay
      const options = {
        key: razorpayKey,
        amount: total * 100, // Amount in paise
        currency: "INR",
        name: "ApnaKirana",
        description: "Grocery Order Payment",
        image: "https://your-logo-url.com/logo.png",
        handler: async function (response: any) {
          try {
            setIsProcessing(true);
            await onPlaceOrder('online');
            toast.success('Payment successful! Order placed.');
          } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Payment failed. Please try again.');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#10B981"
        }
      };

      try {
        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error('Error initializing Razorpay:', error);
        toast.error('Payment system is not available. Please try again later.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">Delivery Address</h3>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <p className="text-sm text-gray-600">{selectedAddress}</p>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">Payment Method</h3>
            <div className="flex items-center space-x-2">
              {paymentMethod === 'cod' ? (
                <Wallet className="h-5 w-5 text-gray-500" />
              ) : (
                <CreditCard className="h-5 w-5 text-gray-500" />
              )}
              <p className="text-sm text-gray-600">
                {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
              </p>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">Order Items</h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} × ₹{item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            {codFee > 0 && (
              <div className="flex justify-between text-sm">
                <span>COD Fee</span>
                <span>₹{codFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onBack}
            disabled={isProcessing}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            className="flex-1"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 