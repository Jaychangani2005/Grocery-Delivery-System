import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-6 text-center">Product not found.</div>;

  const imageUrl = product.image_url
    ? `http://localhost:5000${product.image_url}`
    : "https://via.placeholder.com/300";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6">
        <Section title="Product Details">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center items-center">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-auto max-w-md rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                    console.error("Image failed to load:", product.image_url);
                    console.log(product.image_url);
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
              </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Description</h3>
                  <p className="text-gray-600">{product.description || "No description available"}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <ActionButton text="Edit" color="blue" onClick={() => navigate(`/edit-product/${product.id}`)} />
              <ActionButton text="Delete" color="red" onClick={handleDelete} />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

// Reusable Components
const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

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
