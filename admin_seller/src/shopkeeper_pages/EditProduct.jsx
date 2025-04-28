// export default EditProduct;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    unit: "",
    category: "",
    price: "",
    description: "",
    mrp: "",
    stock: "",
    shelflife: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch categories and product details
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get("http://localhost:5000/api/dashboard/categories");
        setCategories(categoriesResponse.data);

        // Fetch product details
        const productResponse = await axios.get(`http://localhost:5000/api/dashboard/products/${productId}`);
        const productData = productResponse.data;
        setProduct(productData);

        setFormData({
          productName: productData.name || "",
          unit: productData.unit || "",
          category: productData.category || "",
          price: productData.price || "",
          description: productData.description || "",
          mrp: productData.mrp || "",
          stock: productData.stock || "",
          shelflife: productData.shelflife || "",
          image: null,
        });

        setPreviewImage(productData.image_url); // Set preview image from existing product data
      } catch (err) {
        console.error("Error fetching data:", err.response?.data || err.message);
        setError("Failed to load product or categories. Please try again later.");
      }
    };
    fetchData();
  }, [productId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setPreviewImage(URL.createObjectURL(files[0])); // Show image preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.productName ||
      !formData.unit ||
      !formData.category ||
      !formData.price ||
      !formData.description ||
      !formData.mrp ||
      !formData.stock ||
      !formData.shelflife
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("unit", formData.unit);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("mrp", formData.mrp);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("shelflife", formData.shelflife);
    formDataToSend.append("seller_id", formData.seller_id || "1");
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      await axios.put(`http://localhost:5000/api/dashboard/products/${productId}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully!");
      navigate(`/view-product/${productId}`);
    } catch (err) {
      console.error("Error updating product:", err.response?.data || err.message);
      setError("Failed to update product. Please try again.");
    }
  };

  const handleBack = () => {
    navigate(`/view-product/${productId}`);
  };

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
      <div className="animate-pulse text-xl text-gray-600">Loading...</div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Go back to product details"
            >
              <FiArrowLeft className="text-gray-600" size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">Edit Product</h2>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Product Name" name="productName" value={formData.productName} onChange={handleChange} />
            <InputField label="Unit" name="unit" value={formData.unit} onChange={handleChange} placeholder="e.g., 500 ml" />
            <SelectField label="Category" name="category" value={formData.category} onChange={handleChange} options={categories} />
            <InputField label="Price" name="price" value={formData.price} onChange={handleChange} type="number" step="0.0" />
            <InputField label="MRP" name="mrp" value={formData.mrp} onChange={handleChange} type="number" step="0.00" />
            <InputField label="Stock" name="stock" value={formData.stock} onChange={handleChange} type="number" />
            <InputField label="Shelf Life" name="shelflife" value={formData.shelflife} onChange={handleChange} placeholder="e.g., 3 days" />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              rows="4"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Image (Optional)</label>
            {previewImage && (
              <div className="mt-2 mb-2">
                <img 
                  src={previewImage.startsWith('http') ? previewImage : `http://localhost:5000${previewImage}`} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200" 
                />
              </div>
            )}
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
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
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Components
const InputField = ({ label, ...props }) => (
  <label className="block">
    <span className="text-gray-700 font-medium">{label}</span>
    <input 
      className="w-full p-2 border border-gray-200 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
      {...props} 
    />
  </label>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <label className="block">
    <span className="text-gray-700 font-medium">{label}</span>
    <select 
      name={name} 
      value={value} 
      onChange={onChange} 
      className="w-full p-2 border border-gray-200 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
    >
      <option value="">Select a category</option>
      {options.map(cat => <option key={cat.category_id} value={cat.name}>{cat.name}</option>)}
    </select>
  </label>
);

export default EditProduct;
