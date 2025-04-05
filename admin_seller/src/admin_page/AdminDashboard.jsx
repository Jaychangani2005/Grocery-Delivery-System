import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const AdminDashboard = () => {
  const [shopkeeperRequests, setShopkeeperRequests] = useState([]);
  const [deliveryRequests, setDeliveryRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch shopkeeper requests
        const shopkeeperResponse = await axios.get(`${API_BASE_URL}/dashboard/shopkeeper-requests`);
        console.log("Shopkeeper response:", shopkeeperResponse.data);
        setShopkeeperRequests(shopkeeperResponse.data);

        // Fetch delivery requests
        const deliveryResponse = await axios.get(`${API_BASE_URL}/dashboard/delivery-requests`);
        console.log("Delivery response:", deliveryResponse.data);
        setDeliveryRequests(deliveryResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.error || "Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShopkeeperAction = async (id, action) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/dashboard/shopkeeper-requests/${id}/${action}`);
      console.log("Shopkeeper action response:", response.data);
      
      // Update local state
      setShopkeeperRequests(prevRequests => 
        prevRequests.filter(request => request.id !== id)
      );
    } catch (err) {
      console.error("Error handling shopkeeper action:", err);
      setError(err.response?.data?.error || `Failed to ${action} shopkeeper request. Please try again.`);
    }
  };

  const handleDeliveryAction = async (id, action) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/dashboard/delivery-requests/${id}/${action}`);
      console.log("Delivery action response:", response.data);
      
      // Update local state
      setDeliveryRequests(prevRequests => 
        prevRequests.filter(request => request.id !== id)
      );
    } catch (err) {
      console.error("Error handling delivery action:", err);
      setError(err.response?.data?.error || `Failed to ${action} delivery request. Please try again.`);
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
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          
          {/* Shopkeeper Requests Section */}
          <Section title="Shopkeeper Requests">
            <UniformTable
              headers={["ID", "Store", "Phone", "Status", "Actions"]}
              data={shopkeeperRequests.map((request) => [
                request.id,
                request.store,
                request.phone,
                request.status === 0 ? "Pending" : "Approved",
                <div key={request.id} className="flex space-x-2">
                  <ActionButton
                    text="Approve"
                    color="green"
                    onClick={() => handleShopkeeperAction(request.id, "approve")}
                  />
                  <ActionButton
                    text="Reject"
                    color="red"
                    onClick={() => handleShopkeeperAction(request.id, "reject")}
                  />
                </div>
              ])}
            />
          </Section>

          {/* Delivery Person Requests Section */}
          <Section title="Delivery Person Requests">
            <UniformTable
              headers={["ID", "Name", "Vehicle", "License", "Actions"]}
              data={deliveryRequests.map((request) => [
                request.id,
                request.name,
                request.vehicle,
                request.license,
                <div key={request.id} className="flex space-x-2">
                  <ActionButton
                    text="Approve"
                    color="green"
                    onClick={() => handleDeliveryAction(request.id, "approve")}
                  />
                  <ActionButton
                    text="Reject"
                    color="red"
                    onClick={() => handleDeliveryAction(request.id, "reject")}
                  />
                </div>
              ])}
            />
          </Section>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
    {children}
  </div>
);

const UniformTable = ({ headers, data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ActionButton = ({ text, color, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded text-white text-sm font-medium ${
      color === "green"
        ? "bg-green-500 hover:bg-green-600"
        : "bg-red-500 hover:bg-red-600"
    }`}
  >
    {text}
  </button>
);

export default AdminDashboard;
