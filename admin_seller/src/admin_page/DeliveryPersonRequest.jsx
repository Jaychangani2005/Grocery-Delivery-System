import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const API_BASE_URL = "http://localhost:5000/api";

const DeliveryPersonRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deliveryPerson, setDeliveryPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveryPersonDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/delivery-requests/${id}`);
        setDeliveryPerson(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching delivery person details:", err);
        setError(err.response?.data?.error || "Failed to fetch delivery person details");
        setLoading(false);
      }
    };

    fetchDeliveryPersonDetails();
  }, [id]);

  const handleStatusChange = async (isApproved) => {
    try {
      await axios.post(`${API_BASE_URL}/delivery-requests/${id}/${isApproved ? 'approve' : 'reject'}`);
      navigate("/manage-delivery");
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err.response?.data?.error || "Failed to update status");
    }
  };

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
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!deliveryPerson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="pt-20 px-4">
          <div className="max-w-4xl mx-auto bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Delivery person not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-orange-500 mb-6">
            Delivery Person Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailCard title="Name" value={deliveryPerson.name} />
            <DetailCard title="Vehicle Type" value={deliveryPerson.vehicle_type} />
            <DetailCard title="License Number" value={deliveryPerson.license_number} />
            <DetailCard title="Status" value={deliveryPerson.is_rejected ? "Rejected" : (deliveryPerson.is_approved ? "Approved" : "Pending")} />
            {deliveryPerson.total_earnings && (
              <DetailCard title="Total Earnings" value={`₹${deliveryPerson.total_earnings}`} />
            )}
          </div>

          {!deliveryPerson.is_approved && !deliveryPerson.is_rejected && (
            <div className="mt-6 flex justify-center space-x-4">
              <button 
                onClick={() => handleStatusChange(true)}
                className="bg-green-500 text-white px-6 py-2 rounded-full text-lg hover:opacity-80 transition"
              >
                Approve
              </button>
              <button 
                onClick={() => handleStatusChange(false)}
                className="bg-red-500 text-white px-6 py-2 rounded-full text-lg hover:opacity-80 transition"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ title, value }) => (
  <div className="bg-orange-50 p-4 rounded-lg shadow-md border border-orange-200">
    <p className="text-gray-600 text-sm font-medium">{title}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default DeliveryPersonRequest;
