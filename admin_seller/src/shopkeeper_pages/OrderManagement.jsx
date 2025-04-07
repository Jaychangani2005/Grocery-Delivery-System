import { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiCalendar } from "react-icons/fi";
import SellerNavbar from "../components/SellerNavbar";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

export default function OrderManagement() {
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
    <div className="bg-gray-50 min-h-screen">
      <SellerNavbar />

      {/* Order Management Section */}
      <div className="mt-20 p-6">
        <Section title="Order History">
          {/* Search Bar and Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            <div className="w-full md:w-auto flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 shadow-md">
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
            <div className="w-full md:w-auto flex flex-wrap gap-2">
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
                  <div className="absolute right-0 mt-2 bg-white p-4 rounded-lg shadow-lg z-10">
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

          {/* Order Table */}
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
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.order_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.order_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <p className="font-medium">{order.customer_name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="max-w-xs">
                          {order.products && order.products.map((product, index) => (
                            <div key={index} className="mb-1 last:mb-0">
                              <span className="font-medium">{product.name}</span>
                              <span className="text-gray-400"> x{product.quantity}</span>
                              <span className="text-gray-500"> - ₹{product.total}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                        })}
                  </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(order.order_id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
                          </button>
                          {order.status === 'new' && (
                            <button
                              onClick={() => handleAcceptOrder(order.order_id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Accept
                            </button>
                          )}
                          {order.status === 'pending' && (
                            <button
                              onClick={() => handleCompleteOrder(order.order_id)}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                  </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No orders found
                </div>
              )}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

/* Page Section */
const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="bg-white shadow-md rounded-lg mt-4 p-4">{children}</div>
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