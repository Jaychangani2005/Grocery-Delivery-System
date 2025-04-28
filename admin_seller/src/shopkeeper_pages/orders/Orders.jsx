import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { FiPackage, FiAlertCircle, FiEye, FiFilter } from 'react-icons/fi';
import PageWrapper from "../../components/PageWrapper";

const Orders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/dashboard/seller-orders?seller_id=${user?.seller_id}`);
      console.log("Orders data:", response.data);
      
      // Process the orders data to include product details
      const processedOrders = response.data.map(order => {
        const productDetails = order.product_details ? order.product_details.split(';;').map(product => {
          const [name, quantity, price, total] = product.split('|');
          return { name, quantity: parseInt(quantity), price: parseFloat(price), total: parseFloat(total) };
        }) : [];
        
        const statusHistory = order.status_history ? order.status_history.split(';;').map(status => {
          const [newStatus, changedBy, timestamp] = status.split('|');
          return { status: newStatus, changedBy, timestamp: new Date(timestamp) };
        }) : [];

        return {
          ...order,
          productDetails,
          statusHistory,
          total_amount: order.order_total || order.total
        };
      });

      setOrders(processedOrders);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.seller_id) {
      fetchOrders();
    }
  }, [user?.seller_id]);

  const handleViewOrder = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
      case 'out for delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === selectedStatus.toLowerCase());

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <FiAlertCircle className="mx-auto text-red-500" size={48} />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">Error Loading Orders</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <button 
          onClick={() => fetchOrders()} 
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FiPackage className="text-blue-500" size={24} />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">All Orders</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FiFilter className="text-gray-400" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Orders</option>
                    <option value="new">New</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 rounded-full">
                  {filteredOrders.length} orders
                </span>
              </div>
            </div>
          </div>
          
          {filteredOrders.length === 0 ? (
            <div className="p-4 sm:p-6 text-center">
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          ) : (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredOrders.map((order) => (
                  <div 
                    key={order.order_id} 
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Order #{order.order_id}</h4>
                          <p className="text-sm text-gray-500">{order.customer_name || 'Customer'}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Total Amount:</span>
                          <span className="font-medium text-gray-900">₹{order.total_amount}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Date:</span>
                          <span className="text-gray-900">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Payment:</span>
                          <span className="text-gray-900 capitalize">{order.payment_method}</span>
                        </div>
                        {order.productDetails && order.productDetails.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <p className="text-sm text-gray-500 mb-1">Products:</p>
                            <div className="space-y-1">
                              {order.productDetails.map((product, index) => (
                                <div key={index} className="text-sm">
                                  <span className="text-gray-600">{product.name}</span>
                                  <span className="text-gray-500"> x{product.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleViewOrder(order.order_id)}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 border border-green-200 rounded-md hover:bg-green-50 transition-colors"
                      >
                        <FiEye className="mr-2" size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Orders; 