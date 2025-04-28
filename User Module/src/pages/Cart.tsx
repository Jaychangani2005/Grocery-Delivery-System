import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CartItem, Product } from '@/services/api';

interface CartProps {
  cartItems: CartItem[];
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  isLoggedIn: boolean;
  user: { id: number; name: string; email: string } | null;
  onLogout: () => void;
  selectedAddress: string;
  onAddressChange: (address: string) => void;
  onPlaceOrder: (paymentMethod: string, orderData: any) => void;
}

const Cart = ({
  cartItems,
  onUpdateCart,
  onRemoveFromCart,
  isLoggedIn,
  user,
  onLogout,
  selectedAddress,
  onAddressChange,
  onPlaceOrder
}: CartProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      onRemoveFromCart(productId);
    } else {
      onUpdateCart(productId, newQuantity);
    }
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsLoading(true);
    try {
      const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const deliveryFee = 30;
      const codFee = 30; // Assuming COD is the default payment method
      const tax = subtotal * 0.18;
      const total = subtotal + deliveryFee + codFee + tax;

      const items = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }));

      const orderData = {
        userId: user?.id,
        items,
        addressId: selectedAddress,
        paymentMethod: 'cod',
        subtotal,
        deliveryFee,
        codFee,
        tax,
        total
      };

      await onPlaceOrder('cod', orderData);
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <Button onClick={() => navigate('/')}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.product.description}</p>
                      <div className="mt-2 flex items-center">
                        <Label htmlFor={`quantity-${item.id}`} className="mr-2">Quantity:</Label>
                        <Input
                          id={`quantity-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          className="w-20"
                        />
                        <Button
                          variant="ghost"
                          onClick={() => onRemoveFromCart(item.id)}
                          className="ml-4"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="ml-6">
                      <p className="text-lg font-medium text-gray-900">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-900">₹30.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">COD Fee</span>
                    <span className="text-gray-900">₹30.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18%)</span>
                    <span className="text-gray-900">₹{(total * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-lg font-medium text-gray-900">
                        ₹{(total + 60 + (total * 0.18)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isLoading || !isLoggedIn || !selectedAddress}
                    className="w-full"
                  >
                    {isLoading ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;