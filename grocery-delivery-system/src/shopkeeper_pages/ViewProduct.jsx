import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const ViewProduct = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Example product data (can be fetched from an API or passed via props)
  const product = {
    id: 123,
    name: "Fresh Apples",
    weight: "1 kg",
    category: "Fruits",
    price: 130,
    description: "Fresh and juicy apples, sourced directly from local farms. Perfect for a healthy snack or baking.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Fuji_apple.jpg",
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
        <Section title="Product Details">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto max-w-md rounded-lg shadow-md"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-sm text-gray-500">Product ID: {product.id}</p>
                </div>

                <div className="space-y-2">
                  <DetailItem label="Weight" value={product.weight} />
                  <DetailItem label="Category" value={product.category} />
                  <DetailItem label="Price" value={`₹${product.price}`} />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <ActionButton text="Edit" color="blue" />
              <ActionButton text="Delete" color="red" />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

// Reusable Components
const NavItem = ({ text, active }) => (
  <a href="#" className={`block px-4 py-2 text-sm font-medium ${active ? "text-orange-500" : "text-gray-600"} hover:text-orange-600`}>
    {text}
  </a>
);

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

const ActionButton = ({ text, color }) => {
  const colors = {
    gray: "bg-gray-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
  };

  return (
    <button className={`${colors[color]} text-white px-4 py-2 rounded-lg text-sm transition hover:opacity-80`}>
      {text}
    </button>
  );
};

export default ViewProduct;