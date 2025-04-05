import { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiCalendar } from "react-icons/fi";
import SellerNavbar from "../components/SellerNavbar";
import { useNavigate } from "react-router-dom";

export default function OrderManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // For development, we'll use a hardcoded seller_id
  // In production, this should come from authentication
  const seller_id = "1";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/dashboard/orders?seller_id=${seller_id}`);
        setOrders(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please make sure the backend server is running.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [seller_id]);

  // Filter Orders
  const filteredOrders = orders.filter((order) =>
    (order.customer?.toLowerCase().includes(search.toLowerCase()) || order.id?.toString().includes(search)) &&
    (filter === "all" || (filter === "week" && isWithinWeek(order.created_at)) || (filter === "month" && isWithinMonth(order.created_at)))
  );

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

  const handleViewDetails = (orderId) => {
    navigate(`/view-order-details/${orderId}`);
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/dashboard/update-order-status/${orderId}`, {
        status: 'pending'
      });
      // Refresh orders after status update
      const response = await axios.get(`http://localhost:5000/api/dashboard/orders?seller_id=${seller_id}`);
      setOrders(response.data);
    } catch (err) {
      console.error("Error accepting order:", err);
      alert("Failed to accept order. Please try again.");
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/dashboard/update-order-status/${orderId}`, {
        status: 'delivered'
      });
      // Refresh orders after status update
      const response = await axios.get(`http://localhost:5000/api/dashboard/orders?seller_id=${seller_id}`);
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
                placeholder="Search by customer name or order ID..."
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
              <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                <FiCalendar className="mr-2" /> Select Date
              </button>
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
            <ResponsiveTable
              headers={["Order ID", "Customer", "Address", "Date", "Status", "Actions"]}
              data={filteredOrders}
              renderRow={(order) => (
                <>
                  <td className="p-3">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.address}</td>
                  <td>{order.created_at ? new Date(order.created_at.replace(' ', 'T')).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  }) : 'N/A'}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <ActionButton 
                      text="View Details" 
                      color="blue" 
                      onClick={() => handleViewDetails(order.id)}
                    />
                    {order.status === 'New' && (
                      <ActionButton 
                        text="Accept" 
                        color="green" 
                        onClick={() => handleAcceptOrder(order.id)}
                      />
                    )}
                    {order.status === 'Pending' && (
                      <ActionButton 
                        text="Complete" 
                        color="orange" 
                        onClick={() => handleCompleteOrder(order.id)}
                      />
                    )}
                  </td>
                </>
              )}
              isActionColumn
            />
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

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-200 text-green-700';
    case 'Pending':
      return 'bg-yellow-200 text-yellow-700';
    case 'Out For delivery':
      return 'bg-blue-200 text-blue-700';
    case 'New':
      return 'bg-purple-200 text-purple-700';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};