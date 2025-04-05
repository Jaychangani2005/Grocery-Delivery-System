import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShoppingCart, FaMoneyBillWave, FaHistory } from "react-icons/fa";

const API_BASE_URL = "http://localhost:5000/api";

const DetailCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-2">
      {Icon && <Icon className="text-orange-500 mr-2" />}
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    </div>
    <p className="text-gray-600">{value || "Not available"}</p>
  </div>
);

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/dashboard/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch user details. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="pt-20 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="pt-20 px-4">
          <div className="max-w-4xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
            <button 
              onClick={() => navigate("/manage-users")}
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:opacity-80 transition"
            >
              Back to Manage Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="pt-20 px-4">
          <div className="max-w-4xl mx-auto bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            User not found
            <button 
              onClick={() => navigate("/manage-users")}
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:opacity-80 transition"
            >
              Back to Manage Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
            <button
              onClick={() => navigate("/manage-users")}
              className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:opacity-80 transition"
            >
              Back to Manage Users
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailCard title="Full Name" value={user.full_name} icon={FaUser} />
              <DetailCard title="Email" value={user.email} icon={FaEnvelope} />
              <DetailCard title="Phone" value={user.phone} icon={FaPhone} />
              <DetailCard title="Role" value={user.role} icon={FaUser} />
              <DetailCard title="Status" value={user.status} icon={FaUser} />
              <DetailCard title="Address" value={user.address} icon={FaMapMarkerAlt} />
              <DetailCard title="Total Orders" value={user.total_orders || "0"} icon={FaShoppingCart} />
              <DetailCard title="Total Spent" value={user.total_spent ? `₹${user.total_spent}` : "₹0"} icon={FaMoneyBillWave} />
              <DetailCard title="Member Since" value={new Date(user.created_at).toLocaleDateString()} icon={FaHistory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails; 