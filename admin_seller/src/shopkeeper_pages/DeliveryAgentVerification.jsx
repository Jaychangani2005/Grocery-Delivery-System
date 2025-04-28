import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { FiCheck, FiX, FiAlertCircle } from "react-icons/fi";

const DeliveryAgentVerification = () => {
  const [pendingAgents, setPendingAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchPendingAgents();
  }, []);

  const fetchPendingAgents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/dashboard/delivery-requests?seller_id=${user?.seller_id}`);
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
      await axios.post(`http://localhost:5000/api/dashboard/delivery-requests/${agentId}/${action}`, {
        seller_id: user?.seller_id
      });
      
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Delivery Agent Verification</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
            <FiAlertCircle className="mr-2" />
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
                          className="text-green-600 hover:text-green-900 flex items-center"
                          disabled={loading}
                        >
                          <FiCheck className="mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleVerification(agent.id, "reject")}
                          className="text-red-600 hover:text-red-900 flex items-center"
                          disabled={loading}
                        >
                          <FiX className="mr-1" />
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
  );
};

export default DeliveryAgentVerification; 