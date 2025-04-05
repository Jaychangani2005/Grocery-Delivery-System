// shopkeeper_pages/ProductManagement.jsx
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SellerNavbar from "../components/SellerNavbar";
const handleRemoveProduct = async (productId) => {
  const confirmDelete = window.confirm("Are you sure you want to remove this product?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/dashboard/products/${productId}`);
    setProducts(products.filter((product) => product.id !== productId)); // Update UI
  } catch (error) {
    console.error("Error removing product:", error);
    alert("Failed to remove product. Please try again.");
  }
};  
const ProductManagement = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // For development, we'll use a hardcoded seller_id
  // In production, this should come from authentication
  const seller_id = "1";

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/dashboard/products?seller_id=${seller_id}`);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [seller_id]);

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewProduct = (productId) => navigate(`/view-product/${productId}`);
  const handleAddProduct = () => navigate("/add-product");

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <SellerNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="mt-20 p-6">
        <Section title="Product Management">
          <div className="flex justify-between items-center mb-4">
            <ActionButton text="Add Product" color="orange" onClick={handleAddProduct} />
            <input
              type="text"
              placeholder="Search product..."
              className="p-2 border border-gray-300 rounded-md shadow-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ResponsiveTable
            headers={["Product ID", "Name", "Price", "Actions"]}
            data={filteredProducts}
            renderRow={(product) => (
              <>
                <td className="p-3">{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td className="flex gap-2">
                  <ActionButton text="View" color="gray" onClick={() => handleViewProduct(product.id)} />
                  <ActionButton
                text="Edit"
                color="blue"

                onClick={() => navigate(`/edit-product/${product.id}`)}
              />
                  <ActionButton text="Remove" color="red" onClick={() => handleRemoveProduct(product.id)} />

                </td>
              </>
            )}
            isActionColumn
          />
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="bg-white shadow-md rounded-lg mt-4 p-4">{children}</div>
  </section>
);

const ResponsiveTable = ({ headers, data, renderRow, isActionColumn = false }) => (
  <div className="overflow-x-auto">
    <table className="w-full hidden md:table border-collapse">
      <thead>
        <tr className="bg-orange-100 text-gray-700">
          {headers.map((header, index) => (
            <th key={index} className="p-3 text-left">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-t bg-orange-50 hover:bg-orange-100 transition">
            {renderRow(item)}
          </tr>
        ))}
      </tbody>
    </table>

    <div className="md:hidden">
      {data.map((item, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded-lg my-2">
          {headers.map((header, idx) => (
            <p key={idx} className="text-gray-700">
              <strong>{header}:</strong> {Object.values(item)[idx]}
            </p>
          ))}
          {isActionColumn && (
            <div className="flex gap-2 mt-2">
              <ActionButton text="View" color="gray" onClick={() => handleViewProduct(item.id)} />
              <ActionButton
                text="Edit"
                color="blue"

                onClick={() => navigate(`/edit-product/${product.id}`)}
              />
              <ActionButton text="Remove" color="red" onClick={() => alert("Remove functionality to be implemented")} />
            </div>
          )}
        </div>
      ))}
    </div>
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
      className={`${colors[color]} text-white px-3 py-1 rounded-full text-sm transition hover:opacity-80`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};


export default ProductManagement;