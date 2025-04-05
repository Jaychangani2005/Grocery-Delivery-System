import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const DeliveryAgentDetails = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [earnings, setEarnings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgentDetails();
    fetchAgentEarnings();
  }, [id]);

  const fetchAgentDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/delivery-requests/${id}`);
      setAgent(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching agent details:", err);
      setError(err.response?.data?.error || "Failed to fetch agent details");
      setLoading(false);
    }
  };

  const fetchAgentEarnings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/delivery-requests/${id}/earnings`);
      setEarnings(response.data);
    } catch (err) {
      console.error("Error fetching agent earnings:", err);
      setError(err.response?.data?.error || "Failed to fetch agent earnings");
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/dashboard/delivery-requests/${id}/status`, {
        status: newStatus
      });
      
      // Update local state
      setAgent(prev => ({ ...prev, status: newStatus }));
      setError("");
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err.response?.data?.error || "Failed to update agent status");
    } finally {
      setLoading(false);
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

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Delivery agent not found
            </div>
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
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
                <p className="text-gray-500">ID: {agent.id}</p>
              </div>
              <div className="flex space-x-2">
                <select
                  value={agent.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:ring focus:ring-orange-300"
                  disabled={loading}
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Vehicle Type:</span> {agent.vehicle}</p>
                  <p><span className="font-medium">License Number:</span> {agent.license}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      agent.status === "available"
                        ? "bg-green-100 text-green-800"
                        : agent.status === "busy"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {agent.status}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings Summary</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Total Earnings:</span> ₹{agent.total_earnings || 0}</p>
                  <p><span className="font-medium">Last Settlement:</span> {agent.settlement_date || "Not settled"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Settlement Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {earnings.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No earnings history found
                      </td>
                    </tr>
                  ) : (
                    earnings.map((earning) => (
                      <tr key={earning.earning_id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{earning.order_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{earning.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(earning.delivery_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {earning.settlement_date ? new Date(earning.settlement_date).toLocaleDateString() : "Pending"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAgentDetails; 