  // frontend/src/components/AddProduct.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SellerNavbar from "../components/SellerNavbar"; // Changed to SellerNavbar

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    unit: "",
    category: "",
    price: "",
    description: "",
    image: null,
    mrp: "",
    stock: "",
    shelflife: "",
    seller_id: "6", // Using seller_id 6 (Samarth Bhalala) as per your database
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.unit || !formData.category || !formData.price || !formData.description || !formData.image || !formData.mrp || !formData.stock || !formData.shelflife) {
      setError("Please fill in all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/dashboard/products", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");
      navigate(`/view-product/${response.data.productId}`);
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavbar />
      <div className="mt-20 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Product</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} required className="w-full p-2 border rounded" />
          <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required step="0.01" className="w-full p-2 border rounded" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
          <input type="number" name="mrp" placeholder="MRP" value={formData.mrp} onChange={handleChange} required step="0.01" className="w-full p-2 border rounded" />
          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="shelflife" placeholder="Shelf Life" value={formData.shelflife} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="file" name="image" onChange={handleChange} accept="image/*" required className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;