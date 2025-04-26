import { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiCalendar } from "react-icons/fi";
import SellerNavbar from "../components/SellerNavbar";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PageWrapper from "../components/PageWrapper";

// Create an axios instance with a timeout
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'out for delivery':
      return 'bg-blue-100 text-blue-800';
    case 'new':
      return 'bg-purple-100 text-purple-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const OrderManagement = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigate = useNavigate();

  // For development, we'll use a hardcoded seller_id
  // In production, this should come from authentication
  const seller_id = "1";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const url = `/dashboard/seller-orders?seller_id=${seller_id}`;
        console.log("Fetching orders from:", url);
        
        const response = await api.get(url);
        console.log("API Response:", response.data);
        
        if (response.status === 200) {
          if (Array.isArray(response.data)) {
        setOrders(response.data);
          } else if (response.data && typeof response.data === 'object') {
            const ordersArray = response.data.orders || response.data.data || [];
            console.log("Extracted orders array:", ordersArray);
            setOrders(Array.isArray(ordersArray) ? ordersArray : []);
          } else {
            console.error("Invalid response format:", response.data);
            setOrders([]);
            setError("Invalid data format received from server");
          }
        } else {
          throw new Error(`Server returned status ${response.status}`);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(`Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`);
        } else if (err.request) {
          // The request was made but no response was received
          setError("No response from server. Please make sure the backend server is running on port 5000.");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`Error: ${err.message}`);
        }
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [seller_id]);

  // Filter Orders
  const filteredOrders = Array.isArray(orders) ? orders.filter((order) => {
    console.log("Filtering order:", order);
    return (
      (order.customer_name?.toLowerCase().includes(search.toLowerCase()) || 
       order.order_id?.toString().includes(search) ||
       order.products?.some(product => product.name.toLowerCase().includes(search.toLowerCase()))) &&
      (filter === "all" || 
       (filter === "week" && isWithinWeek(order.created_at)) || 
       (filter === "month" && isWithinMonth(order.created_at)) ||
       (filter === "custom" && isWithinDateRange(order.created_at)))
    );
  }) : [];

  function isWithinWeek(date) {
    if (!date) return false;
    const orderDate = new Date(date);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return orderDate >= oneWeekAgo;
  }

  function isWithinMonth(date) {
    if (!date) return false;
    const orderDate = new Date(date);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return orderDate >= oneMonthAgo;
  }

  function isWithinDateRange(date) {
    if (!startDate || !endDate) return false;
    
    // Convert dates to start and end of day for proper comparison
    const orderDate = new Date(date);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    return orderDate >= start && orderDate <= end;
  }

  const handleViewDetails = (orderId) => {
    navigate(`/view-order-details/${orderId}`);
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      await api.put(`/dashboard/update-order-status/${orderId}`, {
        status: 'pending'
      });
      // Refresh orders after status update
      const url = `/dashboard/orders?seller_id=${seller_id}`;
      const response = await api.get(url);
      setOrders(response.data);
    } catch (err) {
      console.error("Error accepting order:", err);
      alert("Failed to accept order. Please try again.");
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      await api.put(`/dashboard/update-order-status/${orderId}`, {
        status: 'delivered'
      });
      // Refresh orders after status update
      const url = `/dashboard/orders?seller_id=${seller_id}`;
      const response = await api.get(url);
      setOrders(response.data);
    } catch (err) {
      console.error("Error completing order:", err);
      alert("Failed to complete order. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Order Management Section */}
        <div className="mt-20 p-4 sm:p-6">
          <Section title="Order Management">
            {/* Search Bar and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
              <div className="w-full sm:w-auto flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm">
                <FiSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search by customer name, order ID, or product..."
                  className="outline-none w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Date Filters */}
              <div className="w-full sm:w-auto flex flex-wrap gap-2">
                <button onClick={() => setFilter("all")} className={getButtonStyle(filter === "all")}>All</button>
                <button onClick={() => setFilter("week")} className={getButtonStyle(filter === "week")}>Last Week</button>
                <button onClick={() => setFilter("month")} className={getButtonStyle(filter === "month")}>Last Month</button>
                <div className="relative">
                  <button 
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className={`flex items-center px-4 py-2 rounded-lg transition ${filter === "custom" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-orange-300"}`}
                  >
                    <FiCalendar className="mr-2" /> Select Date
                  </button>
                  {showDatePicker && (
                    <div className="absolute right-0 mt-2 bg-white p-4 rounded-lg shadow-lg z-10 w-full sm:w-auto">
                      <div className="flex flex-col gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Start Date</label>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                              setStartDate(date);
                              setFilter("custom");
                            }}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            maxDate={new Date()}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">End Date</label>
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => {
                              setEndDate(date);
                              setFilter("custom");
                            }}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            maxDate={new Date()}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <button
                          onClick={() => {
                            setShowDatePicker(false);
                            if (!startDate || !endDate) {
                              setFilter("all");
                            }
                          }}
                          className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Status Sections */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-pulse text-xl text-gray-600">Loading orders...</div>
              </div>
            ) : error ? (
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
            ) : (
              <div className="space-y-6">
                {/* New Orders Section */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">New Orders</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredOrders
                      .filter(order => order.status.toLowerCase() === 'new')
                      .map(order => (
                        <OrderCard 
                          key={order.order_id} 
                          order={order} 
                          onView={() => handleViewDetails(order.order_id)}
                          onAccept={() => handleAcceptOrder(order.order_id)}
                        />
                      ))}
                  </div>
                </div>

                {/* Pending Orders Section */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Orders</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredOrders
                      .filter(order => order.status.toLowerCase() === 'pending')
                      .map(order => (
                        <OrderCard 
                          key={order.order_id} 
                          order={order} 
                          onView={() => handleViewDetails(order.order_id)}
                          onComplete={() => handleCompleteOrder(order.order_id)}
                        />
                      ))}
                  </div>
                </div>

                {/* Out for Delivery Orders Section */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Out for Delivery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredOrders
                      .filter(order => order.status.toLowerCase() === 'out for delivery')
                      .map(order => (
                        <OrderCard 
                          key={order.order_id} 
                          order={order} 
                          onView={() => handleViewDetails(order.order_id)}
                        />
                      ))}
                  </div>
                </div>

                {/* Completed Orders Section */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Completed Orders</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredOrders
                      .filter(order => order.status.toLowerCase() === 'delivered')
                      .map(order => (
                        <OrderCard 
                          key={order.order_id} 
                          order={order} 
                          onView={() => handleViewDetails(order.order_id)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}
          </Section>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderManagement;

/* Order Card Component */
const OrderCard = ({ order, onView, onAccept, onComplete }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Order #{order.order_id}</h4>
          <p className="text-sm text-gray-500">{order.customer_name}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        {order.products && order.products.map((product, index) => (
          <div key={index} className="text-sm">
            <span className="font-medium">{product.name}</span>
            <span className="text-gray-500"> x{product.quantity}</span>
            <span className="text-gray-600"> - ₹{product.total}</span>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 mb-4">
        {new Date(order.created_at).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onView}
          className="flex-1 px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-900 border border-indigo-200 rounded-md hover:bg-indigo-50"
        >
          View Details
        </button>
        {onAccept && (
          <button
            onClick={onAccept}
            className="flex-1 px-3 py-2 text-sm font-medium text-green-600 hover:text-green-900 border border-green-200 rounded-md hover:bg-green-50"
          >
            Accept
          </button>
        )}
        {onComplete && (
          <button
            onClick={onComplete}
            className="flex-1 px-3 py-2 text-sm font-medium text-orange-600 hover:text-orange-900 border border-orange-200 rounded-md hover:bg-orange-50"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  </div>
);

/* Page Section */
const Section = ({ title, children }) => (
  <section>
    <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);

/* Responsive Table */
const ResponsiveTable = ({ headers, data, renderRow, isActionColumn = false }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-orange-100 text-gray-700">
          {headers.map((header, index) => (
            <th key={index} className="p-3 text-left">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={headers.length} className="text-center py-4 text-gray-500">
              No orders found
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr key={index} className="border-t bg-orange-50 hover:bg-orange-100 transition">
              {renderRow(item)}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

/* Action Button */
const ActionButton = ({ text, color, onClick }) => {
  const colors = {
    gray: "bg-gray-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500"
  };

  return (
    <button 
      className={`${colors[color]} text-white px-3 py-1 rounded-full text-sm transition hover:opacity-80`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

/* Utility Functions */
const getButtonStyle = (active) => 
  `px-4 py-2 rounded-lg transition ${active ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-orange-300"}`;