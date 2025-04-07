import React from "react";
import { Button } from "@/components/ui/button";
import { CartItem, Address } from "@/services/api";
import { MapPin, CreditCard, Loader2 } from "lucide-react";

interface OrderSummaryProps {
  cartItems: CartItem[];
  selectedAddress: Address;
  onBack: () => void;
  onPlaceOrder: () => void;
  paymentMethod: string;
  isLoading?: boolean;
}

export default function OrderSummary({
  cartItems,
  selectedAddress,
  onBack,
  onPlaceOrder,
  paymentMethod,
  isLoading = false,
}: OrderSummaryProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 40;
  const codFee = paymentMethod === 'cod' ? 40 : 0;
  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + deliveryFee + codFee + tax;

  const formatAddress = (address: Address) => {
    return `${address.house_no}${address.building_name ? `, ${address.building_name}` : ''}, ${address.street}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`;
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'upi':
        return 'UPI Payment';
      case 'wallet':
        return 'Digital Wallet';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return 'Unknown Payment Method';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-6">
            {/* Order Items */}
            <div>
              <h3 className="font-medium mb-3">Items</h3>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Delivery Address
              </h3>
              <p className="text-sm text-gray-600">{formatAddress(selectedAddress)}</p>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Method
              </h3>
              <p className="text-sm text-gray-600">{getPaymentMethodLabel(paymentMethod)}</p>
            </div>

            {/* Bill Details */}
            <div>
              <h3 className="font-medium mb-3">Bill Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between">
                    <span>COD Fee</span>
                    <span>₹{codFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onBack}
              disabled={isLoading}
            >
              Back to Payment
            </Button>
            <Button
              className="flex-1"
              onClick={onPlaceOrder}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                'Place Order'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 