// export default EditProduct;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

  if (error) return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-20 p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-20 p-6 text-center">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6">
        <Section title="Edit Product">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField label="Product Name" name="productName" value={formData.productName} onChange={handleChange} />
            <InputField label="Unit" name="unit" value={formData.unit} onChange={handleChange} placeholder="e.g., 500 ml" />
            <SelectField label="Category" name="category" value={formData.category} onChange={handleChange} options={categories} />
            <InputField label="Price" name="price" value={formData.price} onChange={handleChange} type="number" step="0.0" />
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-lg" required></textarea>
            <InputField label="MRP" name="mrp" value={formData.mrp} onChange={handleChange} type="number" step="0.00" />
            <InputField label="Stock" name="stock" value={formData.stock} onChange={handleChange} type="number" />
            <InputField label="Shelf Life" name="shelflife" value={formData.shelflife} onChange={handleChange} placeholder="e.g., 3 days" />

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-medium">Product Image (Optional)</label>
              {previewImage && <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover mt-2" />}
              <input type="file" name="image" accept="image/*" onChange={handleChange} className="mt-2" />
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600">Update Product</button>
          </form>
        </Section>
      </div>
    </div>
  );
};

// Reusable Components
const InputField = ({ label, ...props }) => (
  <label className="block">
    <span className="text-gray-700 font-medium">{label}</span>
    <input className="w-full p-2 border rounded-lg mt-1" {...props} />
  </label>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <label className="block">
    <span className="text-gray-700 font-medium">{label}</span>
    <select name={name} value={value} onChange={onChange} className="w-full p-2 border rounded-lg mt-1">
      <option value="">Select a category</option>
      {options.map(cat => <option key={cat.category_id} value={cat.name}>{cat.name}</option>)}
    </select>
  </label>
);

const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">{children}</div>
  </section>
);

export default EditProduct;
