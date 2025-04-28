import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

const ViewProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/dashboard/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to load product details. Please check the product ID or try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Delete Function
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/dashboard/products/${productId}`);
      alert("Product deleted successfully!");
      navigate("/products"); // Redirect to product list
    } catch (err) {
      console.error("Error deleting product:", err.response?.data || err.message);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/products");
  };

  if (loading) return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
      <div className="animate-pulse text-xl text-gray-600">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    </div>
  );
  
  if (!product) return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
      <div className="text-xl text-gray-600">Product not found.</div>
    </div>
  );

  const imageUrl = product.image_url
    ? `http://localhost:5000${product.image_url}`
    : "https://via.placeholder.com/300";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Go back to products"
            >
              <FiArrowLeft className="text-gray-600" size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center items-center">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-auto max-w-md rounded-lg shadow-md"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300";
                console.error("Image failed to load:", product.image_url);
              }}
            />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-500">Product ID: {product.id}</p>
            </div>
            <div className="space-y-2">
              <DetailItem label="Unit" value={product.unit || "N/A"} />
              <DetailItem label="Category" value={product.category || "N/A"} />
              <DetailItem label="Price" value={product.price ? `₹${product.price}` : "N/A"} />
              <DetailItem label="MRP" value={product.mrp ? `₹${product.mrp}` : "N/A"} />
              <DetailItem label="Stock" value={product.stock || "N/A"} />
              <DetailItem label="Shelf Life" value={product.shelflife || "N/A"} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Description</h3>
              <p className="text-gray-600">{product.description || "No description available"}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleBack}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <ActionButton text="Edit" color="blue" onClick={() => navigate(`/edit-product/${product.id}`)} />
          <ActionButton text="Delete" color="red" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const DetailItem = ({ label, value }) => (
  <div>
    <span className="text-sm font-medium text-gray-600">{label}:</span>
    <span className="ml-2 text-gray-800">{value}</span>
  </div>
);

const ActionButton = ({ text, color, onClick }) => {
  const colors = {
    gray: "bg-gray-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
  };
  return (
    <button
      className={`${colors[color]} text-white px-4 py-2 rounded-lg text-sm transition hover:opacity-80`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ViewProduct;
