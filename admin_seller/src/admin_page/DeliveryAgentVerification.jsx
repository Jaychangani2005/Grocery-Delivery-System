import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const DeliveryAgentVerification = () => {
  const [pendingAgents, setPendingAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPendingAgents();
  }, []);

  const fetchPendingAgents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/delivery-requests`);
      setPendingAgents(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching pending agents:", err);
      setError(err.response?.data?.error || "Failed to fetch pending delivery agents");
      setLoading(false);
    }
  };

  const handleVerification = async (agentId, action) => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/dashboard/delivery-requests/${agentId}/${action}`);
      
      // Refresh the list after action
      await fetchPendingAgents();
      
      // Show success message
      alert(`Delivery agent ${action}ed successfully`);
    } catch (err) {
      console.error(`Error ${action}ing agent:`, err);
      setError(err.response?.data?.error || `Failed to ${action} delivery agent`);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Delivery Agent Verification</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {pendingAgents.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No pending delivery agent verifications
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        License Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingAgents.map((agent) => (
                      <tr key={agent.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{agent.vehicle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{agent.license}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleVerification(agent.id, "approve")}
                              className="text-green-600 hover:text-green-900"
                              disabled={loading}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleVerification(agent.id, "reject")}
                              className="text-red-600 hover:text-red-900"
                              disabled={loading}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAgentVerification; 