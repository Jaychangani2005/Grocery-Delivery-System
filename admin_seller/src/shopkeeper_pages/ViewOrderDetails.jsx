// shopkeeper_pages/OrderDetails.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SellerNavbar from "../components/SellerNavbar";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/dashboard/order-details/${orderId}`);
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
        <SellerNavbar />
        <div className="mt-20 p-6">
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
        <SellerNavbar />
        <div className="mt-20 p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <SellerNavbar />
      <div className="mt-20 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
            >
              Back to Orders
            </button>
          </div>

          {/* Order Information */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Order Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Order ID:</span> #{order.order_id}</p>
                  <p><span className="font-medium">Order Date:</span> {new Date(order.order_date).toLocaleString()}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                      order.order_status === 'Delivered' ? 'bg-green-200 text-green-700' :
                      order.order_status === 'Pending' ? 'bg-yellow-200 text-yellow-700' :
                      order.order_status === 'Out For delivery' ? 'bg-blue-200 text-blue-700' :
                      'bg-purple-200 text-purple-700'
                    }`}>
                      {order.order_status}
                    </span>
                  </p>
                  <p><span className="font-medium">Payment Method:</span> {order.payment_status}</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {order.customer_name}</p>
                  <p><span className="font-medium">Phone:</span> {order.phone_number || 'N/A'}</p>
                  <p><span className="font-medium">Delivery Address:</span> {order.delivery_address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Product Details</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p><span className="font-medium">Product Name:</span> {order.product_name}</p>
                <p><span className="font-medium">Category:</span> {order.category}</p>
                <p><span className="font-medium">Subcategory:</span> {order.subcategory || 'N/A'}</p>
                <p><span className="font-medium">Description:</span> {order.description}</p>
                <p><span className="font-medium">Quantity:</span> {order.quantity}</p>
                <p><span className="font-medium">Price per unit:</span> ₹{order.price}</p>
                <p><span className="font-medium">Total Price:</span> ₹{order.total_price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}