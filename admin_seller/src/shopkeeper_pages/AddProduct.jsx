  // frontend/src/components/AddProduct.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

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

  const handleBack = () => {
    navigate("/products");
  };

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
            <h2 className="text-lg font-semibold text-gray-900">Add New Product</h2>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="productName" 
              placeholder="Product Name" 
              value={formData.productName} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
            <input 
              type="text" 
              name="unit" 
              placeholder="Unit" 
              value={formData.unit} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <input 
              type="number" 
              name="price" 
              placeholder="Price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              step="0.01" 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
            <input 
              type="number" 
              name="mrp" 
              placeholder="MRP" 
              value={formData.mrp} 
              onChange={handleChange} 
              required 
              step="0.01" 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
            <input 
              type="number" 
              name="stock" 
              placeholder="Stock" 
              value={formData.stock} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
            <input 
              type="text" 
              name="shelflife" 
              placeholder="Shelf Life" 
              value={formData.shelflife} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
            <input 
              type="file" 
              name="image" 
              onChange={handleChange} 
              accept="image/*" 
              required 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
          </div>
          <textarea 
            name="description" 
            placeholder="Description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows="4"
          ></textarea>
          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;