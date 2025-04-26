// shopkeeper_pages/OrderDetails.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For development, we'll use a hardcoded seller_id
  // In production, this should come from authentication
  const seller_id = "1";

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/dashboard/order-details/${orderId}?seller_id=${seller_id}`);
        setOrder(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="text-center py-8">
            <div className="animate-pulse text-xl text-gray-600">Loading order details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="text-center py-8">
            <div className="text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="text-center py-8">
            <div className="text-gray-600">No order details found.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>

          {/* Order Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-4">Order Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Order ID</p>
                <p className="font-medium">{order.order_id}</p>
              </div>
              <div>
                <p className="text-gray-600">Order Date</p>
                <p className="font-medium">{order.order_date}</p>
                </div>
              <div>
                <p className="text-gray-600">Order Status</p>
                <p className="font-medium">{order.order_status}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Method</p>
                <p className="font-medium">{order.payment_method}</p>
                </div>
              <div>
                <p className="text-gray-600">Total Amount</p>
                <p className="font-medium">₹{order.order_total}</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-4">Product Details</h3>
            {order.products && order.products.length > 0 ? (
            <div className="space-y-4">
                {order.products.map((product, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Product Name</p>
                        <p className="font-medium">{product.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Category</p>
                        <p className="font-medium">{product.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Subcategory</p>
                        <p className="font-medium">{product.subcategory}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Quantity</p>
                        <p className="font-medium">{product.quantity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Price</p>
                        <p className="font-medium">₹{product.price}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total</p>
                        <p className="font-medium">₹{product.total}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Description</p>
                        <p className="font-medium">{product.description || "No description"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No products found in this order.</p>
            )}
          </div>

          {/* Customer Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-4">Customer Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Customer Name</p>
                <p className="font-medium">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone Number</p>
                <p className="font-medium">{order.phone_number || "N/A"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Delivery Address</p>
                <p className="font-medium">{order.delivery_address || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Status History */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-4">Status History</h3>
            {order.status_history && order.status_history.length > 0 ? (
              <div className="space-y-2">
                {order.status_history.map((status, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">{status.status}</p>
                      <p className="text-sm text-gray-500">
                        Changed by: {status.changed_by} at {new Date(status.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No status history available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}