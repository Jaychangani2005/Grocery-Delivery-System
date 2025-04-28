// shopkeeper_pages/OrderDetails.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { FiCheck, FiX, FiPackage, FiUser, FiMapPin, FiClock } from "react-icons/fi";
import PageWrapper from "../components/PageWrapper";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/dashboard/order-details/${orderId}`, {
          params: { seller_id: user?.seller_id }
        });
        setOrder(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.seller_id) {
      fetchOrderDetails();
    }
  }, [orderId, user?.seller_id]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      console.log(`Updating order ${orderId} status to ${newStatus} for seller ${user?.seller_id}`);
      const response = await axios.put(`http://localhost:5000/api/dashboard/update-order-status/${orderId}`, {
        status: newStatus,
        seller_id: user?.seller_id
      });
      console.log('Update response:', response.data);
      
      // Refresh order details
      const detailsResponse = await axios.get(`http://localhost:5000/api/dashboard/order-details/${orderId}`, {
        params: { seller_id: user?.seller_id }
      });
      console.log('Updated order details:', detailsResponse.data);
      setOrder(detailsResponse.data);
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status. Please try again.');
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">{error}</div>
        </div>
      </PageWrapper>
    );
  }

  if (!order) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-500">No order found.</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
            </div>
          </div>

          {/* Order Status Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <FiPackage className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Order #{order.order_id}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(order.order_date).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                {order.order_status === 'new' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus('pending')}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
                    >
                      <FiCheck className="mr-2" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('cancelled')}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
                    >
                      <FiX className="mr-2" />
                      Deny
                    </button>
                  </>
                )}
                {order.order_status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus('Out For delivery')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <FiPackage className="mr-2" />
                    Start Delivery
                  </button>
                )}
                {order.order_status === 'Out For delivery' && (
                  <button
                    onClick={() => handleUpdateStatus('delivered')}
                    className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center"
                  >
                    <FiCheck className="mr-2" />
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FiUser className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{order.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{order.phone_number}</p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <FiMapPin className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
              </div>
              <p className="text-gray-700">{order.delivery_address}</p>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <FiClock className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
              </div>
              <div className="space-y-4">
                {order.products.map((product, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.quantity} × ₹{product.price}
                      </p>
                    </div>
                    <p className="font-medium">₹{product.total}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4">
                  <p className="text-lg font-semibold">Total Amount</p>
                  <p className="text-lg font-semibold text-orange-500">₹{order.order_total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderDetails;