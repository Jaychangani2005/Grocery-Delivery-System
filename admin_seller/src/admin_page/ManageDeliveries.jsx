import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const ManageDeliveries = () => {
  const [deliveryAgents, setDeliveryAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveryAgents();
  }, []);

  const fetchDeliveryAgents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/delivery-requests`);
      console.log("Delivery agents response:", response.data);
      
      if (!response.data || !Array.isArray(response.data)) {
        console.error("Invalid response format:", response.data);
        setError("Invalid data received from server");
        setLoading(false);
        return;
      }

      const formattedAgents = response.data.map(agent => ({
        id: agent.id,
        name: agent.name,
        vehicle: agent.vehicle,
        license: agent.license,
        status: agent.status || "available"
      }));

      setDeliveryAgents(formattedAgents);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching delivery agents:", err);
      setError(err.response?.data?.error || "Failed to fetch delivery agents. Please try again.");
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, action) => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/dashboard/delivery-requests/${id}/${action}`);
      
      // Update local state
      setDeliveryAgents(prevAgents =>
        prevAgents.map(agent =>
          agent.id === id
            ? { ...agent, status: action === 'approve' ? 'available' : 'offline' }
            : agent
        )
      );
      setError("");
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err.response?.data?.error || "Failed to update delivery agent status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredAgents = deliveryAgents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.license.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" || 
      agent.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Manage Delivery Agents</h1>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search delivery agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-md focus:ring focus:ring-orange-300"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border rounded-md focus:ring focus:ring-orange-300"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    License
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
                {filteredAgents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No delivery agents found
                    </td>
                  </tr>
                ) : (
                  filteredAgents.map((agent) => (
                    <tr key={agent.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          <Link to={`/admin/delivery-agents/${agent.id}`} className="text-orange-600 hover:text-orange-900">
                            {agent.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {agent.vehicle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {agent.license}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          agent.status === "available"
                            ? "bg-green-100 text-green-800"
                            : agent.status === "busy"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {agent.status !== "available" && (
                            <button
                              onClick={() => handleStatusChange(agent.id, "approve")}
                              className="text-green-600 hover:text-green-900"
                              disabled={loading}
                            >
                              Approve
                            </button>
                          )}
                          {agent.status !== "offline" && (
                            <button
                              onClick={() => handleStatusChange(agent.id, "reject")}
                              className="text-red-600 hover:text-red-900"
                              disabled={loading}
                            >
                              Reject
                            </button>
                          )}
                        </div>
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
  );
};

export default ManageDeliveries; 