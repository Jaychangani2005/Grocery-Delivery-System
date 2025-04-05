import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import { 
  FaUser, 
  FaMotorcycle, 
  FaIdCard, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaTruck, 
  FaCheck, 
  FaClock, 
  FaCalendarAlt, 
  FaRupeeSign, 
  FaMoneyBillWave,
  FaArrowLeft,
  FaChartLine,
  FaMapMarkerAlt,
  FaPercentage,
  FaCreditCard,
  FaMoneyBill,
  FaHistory,
  FaTachometerAlt
} from 'react-icons/fa';

const API_BASE_URL = "http://localhost:5000/api/dashboard";

const DetailCard = ({ title, value, icon: Icon, subtext }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center space-x-3 mb-3">
      <div className="p-2 bg-orange-50 rounded-lg">
        <Icon className="text-orange-500 text-xl" />
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    </div>
    <p className="text-lg font-semibold text-gray-900">{value}</p>
    {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
  </div>
);

const StatusBadge = ({ status }) => {
  const statusConfig = {
    available: { color: 'green', icon: FaCheckCircle },
    busy: { color: 'yellow', icon: FaClock },
    offline: { color: 'gray', icon: FaTimesCircle }
  };

  const { color, icon: Icon } = statusConfig[status] || statusConfig.offline;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
      ${color === 'green' ? 'bg-green-100 text-green-800' :
        color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
        'bg-gray-100 text-gray-800'}`}>
      <Icon className="mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const DeliveryPersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deliveryPerson, setDeliveryPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveryPersonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/delivery-requests/${id}`);
        console.log("Delivery person details:", response.data);
        setDeliveryPerson(response.data);
      } catch (err) {
        console.error("Error fetching delivery person details:", err);
        setError(err.response?.data?.error || "Failed to fetch delivery person details");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryPersonDetails();
  }, [id]);

  const handleStatusChange = async (isApproved) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/delivery-requests/${id}/${isApproved ? 'approve' : 'reject'}`);
      console.log("Status update response:", response.data);
      setDeliveryPerson(prev => ({
        ...prev,
        is_approved: isApproved ? 1 : 0,
        is_rejected: isApproved ? 0 : 1,
        status: isApproved ? 'available' : 'offline'
      }));
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err.response?.data?.error || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => navigate("/manage-delivery")}
              className="mt-4 inline-flex items-center text-orange-500 hover:text-orange-600"
            >
              <FaArrowLeft className="mr-2" />
              Back to Manage Delivery
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!deliveryPerson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Delivery Person Not Found</h2>
            <button
              onClick={() => navigate("/manage-delivery")}
              className="mt-4 inline-flex items-center text-orange-500 hover:text-orange-600"
            >
              <FaArrowLeft className="mr-2" />
              Back to Manage Delivery
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-xl rounded-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Delivery Person Details</h1>
        <button
              onClick={() => navigate("/manage-delivery")}
              className="inline-flex items-center text-orange-500 hover:text-orange-600"
        >
              <FaArrowLeft className="mr-2" />
              Back to Manage Delivery
        </button>
          </div>

          {/* Basic Information */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaUser className="mr-2 text-orange-500" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailCard title="Name" value={deliveryPerson.name} icon={FaUser} />
              <DetailCard title="Vehicle Type" value={deliveryPerson.vehicle_type} icon={FaMotorcycle} />
              <DetailCard title="License Number" value={deliveryPerson.license_number} icon={FaIdCard} />
              <DetailCard 
                title="Status" 
                value={<StatusBadge status={deliveryPerson.status} />} 
                icon={FaCheckCircle} 
              />
            </div>
          </div>

          {/* Delivery Statistics */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaTruck className="mr-2 text-orange-500" />
              Delivery Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DetailCard 
                title="Total Deliveries" 
                value={deliveryPerson.total_deliveries || 0} 
                icon={FaTruck}
                subtext={`${deliveryPerson.completed_deliveries || 0} completed`}
              />
              <DetailCard 
                title="Active Deliveries" 
                value={deliveryPerson.active_deliveries || 0} 
                icon={FaClock}
                subtext={`${deliveryPerson.cancelled_deliveries || 0} cancelled`}
              />
              <DetailCard 
                title="Success Rate" 
                value={`${(parseFloat(deliveryPerson.delivery_success_rate) || 0).toFixed(1)}%`} 
                icon={FaPercentage}
                subtext="Delivery completion rate"
              />
              <DetailCard 
                title="Avg. Delivery Time" 
                value={`${Math.round(deliveryPerson.avg_delivery_time_minutes || 0)} min`} 
                icon={FaTachometerAlt}
                subtext="Average time per delivery"
              />
            </div>
          </div>

          {/* Order Information */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaChartLine className="mr-2 text-orange-500" />
              Order Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DetailCard 
                title="Total Orders" 
                value={deliveryPerson.total_orders || 0} 
                icon={FaTruck}
                subtext={`₹${(parseFloat(deliveryPerson.total_order_value) || 0).toFixed(2)} total value`}
              />
              <DetailCard 
                title="Average Order Value" 
                value={`₹${(parseFloat(deliveryPerson.avg_order_value) || 0).toFixed(2)}`} 
                icon={FaMoneyBill}
                subtext="Per order"
              />
              <DetailCard 
                title="Online Payments" 
                value={deliveryPerson.online_payments || 0} 
                icon={FaCreditCard}
                subtext="Digital transactions"
              />
              <DetailCard 
                title="COD Payments" 
                value={deliveryPerson.cod_payments || 0} 
                icon={FaMoneyBill}
                subtext="Cash on delivery"
              />
            </div>
          </div>

          {/* Location Tracking */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-orange-500" />
              Location Tracking
        </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailCard 
                title="Locations Tracked" 
                value={deliveryPerson.total_locations_tracked || 0} 
                icon={FaMapMarkerAlt}
                subtext={`${(parseFloat(deliveryPerson.avg_location_accuracy) || 0).toFixed(1)}m avg. accuracy`}
              />
              <DetailCard 
                title="Last Activity" 
                value={deliveryPerson.last_delivery_time ? new Date(deliveryPerson.last_delivery_time).toLocaleString() : 'N/A'} 
                icon={FaHistory}
                subtext="Most recent delivery"
              />
            </div>
          </div>

          {/* Earnings Information */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaMoneyBillWave className="mr-2 text-orange-500" />
              Earnings Information
            </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailCard 
                title="Total Earnings" 
                value={
                  <div className="flex items-center">
                    <FaRupeeSign className="mr-1" />
                    {(parseFloat(deliveryPerson.total_earnings) || 0).toFixed(2)}
                  </div>
                } 
                icon={FaMoneyBillWave}
                subtext={`From ${deliveryPerson.total_earnings_orders || 0} orders`}
              />
              <DetailCard 
                title="Last Payment Date" 
                value={deliveryPerson.paid_date ? new Date(deliveryPerson.paid_date).toLocaleDateString() : 'N/A'} 
                icon={FaCalendarAlt}
                subtext="Most recent settlement"
              />
            </div>
        </div>

          {/* Approval Status */}
          {!deliveryPerson.is_approved && !deliveryPerson.is_rejected && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Action Required</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleStatusChange(true)}
                  className="flex items-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition shadow-sm hover:shadow-md"
                >
                  <FaCheckCircle className="mr-2" />
                  Approve
                </button>
          <button
                  onClick={() => handleStatusChange(false)}
                  className="flex items-center bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition shadow-sm hover:shadow-md"
          >
                  <FaTimesCircle className="mr-2" />
                  Reject
          </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPersonDetails;
