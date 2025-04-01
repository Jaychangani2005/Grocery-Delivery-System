import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BestSellerProduct } from "@/components/BestSellerCard";
import { Package, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface OrdersProps {
  cartItems: BestSellerProduct[];
  toggleCart: () => void;
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  selectedAddress: string;
  onAddressChange: (address: string) => void;
}

// Mock data for orders
const mockOrders = [
  {
    id: "ORD001",
    date: new Date(2024, 2, 15),
    status: "Delivered",
    total: 156.85,
    items: [
      { name: "Wheat Flour", quantity: 2, price: 45.99 },
      { name: "Basmati Rice", quantity: 1, price: 64.87 },
    ],
    deliveryAddress: "123, Green Valley Road, Mumbai, Maharashtra - 400001",
  },
  {
    id: "ORD002",
    date: new Date(2024, 2, 10),
    status: "Processing",
    total: 89.97,
    items: [
      { name: "Toor Dal", quantity: 3, price: 29.99 },
    ],
    deliveryAddress: "456, Business Park, Sector 5, Mumbai, Maharashtra - 400002",
  },
  {
    id: "ORD003",
    date: new Date(2024, 2, 5),
    status: "Delivered",
    total: 234.65,
    items: [
      { name: "Olive Oil", quantity: 1, price: 189.99 },
      { name: "Tea Bags", quantity: 2, price: 22.33 },
    ],
    deliveryAddress: "789, Lake View Apartments, Mumbai, Maharashtra - 400003",
  },
];

const Orders: React.FC<OrdersProps> = ({
  cartItems,
  toggleCart,
  isLoggedIn,
  user,
  onLogout,
  selectedAddress,
  onAddressChange,
}) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        toggleCart={toggleCart}
        cartItems={cartItems}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
        selectedAddress={selectedAddress}
        onAddressChange={onAddressChange}
      />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">My Orders</h1>
          </div>

          {mockOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
              <p className="text-gray-500 mb-4">Start shopping to create your first order</p>
              <Button onClick={() => navigate("/")} className="bg-primary">
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">
                        Placed {formatDistanceToNow(order.date)} ago
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/90"
                        onClick={() => {
                          // Handle order details view
                        }}
                      >
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-gray-900">₹{item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total</span>
                        <span className="text-lg font-bold">₹{order.total.toFixed(2)}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-1">Delivery Address:</p>
                        <p>{order.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders; 