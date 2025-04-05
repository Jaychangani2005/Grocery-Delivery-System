

// shopkeeper_pages/OrderDetails.jsx
import { useState, useEffect, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import { UserContext } from "../context/UserContext";

const OrderDetails = () => {
  //const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/dashboard/order-details/${orderId}`);
      setOrder(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError(err.response?.data?.error || "Failed to load order details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrderDetails();
  }, [orderId]);

  const handleAccept = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/dashboard/update-order-status/${orderId}`, {
        status: "pending",
      });
      if (response.data.success) {
        navigate('/dashboard'); // Redirect to dashboard
        // Note: Dashboard will refetch data automatically due to useEffect
      }
    } catch (err) {
      console.error("Error accepting order:", err);
      setError(err.response?.data?.error || "Failed to update order status.");
    }
  };

  const handleDeny = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/dashboard/update-order-status/${orderId}`, {
        status: "cancelled", // Using "cancelled" as per enum
      });
      if (response.data.success) {
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (err) {
      console.error("Error denying order:", err);
      setError(err.response?.data?.error || "Failed to update order status.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!order) return <div className="p-6 text-center">No order found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>
        <div className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-600">Dashboard</Link>
          <Link to="/products" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-600">Product Management</Link>
          <Link to="/orders" className="block px-4 py-2 text-sm font-medium text-orange-500 font-semibold hover:text-orange-600">Order Management</Link>
          <Link to="/customer-history" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-600">Customer Tracking</Link>
        </div>
        <div className="md:hidden">
          {menuOpen ? <FiX size={24} className="cursor-pointer" onClick={() => setMenuOpen(false)} /> : <FiMenu size={24} className="cursor-pointer" onClick={() => setMenuOpen(true)} />}
        </div>
      </nav>
      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4">
          <Link to="/dashboard" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-600">Dashboard</Link>
          <Link to="/products" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-600">Product Management</Link>
          <Link to="/orders" className="block px-4 py-2 text-sm font-medium text-orange-500 font-semibold hover:text-orange-600">Order Management</Link>
          <Link to="/customer-history" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-600">Customer Tracking</Link>
        </div>
      )}
      <div className="mt-20 p-6">
        <h2 className="text-2xl font-semibold text-orange-500 mb-6 text-center">Order Details</h2>
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-4">Order Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Order ID" value={order.order_id} />
            <InfoRow label="Order Date" value={order.order_date} />
            <InfoRow label="Order Status" value={order.order_status} />
            <InfoRow label="Payment Status" value={order.payment_status || "N/A"} />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mt-6 mb-4">Product Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Product Name" value={order.product_name} />
            <InfoRow label="Category" value={order.category} />
            <InfoRow label="Subcategory" value={order.subcategory || "N/A"} />
            <InfoRow label="Price" value={`₹${order.price}`} />
            <InfoRow label="Quantity" value={`${order.quantity} units`} />
            <InfoRow label="Total Price" value={`₹${order.total_price}`} />
            <div className="col-span-2"><InfoRow label="Description" value={order.description || "No description"} /></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mt-6 mb-4">Customer Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Customer Name" value={order.customer_name} />
            <InfoRow label="Phone Number" value={order.phone_number || "N/A"} />
            <div className="col-span-2"><InfoRow label="Delivery Address" value={order.delivery_address || "N/A"} /></div>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={handleAccept} className="bg-green-500 text-white px-5 py-2 rounded-full text-sm transition hover:opacity-80" disabled={order.order_status !== "new"}>Accept</button>
            <button onClick={handleDeny} className="bg-red-500 text-white px-5 py-2 rounded-full text-sm transition hover:opacity-80" disabled={order.order_status !== "new"}>Deny</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="text-gray-700 font-semibold">{value}</span>
  </div>
);

export default OrderDetails;