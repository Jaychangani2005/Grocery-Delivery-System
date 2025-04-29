import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, CheckCircle, XCircle, Clock } from "lucide-react";
import { Order, orderService, CartItem, Address } from "@/services/api";
import { toast } from "sonner";
import CartDrawer from "@/components/CartDrawer";

interface OrdersProps {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  selectedAddress: string;
  onAddressChange: (address: string) => void;
  cartItems: CartItem[];
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  onPlaceOrder: (paymentMethod: string) => void;
  addresses: Address[];
}

const Orders = ({ 
  isLoggedIn, 
  user, 
  onLogout, 
  selectedAddress, 
  onAddressChange,
  cartItems,
  onUpdateCart,
  onRemoveFromCart,
  isCartOpen,
  toggleCart,
  onPlaceOrder,
  addresses
}: OrdersProps) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
      return;
    }
    fetchOrders();
  }, [isLoggedIn, navigate]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      const userData = userStr ? JSON.parse(userStr) : null;
      
      console.log('Auth state:', { 
        hasToken: !!token, 
        hasUser: !!userData,
        userId: userData?.id 
      });
      
      if (!token || !userData?.id) {
        console.warn('Authentication required');
        toast.error("Please log in to view your orders");
        navigate("/auth");
        return;
      }

      console.log('Fetching orders for user:', userData.id);
      const response = await orderService.getOrders();
      
      // Ensure we have valid order data
      if (!Array.isArray(response)) {
        console.error('Invalid response format:', response);
        toast.error("Unable to load orders. Please try again later.");
        setOrders([]);
        return;
      }
      
      // Filter out any invalid orders
      const validOrders = response.filter(order => 
        order && 
        order.id && 
        order.userId === userData.id && 
        order.total && 
        order.status && 
        order.items && 
        Array.isArray(order.items)
      );
      
      console.log('Valid orders:', validOrders);
      setOrders(validOrders);
      
      if (validOrders.length === 0) {
        toast.info("No orders found. Start shopping to place your first order!");
      } else {
        toast.success(`Found ${validOrders.length} order(s)`);
        console.log('Order details:', validOrders.map(order => ({
          id: order.id,
          total: order.total,
          status: order.status,
          items: order.items.length
        })));
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      
      // Handle authentication errors
      if (error.message === 'Authentication token is required' || 
          error.response?.status === 401) {
        toast.error("Your session has expired. Please log in again.");
        navigate("/auth");
        return;
      }
      
      toast.error("Could not load your orders. Please try again later.");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new':
      case 'pending':
        return 'text-yellow-500';
      case 'confirmed':
      case 'preparing':
        return 'text-blue-500';
      case 'ready':
      case 'Out For delivery':
        return 'text-purple-500';
      case 'delivered':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'new':
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'confirmed':
      case 'preparing':
      case 'ready':
      case 'Out For delivery':
        return <Package className="h-5 w-5" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    // Find the order to get its status
    const orderToCancel = orders.find(order => order.id === orderId);
    if (!orderToCancel) {
      toast.error('Order not found');
      return;
    }

    // Check if order can be cancelled
    if (!canCancelOrder(orderToCancel.status)) {
      toast.error(`Order cannot be cancelled in its current state (${orderToCancel.status})`);
      return;
    }

    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to cancel Order #${orderId}?\n` +
      `This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsCancelling(orderId);
      await orderService.cancelOrder(orderId);
      
      // Update the order status in the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' as const }
            : order
        )
      );
      
      toast.success('Order cancelled successfully');
    } catch (error: any) {
      console.error('Error cancelling order:', error);
      
      // If the error is 400, it means the order cannot be cancelled
      if (error.response?.status === 400) {
        const errorMessage = error.response.data?.error || 'Order cannot be cancelled in its current state';
        const currentStatus = error.response.data?.currentStatus;
        
        if (currentStatus) {
          toast.error(`Order cannot be cancelled. Current status: ${currentStatus}`);
        } else {
          toast.error(errorMessage);
        }
        
        // Refresh the orders to get the latest status
        await fetchOrders();
      } else {
        toast.error('Failed to cancel order. Please try again.');
      }
    } finally {
      setIsCancelling(null);
    }
  };

  const canCancelOrder = (status: Order['status']) => {
    const nonCancellableStates = ['out for delivery', 'ready', 'delivered', 'cancelled'];
    return !nonCancellableStates.includes(status.toLowerCase());
  };

  const renderOrderCard = (order: Order) => {
    return (
      <div key={order.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
        {/* Order Header */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
              <p className="text-sm text-gray-500">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  order.status === 'Out For delivery' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
                {canCancelOrder(order.status) && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={isCancelling === order.id}
                    className="ml-2"
                  >
                    {isCancelling === order.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      'Cancel'
                    )}
                  </Button>
                )}
              </div>
              <span className="text-sm text-gray-500 mt-1">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="px-6 py-4">
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-0">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  {(item.product.image_url || item.product.image) ? (
                    <img 
                      src={`http://localhost:5000${item.product.image_url || item.product.image}`}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/placeholder.png';
                        console.log('Image failed to load:', item.product.image_url || item.product.image);
                      }}
                    />
                  ) : (
                    <Package className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                  <p className="text-sm text-gray-500">{item.product.unit}</p>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-gray-900">
                      {item.quantity} × ₹{Number(item.price).toFixed(2)}
                    </p>
                    <span className="mx-2 text-gray-300">|</span>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{(Number(item.quantity) * Number(item.price)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Footer */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Items: {order.items.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-xl font-semibold text-gray-900">₹{Number(order.total).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar
        toggleCart={toggleCart}
        cartItems={cartItems}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
        selectedAddress={selectedAddress}
        onAddressChange={onAddressChange}
        isCartOpen={isCartOpen}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
              className="hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
            <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          </div>
          <Button
            variant="outline"
            className="hover:bg-primary/5"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-500 text-lg">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Package className="h-20 w-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/90"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => renderOrderCard(order))}
          </div>
        )}
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
        onPlaceOrder={onPlaceOrder}
        addresses={addresses}
        onAddressChange={onAddressChange}
      />
    </div>
  );
};

export default Orders; 
