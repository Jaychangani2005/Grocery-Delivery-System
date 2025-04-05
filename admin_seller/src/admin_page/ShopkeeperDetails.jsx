import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const API_BASE_URL = "http://localhost:5000/api/dashboard";

const ShopkeeperDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [shopkeeper, setShopkeeper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopkeeperDetails = async () => {
      try {
        console.log(`Fetching shopkeeper details for ID: ${id}`);
        const response = await axios.get(`${API_BASE_URL}/shopkeepers/${id}`);
        console.log("Shopkeeper details response:", response.data);
        
        if (!response.data) {
          throw new Error("No data received from server");
        }
        
        // Check if the response has the expected structure
        if (!response.data.seller_id) {
          throw new Error("Invalid shopkeeper data received");
        }
        
        setShopkeeper(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching shopkeeper details:", err);
        console.error("Error response:", err.response);
        setError(err.response?.data?.error || err.message || "Failed to fetch shopkeeper details");
        setLoading(false);
      }
    };

    if (id) {
      fetchShopkeeperDetails();
    } else {
      setError("No shopkeeper ID provided");
      setLoading(false);
    }
  }, [id]);

  const handleStatusChange = async (isApproved) => {
    try {
      console.log(`Updating shopkeeper status for ID: ${id}, isApproved: ${isApproved}`);
      const response = await axios.put(`${API_BASE_URL}/shopkeepers/${id}`, { is_approved: isApproved });
      console.log("Status update response:", response.data);
      navigate("/manage-shopkeepers");
    } catch (err) {
      console.error("Error updating status:", err);
      console.error("Error response:", err.response);
      setError(err.response?.data?.error || err.message || "Failed to update status");
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
            <p className="font-bold">Error:</p>
            <p>{error}</p>
            <button 
              onClick={() => navigate("/manage-shopkeepers")}
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:opacity-80 transition"
            >
              Back to Manage Shopkeepers
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!shopkeeper) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="pt-20 px-4">
          <div className="max-w-4xl mx-auto bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Shopkeeper not found
            <button 
              onClick={() => navigate("/manage-shopkeepers")}
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:opacity-80 transition"
            >
              Back to Manage Shopkeepers
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
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-orange-500">
              Shopkeeper Details
            </h2>
            <button 
              onClick={() => navigate("/manage-shopkeepers")}
              className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:opacity-80 transition"
            >
              Back to List
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailCard title="Store Name" value={shopkeeper.store_name} />
            <DetailCard title="Email" value={shopkeeper.email} />
            <DetailCard title="Phone" value={shopkeeper.phone} />
            <DetailCard title="Store Category" value={shopkeeper.store_category} />
            <DetailCard title="Store Address" value={shopkeeper.store_address} />
            <DetailCard title="FSSAI License" value={shopkeeper.fssai_license} />
            <DetailCard title="Status" value={shopkeeper.is_rejected ? "Rejected" : (shopkeeper.is_approved ? "Approved" : "Pending")} />
            <DetailCard title="Total Products" value={shopkeeper.total_products || "0"} />
            <DetailCard title="Total Orders" value={shopkeeper.total_orders || "0"} />
            <DetailCard title="Total Earnings" value={shopkeeper.total_earnings ? `₹${shopkeeper.total_earnings}` : "₹0"} />
            <DetailCard title="Last Settlement" value={shopkeeper.settlement_date || "Not settled yet"} />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-orange-500 mb-4">Business Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailCard title="GST Certificate" value={shopkeeper.gst_certificate || "Not provided"} />
              <DetailCard title="Bank Proof" value={shopkeeper.bank_proof || "Not provided"} />
              <DetailCard title="Business Address" value={shopkeeper.business_address || "Not provided"} />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-orange-500 mb-4">Bank Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailCard title="Account Holder" value={shopkeeper.account_holder || "Not provided"} />
              <DetailCard title="Account Number" value={shopkeeper.account_number || "Not provided"} />
              <DetailCard title="IFSC Code" value={shopkeeper.ifsc_code || "Not provided"} />
              <DetailCard title="Bank Name" value={shopkeeper.bank_name || "Not provided"} />
            </div>
          </div>

          {!shopkeeper.is_approved && !shopkeeper.is_rejected && (
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
    <p className="text-lg font-semibold">{value || "Not provided"}</p>
  </div>
);

export default ShopkeeperDetails;
