// shopkeeper_pages/ProductManagement.jsx
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiFilter, FiPackage, FiAlertCircle } from "react-icons/fi";
import { UserContext } from "../context/UserContext";
import PageWrapper from "../components/PageWrapper";

const ProductManagement = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/dashboard/products?seller_id=${user?.seller_id}`);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user?.seller_id]);

  const handleRemoveProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/dashboard/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Failed to remove product. Please try again.");
    }
  };

  const handleViewProduct = (productId) => {
    // Close sidebar by dispatching a custom event
    window.dispatchEvent(new CustomEvent('closeSidebar'));
    navigate(`/view-product/${productId}`);
  };

  const handleEditProduct = (productId) => {
    // Close sidebar by dispatching a custom event
    window.dispatchEvent(new CustomEvent('closeSidebar'));
    navigate(`/edit-product/${productId}`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.category?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || product.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = [...new Set(products.map(product => product.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FiAlertCircle className="mx-auto text-red-500" size={48} />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">Error Loading Products</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <FiPackage className="text-green-500" size={24} />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Product Management</h2>
              </div>
              <button
                onClick={() => navigate("/add-product")}
                className="w-full sm:w-auto flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <FiPlus className="mr-2" />
                Add New Product
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name or category..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="relative w-full sm:w-48">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={() => navigate("/add-product")}
                  className="mt-4 text-green-500 hover:text-green-600"
                >
                  Add your first product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48 w-full">
                      <img
                        src={product.image_url || "https://via.placeholder.com/300"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Category:</span> {product.category || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Price:</span> ₹{product.price}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Stock:</span> {product.stock || "N/A"}
                        </p>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <button
                          onClick={() => handleViewProduct(product.id)}
                          className="flex-1 flex items-center justify-center text-green-600 hover:text-green-700 p-2 transition-colors"
                          title="View Details"
                        >
                          <FiEye size={20} />
                        </button>
                        <button
                          onClick={() => handleEditProduct(product.id)}
                          className="flex-1 flex items-center justify-center text-green-600 hover:text-green-700 p-2 transition-colors"
                          title="Edit Product"
                        >
                          <FiEdit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleRemoveProduct(product.id)}
                          className="flex-1 flex items-center justify-center text-red-500 hover:text-red-600 p-2 transition-colors"
                          title="Delete Product"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductManagement;