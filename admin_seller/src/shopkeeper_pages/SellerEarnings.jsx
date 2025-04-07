import { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiCalendar, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import SellerNavbar from "../components/SellerNavbar";
import { useNavigate } from "react-router-dom";

// Create an axios instance with a timeout
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds timeout
});

export default function SellerEarnings() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [summary, setSummary] = useState({
    totalEarnings: 0,
    todayEarnings: 0,
    weekEarnings: 0,
    monthEarnings: 0
  });
  const navigate = useNavigate();

  // For development, we'll use a hardcoded seller_id
  // In production, this should come from authentication
  const seller_id = "1";

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get(`/dashboard/addresses?seller_id=${seller_id}`);
        setAddresses(response.data);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };

    fetchAddresses();
  }, [seller_id]);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        setLoading(true);
        const url = `/dashboard/earnings?seller_id=${seller_id}${selectedAddress ? `&address_id=${selectedAddress}` : ''}`;
        const response = await api.get(url);
        console.log('Earnings Response:', response.data);
        console.log('Earnings Array:', response.data.earnings);
        console.log('Summary:', response.data.summary);
        setEarnings(response.data.earnings || []);
        setSummary(response.data.summary || {
          totalEarnings: 0,
          todayEarnings: 0,
          weekEarnings: 0,
          monthEarnings: 0
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching earnings:", err);
        setError("Failed to load earnings. Please make sure the backend server is running.");
        setEarnings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [seller_id, selectedAddress]);

  // Filter Earnings
  const filteredEarnings = earnings?.filter((earning) =>
    earning && earning.order_id && 
    (earning.order_id.toString().includes(search)) &&
    (filter === "all" || 
     (filter === "today" && isToday(earning.created_at)) || 
     (filter === "week" && isWithinWeek(earning.created_at)) || 
     (filter === "month" && isWithinMonth(earning.created_at)))
  ) || [];

  console.log('Filtered Earnings:', filteredEarnings);

  function isToday(date) {
    if (!date) return false;
    const today = new Date();
    const earningDate = new Date(date);
    return (
      earningDate.getDate() === today.getDate() &&
      earningDate.getMonth() === today.getMonth() &&
      earningDate.getFullYear() === today.getFullYear()
    );
  }

  function isWithinWeek(date) {
    if (!date) return false;
    const earningDate = new Date(date);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return earningDate >= oneWeekAgo;
  }

  function isWithinMonth(date) {
    if (!date) return false;
    const earningDate = new Date(date);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return earningDate >= oneMonthAgo;
  }

  const handleViewOrderDetails = (orderId) => {
    navigate(`/view-order-details/${orderId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SellerNavbar />

      {/* Earnings Section */}
      <div className="mt-20 p-6">
        <Section title="Earnings Summary">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <SummaryCard 
              title="Total Earnings" 
              value={`₹${Number(summary.totalEarnings || 0).toFixed(2)}`} 
              icon={<FiDollarSign className="h-6 w-6" />} 
              color="bg-blue-500"
            />
            <SummaryCard 
              title="Today's Earnings" 
              value={`₹${Number(summary.todayEarnings || 0).toFixed(2)}`} 
              icon={<FiTrendingUp className="h-6 w-6" />} 
              color="bg-green-500"
            />
            <SummaryCard 
              title="This Week" 
              value={`₹${Number(summary.weekEarnings || 0).toFixed(2)}`} 
              icon={<FiCalendar className="h-6 w-6" />} 
              color="bg-purple-500"
            />
            <SummaryCard 
              title="This Month" 
              value={`₹${Number(summary.monthEarnings || 0).toFixed(2)}`} 
              icon={<FiCalendar className="h-6 w-6" />} 
              color="bg-orange-500"
            />
          </div>
        </Section>

        <Section title="Earnings History">
          {/* Search Bar and Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            <div className="w-full md:w-auto flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 shadow-md">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search by order ID..."
                className="outline-none w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Address Filter */}
            <div className="w-full md:w-auto">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                <option value="">All Addresses</option>
                {addresses.map((address) => (
                  <option key={address.address_id} value={address.address_id}>
                    {address.area}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filters */}
            <div className="w-full md:w-auto flex flex-wrap gap-2">
              <button onClick={() => setFilter("all")} className={getButtonStyle(filter === "all")}>All</button>
              <button onClick={() => setFilter("today")} className={getButtonStyle(filter === "today")}>Today</button>
              <button onClick={() => setFilter("week")} className={getButtonStyle(filter === "week")}>Last Week</button>
              <button onClick={() => setFilter("month")} className={getButtonStyle(filter === "month")}>Last Month</button>
            </div>
          </div>

          {/* Earnings Table */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-pulse text-xl text-gray-600">Loading earnings...</div>
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
              headers={["Order ID", "Date", "Items", "Amount", "Commission", "Net Earnings", "Actions"]}
              data={filteredEarnings}
              renderRow={(earning) => (
                <>
                  <td className="p-3">{earning.order_id}</td>
                  <td>{earning.created_at ? new Date(earning.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  }) : 'N/A'}</td>
                  <td>{earning.items_count}</td>
                  <td>₹{Number(earning.total_amount || 0).toFixed(2)}</td>
                  <td>₹{Number(earning.commission || 0).toFixed(2)}</td>
                  <td>₹{Number(earning.net_earnings || 0).toFixed(2)}</td>
                  <td className="flex gap-2">
                    <ActionButton 
                      text="View Order" 
                      color="blue" 
                      onClick={() => handleViewOrderDetails(earning.order_id)}
                    />
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

/* Summary Card */
const SummaryCard = ({ title, value, icon, color }) => (
  <div className={`${color} text-white rounded-lg p-4 shadow-md`}>
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
      <div className="bg-white bg-opacity-20 rounded-full p-3">
        {icon}
      </div>
    </div>
  </div>
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
              No earnings found
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