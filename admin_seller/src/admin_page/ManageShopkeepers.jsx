import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const ManageShopkeepers = () => {
  const [shopkeepers, setShopkeepers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShopkeepers();
  }, []);

  const fetchShopkeepers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/shopkeepers`);
      console.log("Shopkeepers response:", response.data);
      
      // Check if response.data exists and is an array
      if (!response.data || !Array.isArray(response.data)) {
        console.error("Invalid response format:", response.data);
        setError("Invalid data received from server");
        setLoading(false);
        return;
      }

      const formattedShopkeepers = response.data.map(seller => ({
        id: seller.seller_id,
        store: seller.store_name,
        email: seller.email,
        phone: seller.phone || "N/A",
        fssai: seller.fssai_license,
        category: seller.store_category,
        address: seller.store_address || "N/A",
        status: seller.is_rejected ? "Rejected" : (seller.is_approved ? "Approved" : "Pending")
      }));

      setShopkeepers(formattedShopkeepers);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching shopkeepers:", err);
      setError(err.response?.data?.error || "Failed to fetch shopkeepers. Please try again.");
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      const isApproved = newStatus === "Approved";
      await axios.put(`${API_BASE_URL}/dashboard/shopkeepers/${id}`, 
        { is_approved: isApproved }
      );
      
      // Update local state
      setShopkeepers(prevShopkeepers =>
        prevShopkeepers.map(shopkeeper =>
          shopkeeper.id === id
            ? { ...shopkeeper, status: newStatus }
            : shopkeeper
        )
      );
      setError("");
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err.response?.data?.error || "Failed to update shopkeeper status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredShopkeepers = shopkeepers.filter(shopkeeper => {
    const matchesSearch = 
      shopkeeper.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shopkeeper.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (shopkeeper.phone && shopkeeper.phone.includes(searchTerm));
    
    const matchesStatus = 
      filterStatus === "all" || 
      shopkeeper.status.toLowerCase() === filterStatus.toLowerCase();
    
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
            <h1 className="text-2xl font-bold text-gray-900">Manage Shopkeepers</h1>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search shopkeepers..."
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
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
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
                    Store
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    FSSAI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
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
                {filteredShopkeepers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No shopkeepers found
                    </td>
                  </tr>
                ) : (
                  filteredShopkeepers.map((shopkeeper) => (
                    <tr key={shopkeeper.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {shopkeeper.store}
                        </div>
                        <div className="text-sm text-gray-500">{shopkeeper.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{shopkeeper.email}</div>
                        <div className="text-sm text-gray-500">{shopkeeper.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shopkeeper.fssai}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shopkeeper.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          shopkeeper.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : shopkeeper.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {shopkeeper.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {shopkeeper.status === "Rejected" && (
                            <button
                              onClick={() => handleStatusChange(shopkeeper.id, "Approved")}
                              className="text-green-600 hover:text-green-900"
                              disabled={loading}
                            >
                              Approve
                            </button>
                          )}
                          {shopkeeper.status === "Approved" && (
                            <button
                              onClick={() => handleStatusChange(shopkeeper.id, "Rejected")}
                              className="text-red-600 hover:text-red-900"
                              disabled={loading}
                            >
                              Reject
                            </button>
                          )}
                          {shopkeeper.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(shopkeeper.id, "Approved")}
                                className="text-green-600 hover:text-green-900"
                                disabled={loading}
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleStatusChange(shopkeeper.id, "Rejected")}
                                className="text-red-600 hover:text-red-900"
                                disabled={loading}
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => window.location.href = `/shopkeeper-details/${shopkeeper.id}`}
                            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:opacity-80 transition"
                          >
                            View Details
                          </button>
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

export default ManageShopkeepers;
