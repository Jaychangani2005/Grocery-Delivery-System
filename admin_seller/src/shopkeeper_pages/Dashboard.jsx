// shopkeeper_pages/Dashboard.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import NotificationToast from "../components/NotificationToast";
import { UserContext } from "../context/UserContext";
import { FiPackage, FiTruck, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiDollarSign, FiShoppingBag, FiUsers, FiCalendar } from 'react-icons/fi';
import PageWrapper from "../components/PageWrapper";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [outOfDelivery, setOutOfDelivery] = useState([]);
  const [completedDeliveries, setCompletedDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [products, setProducts] = useState([]);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalCategories: 0,
    totalRevenue: 0,
    activeDeliveries: 0,
    completedDeliveries: 0,
    canceledOrders: 0,
    recentOrders: [],
    categorySales: [],
    dailySales: [],
    topProducts: [],
    averageOrderValue: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    pendingPayments: 0,
    customerSatisfaction: 0
  });

  const navigate = useNavigate();
  
  // Initialize WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      console.log('Connecting to WebSocket...');
      
      if (wsRef.current) {
        wsRef.current.close();
      }

      // Use the correct WebSocket URL with the seller_id
      const wsUrl = `ws://localhost:5000/ws?seller_id=${user?.seller_id}`;
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connection established');
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received update:', data);
        
        switch (data.type) {
          case 'PRODUCT_ADDED':
            setProducts(prevProducts => [data.data, ...prevProducts]);
            break;
          case 'PRODUCT_UPDATED':
            setProducts(prevProducts => 
              prevProducts.map(product => 
                product.id === data.data.productId ? { ...product, ...data.data } : product
              )
            );
            break;
          case 'PRODUCT_DELETED':
            setProducts(prevProducts => 
              prevProducts.filter(product => product.id !== data.data.productId)
            );
            break;
          case 'NEW_ORDER':
            console.log('New order received:', data.data);
            setNotification(data.data);
            // Refresh all order data
            fetchData();
            break;
          default:
            console.log('Unknown update type:', data.type);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket connection closed');
        // Attempt to reconnect after 5 seconds
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
      };
    };

    if (user?.seller_id) {
      connectWebSocket();
    }

    // Cleanup function
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [user?.seller_id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [newOrdersRes, pendingRes, outRes, completedRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/dashboard/new-orders?seller_id=${user?.seller_id}`),
        axios.get(`http://localhost:5000/api/dashboard/pending-deliveries?seller_id=${user?.seller_id}`),
        axios.get(`http://localhost:5000/api/dashboard/out-of-deliveries?seller_id=${user?.seller_id}`),
        axios.get(`http://localhost:5000/api/dashboard/completed-deliveries?seller_id=${user?.seller_id}`)
      ]);

      setOrders(newOrdersRes.data);
      setPendingDeliveries(pendingRes.data);
      setOutOfDelivery(outRes.data);
      setCompletedDeliveries(completedRes.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load dashboard data. Please make sure the backend server is running.');
      // Set empty arrays to prevent undefined errors
      setOrders([]);
      setPendingDeliveries([]);
      setOutOfDelivery([]);
      setCompletedDeliveries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.seller_id) {
      fetchData();
    }
  }, [user?.seller_id]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Format the period parameter for the backend
        let periodParam = '';
        switch(selectedPeriod) {
          case 'today':
            periodParam = 'today';
            break;
          case 'week':
            periodParam = 'week';
            break;
          case 'month':
            periodParam = 'month';
            break;
          case 'year':
            periodParam = 'year';
            break;
          case 'all':
            periodParam = 'all';
            break;
          default:
            periodParam = 'today';
        }
        
        // Use the existing API endpoints with the properly formatted period parameter
        const [newOrdersRes, pendingRes, outRes, completedRes, canceledRes, productsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/dashboard/new-orders?seller_id=${user?.seller_id}&period=${periodParam}`),
          axios.get(`http://localhost:5000/api/dashboard/pending-deliveries?seller_id=${user?.seller_id}&period=${periodParam}`),
          axios.get(`http://localhost:5000/api/dashboard/out-of-deliveries?seller_id=${user?.seller_id}&period=${periodParam}`),
          axios.get(`http://localhost:5000/api/dashboard/completed-deliveries?seller_id=${user?.seller_id}&period=${periodParam}`),
          axios.get(`http://localhost:5000/api/dashboard/canceled-orders?seller_id=${user?.seller_id}&period=${periodParam}`),
          // Products don't need period filtering as they're inventory items
          axios.get(`http://localhost:5000/api/dashboard/products?seller_id=${user?.seller_id}`)
        ]);

        // Update the orders state
        setOrders(newOrdersRes.data);
        setPendingDeliveries(pendingRes.data);
        setOutOfDelivery(outRes.data);
        setCompletedDeliveries(completedRes.data);
        setProducts(productsRes.data);

        // Calculate statistics based on the fetched data
        const totalOrders = newOrdersRes.data.length + pendingRes.data.length + outRes.data.length + completedRes.data.length + canceledRes.data.length;
        const totalRevenue = [...newOrdersRes.data, ...pendingRes.data, ...outRes.data, ...completedRes.data]
          .reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        
        // Calculate category sales data for the chart
        const allOrders = [...newOrdersRes.data, ...pendingRes.data, ...outRes.data, ...completedRes.data];
        const categorySalesMap = {};
        
        // Process each order to extract category sales
        allOrders.forEach(order => {
          console.log('Processing order:', order);
          
          // Check if order has items array
          if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
              console.log('Processing item:', item);
              
              // Extract category from item, with fallbacks
              const category = item.category || item.product_category || 'Uncategorized';
              const price = parseFloat(item.price) || 0;
              const quantity = parseInt(item.quantity) || 0;
              const amount = price * quantity;
              
              console.log(`Category: ${category}, Amount: ${amount}`);
              
              if (!categorySalesMap[category]) {
                categorySalesMap[category] = 0;
              }
              categorySalesMap[category] += amount;
            });
          } else if (order.products && Array.isArray(order.products)) {
            // Alternative field name for products
            order.products.forEach(item => {
              console.log('Processing product:', item);
              
              const category = item.category || item.product_category || 'Uncategorized';
              const price = parseFloat(item.price) || 0;
              const quantity = parseInt(item.quantity) || 0;
              const amount = price * quantity;
              
              console.log(`Category: ${category}, Amount: ${amount}`);
              
              if (!categorySalesMap[category]) {
                categorySalesMap[category] = 0;
              }
              categorySalesMap[category] += amount;
            });
          }
        });
        
        console.log('Category Sales Map:', categorySalesMap);
        
        // Convert to array format for the chart
        const categorySalesData = Object.entries(categorySalesMap).map(([name, total]) => ({
          name,
          total
        }));
        
        console.log('Category Sales Data for Chart:', categorySalesData);
        
        // Update the stats state
        setStats(prevStats => ({
          ...prevStats,
          totalOrders,
          totalRevenue,
          activeDeliveries: pendingRes.data.length,
          completedDeliveries: completedRes.data.length,
          canceledOrders: canceledRes.data.length,
          averageOrderValue,
          totalProducts: productsRes.data.length,
          lowStockProducts: productsRes.data.filter(p => p.quantity < 10).length,
          categorySales: categorySalesData,
          // Keep other stats as they are
          totalCustomers: prevStats.totalCustomers,
          totalCategories: prevStats.totalCategories,
          recentOrders: prevStats.recentOrders,
          dailySales: prevStats.dailySales,
          topProducts: prevStats.topProducts,
          pendingPayments: prevStats.pendingPayments,
          customerSatisfaction: prevStats.customerSatisfaction
        }));
        
        setError(null);
      } catch (err) {
        console.error('Dashboard data error:', err);
        setError('Failed to load dashboard data. Please make sure the backend server is running.');
        // Set empty arrays to prevent undefined errors
        setOrders([]);
        setPendingDeliveries([]);
        setOutOfDelivery([]);
        setCompletedDeliveries([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.seller_id) {
      fetchDashboardData();
    }
  }, [selectedPeriod, user?.seller_id]);

  const handleViewOrder = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      // Clean the orderId by removing the '#' prefix if it exists
      const cleanOrderId = orderId.replace('#', '');
      
      await axios.put(`http://localhost:5000/api/dashboard/complete-delivery/${cleanOrderId}`, {
        status: "Out For delivery",
        seller_id: user?.seller_id
      });

      // Refresh the data after updating
      fetchData();
    } catch (err) {
      console.error('Error completing order:', err);
      setError('Failed to update order status. Please try again.');
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/dashboard/products/${productId}`, {
          params: { seller_id: user?.seller_id }
        });
        // The WebSocket update will handle the UI update
      } catch (err) {
        console.error('Error deleting product:', err);
        setError('Failed to delete product');
      }
    }
  };

  const dashboardStats = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <FiPackage className="text-blue-500" size={24} />,
      change: '+12%',
      color: 'blue'
    },
    {
      title: 'Active Deliveries',
      value: stats.activeDeliveries,
      icon: <FiTruck className="text-green-500" size={24} />,
      change: '+5%',
      color: 'green'
    },
    {
      title: 'Completed Orders',
      value: stats.completedDeliveries,
      icon: <FiCheckCircle className="text-purple-500" size={24} />,
      change: '+8%',
      color: 'purple'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toFixed(2)}`,
      icon: <FiDollarSign className="text-yellow-500" size={24} />,
      change: '+15%',
      color: 'yellow'
    },
    {
      title: 'Canceled Orders',
      value: stats.canceledOrders || 0,
      icon: <FiAlertCircle className="text-red-500" size={24} />,
      change: '-3%',
      color: 'red'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <FiShoppingBag className="text-pink-500" size={24} />,
      change: '+7%',
      color: 'pink'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: <FiUsers className="text-orange-500" size={24} />,
      change: '+10%',
      color: 'orange'
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockProducts,
      icon: <FiAlertCircle className="text-red-500" size={24} />,
      change: '-2%',
      color: 'red'
    }
  ];

  // Chart configurations
  const categorySalesData = {
    labels: stats.categorySales && stats.categorySales.length > 0 
      ? stats.categorySales.map(cat => cat.name) 
      : ['No Data'],
    datasets: [
      {
        label: 'Sales by Category',
        data: stats.categorySales && stats.categorySales.length > 0 
          ? stats.categorySales.map(cat => cat.total) 
          : [1],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(201, 203, 207, 0.8)',
          'rgba(255, 99, 71, 0.8)',
          'rgba(50, 205, 50, 0.8)',
          'rgba(147, 112, 219, 0.8)',
        ],
      },
    ],
  };

  // Add console log to debug category sales data
  useEffect(() => {
    console.log('Category Sales Data:', stats.categorySales);
  }, [stats.categorySales]);

  const dailySalesData = {
    labels: stats.dailySales.map(sale => sale.date),
    datasets: [
      {
        label: 'Daily Sales',
        data: stats.dailySales.map(sale => sale.amount),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <PageWrapper>
      {notification && (
        <NotificationToast
          message={notification.message}
          onClose={handleCloseNotification}
        />
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
      ) : (
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Dashboard</h1>
            
            {/* Period Selector */}
            <div className="flex items-center bg-white rounded-lg shadow-sm p-1 w-full md:w-auto">
              <div className="flex items-center w-full md:w-auto">
                <FiCalendar className="text-gray-500 mr-2" />
                <select 
                  className="bg-transparent border-none focus:outline-none text-gray-700 font-medium w-full md:w-auto"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {dashboardStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="mt-2 text-2xl md:text-3xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-2 md:p-3 rounded-full bg-${stat.color}-50`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <FiTrendingUp className="text-green-500" size={16} />
                    <span className="ml-2 text-sm font-medium text-green-500">{stat.change}</span>
                    <span className="ml-2 text-xs md:text-sm text-gray-500">from last {selectedPeriod}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 md:gap-6">
              {/* Category Sales Chart */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
                <div className="h-60 md:h-80">
                  {stats.categorySales && stats.categorySales.length > 0 ? (
                    <Doughnut 
                      data={categorySalesData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              boxWidth: 12,
                              padding: 15,
                              font: {
                                size: 11
                              }
                            }
                          },
                        },
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">No category sales data available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Orders and Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                  <Link to="/orders" className="text-sm text-green-600 hover:text-green-700">
                    View All
                  </Link>
                </div>
                <div className="space-y-3 md:space-y-4 overflow-x-auto">
                  {stats.recentOrders.length > 0 ? (
                    stats.recentOrders.map((order) => (
                      <div key={order._id} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Order #{order._id.slice(-6)}</p>
                          <p className="text-sm text-gray-500">{order.customerName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">₹{order.total.toLocaleString()}</p>
                          <p className={`text-sm ${
                            order.status === 'completed' ? 'text-green-600' :
                            order.status === 'pending' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">No recent orders</div>
                  )}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
                  <Link to="/products" className="text-sm text-green-600 hover:text-green-700">
                    View All
                  </Link>
                </div>
                <div className="space-y-3 md:space-y-4 overflow-x-auto">
                  {stats.topProducts.length > 0 ? (
                    stats.topProducts.map((product) => (
                      <div key={product._id} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900 text-sm md:text-base">{product.name}</p>
                            <p className="text-xs md:text-sm text-gray-500">{product.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 text-sm md:text-base">{product.totalSold} sold</p>
                          <p className="text-xs md:text-sm text-green-600">₹{product.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">No top products data</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="bg-white shadow-md rounded-lg mt-4 p-4">{children}</div>
  </section>
);

const ResponsiveTable = ({ headers, data, renderRow, isActionColumn = false }) => (
  <div className="overflow-x-auto">
    <table className="w-full hidden md:table border-collapse">
      <thead>
        <tr className="bg-orange-100 text-gray-700">
          {headers.map((header, index) => (
            <th key={index} className="p-3 text-left">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-t bg-orange-50 hover:bg-orange-100 transition">
            {renderRow(item)}
          </tr>
        ))}
      </tbody>
    </table>

    <div className="md:hidden">
      {data.map((item, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded-lg my-2">
          {headers.map((header, idx) => (
            <p key={idx} className="text-gray-700">
              <strong>{header}:</strong> {Object.values(item)[idx]}
            </p>
          ))}
          {isActionColumn && (
            <div className="flex gap-2 mt-2">
              <ActionButton text="Complete" color="blue" onClick={() => handleCompleteOrder(item.id)} />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ActionButton = ({ text, color, onClick }) => {
  const colors = {
    gray: "bg-gray-500",
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
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

export default Dashboard;