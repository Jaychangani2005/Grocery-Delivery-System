import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const AddProduct = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    weight: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (
      !formData.productName ||
      !formData.weight ||
      !formData.category ||
      !formData.price ||
      !formData.description ||
      !formData.image
    ) {
      alert("Please fill in all fields.");
      return;
    }
    // Handle form submission (e.g., send data to an API)
    console.log("Form Data:", formData);
    alert("Product added successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Responsive Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

        <div className="hidden md:flex space-x-6">
          <NavItem text="Dashboard" />
          <NavItem text="Product Management" />
          <NavItem text="Order Management" />
          <NavItem text="Customer Tracking" />
        </div>

        <div className="md:hidden">
          {menuOpen ? (
            <FiX size={24} className="cursor-pointer" onClick={() => setMenuOpen(false)} />
          ) : (
            <FiMenu size={24} className="cursor-pointer" onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4">
          <NavItem text="Dashboard" />
          <NavItem text="Product Management" />
          <NavItem text="Order Management" />
          <NavItem text="Customer Tracking" />
        </div>
      )}

      <div className="mt-20 p-6">
        <Section title="Add Product">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select a category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Product Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Product Image</label>
              <div className="border border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center bg-gray-50">
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                  id="file-upload"
                  required
                />
                <label htmlFor="file-upload" className="cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                  Upload Image
                </label>
                {formData.image && <p className="mt-2 text-sm text-gray-600">{formData.image.name}</p>}
              </div>
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition">
              Add Product
            </button>
          </form>
        </Section>
      </div>
    </div>
  );
};

const NavItem = ({ text, active }) => (
  <a href="#" className={`block px-4 py-2 text-sm font-medium ${active ? "text-orange-500" : "text-gray-600"} hover:text-orange-600`}>
    {text}
  </a>
);

const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="bg-white shadow-md rounded-lg mt-4 p-4">{children}</div>
  </section>
);

export default AddProduct;