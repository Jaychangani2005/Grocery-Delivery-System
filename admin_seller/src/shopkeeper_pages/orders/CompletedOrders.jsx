import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { FiCheckCircle, FiAlertCircle, FiEye } from 'react-icons/fi';
import PageWrapper from "../../components/PageWrapper";

const CompletedOrders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCompletedOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/dashboard/completed-deliveries?seller_id=${user?.seller_id}`);
      console.log("Completed orders raw data:", response.data);
      console.log("First order data structure:", response.data[0]);
      setOrders(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching completed orders:', err);
      setError('Failed to load completed orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.seller_id) {
      fetchCompletedOrders();
    }
  }, [user?.seller_id]);

  const handleViewOrder = (orderId) => {
    const cleanOrderId = String(orderId).replace('#', '');
    navigate(`/order-details/${cleanOrderId}`);
  };

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
          onClick={() => fetchCompletedOrders()} 
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
                <div className="p-2 bg-green-50 rounded-lg">
                  <FiCheckCircle className="text-green-500" size={24} />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Completed Orders</h2>
              </div>
              <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-50 rounded-full">
                {orders.length} orders
              </span>
            </div>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-4 sm:p-6 text-center">
              <p className="text-gray-500 text-lg">No completed orders at the moment</p>
            </div>
          ) : (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Order #{String(order.id).replace('#', '')}</h4>
                          <p className="text-sm text-gray-500">{order.customer}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Total Amount:</span>
                          <span className="font-medium text-gray-900">₹{order.total}</span>
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
                      </div>

                      <button
                        onClick={() => handleViewOrder(order.id)}
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

export default CompletedOrders; 