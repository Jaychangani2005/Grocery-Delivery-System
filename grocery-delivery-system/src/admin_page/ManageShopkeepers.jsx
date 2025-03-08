import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const ManageShopkeepers = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Dummy shopkeepers data (Replace with real data from API/state)
  const shopkeepers = [
    { id: 1, name: "John Doe", store_name: "SuperMart", details: "Grocery & Essentials" },
    { id: 2, name: "Sarah Lee", store_name: "Daily Fresh", details: "Vegetables & Fruits" },
    { id: 3, name: "Michael Smith", store_name: "QuickBuy", details: "General Store" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Navbar */}
      {/* <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-left">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

        <div className="hidden md:flex space-x-6">
          <NavItem text="Dashboard"/>
          <NavItem text="Manage Shopkeeper"active />
          <NavItem text="Manage Delivery" />
          <NavItem text="View User" />
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
          <NavItem text="Dashboard" active />
          <NavItem text="Manage Shopkeeper" />
          <NavItem text="Manage Delivery" />
          <NavItem text="View User" />
        </div>
      )} */}

      {/* ✅ Page Content */}
      <div className="mt-20 p-6">
        <h2 className="text-2xl font-semibold text-orange-500 mb-6 text-center">
          Manage Shopkeepers
        </h2>

        {/* ✅ Full-Width Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-orange-100 text-gray-700">
                <th className="p-4 text-left">Shopkeeper ID</th>
                <th className="p-4 text-left">Shopkeeper Name</th>
                <th className="p-4 text-left">Store Name</th>
                <th className="p-4 text-left">Details</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shopkeepers.map((shopkeeper) => (
                <tr
                  key={shopkeeper.id}
                  className="border-t bg-orange-50 hover:bg-orange-100 transition"
                >
                  <td className="p-4">{shopkeeper.id}</td>
                  <td className="p-4">{shopkeeper.name}</td>
                  <td className="p-4">{shopkeeper.store_name}</td>
                  <td className="p-4">{shopkeeper.details}</td>
                  <td className="text-center p-4">
                    <button
                      onClick={() => navigate(`/shopkeeper-details/${shopkeeper.id}`)}
                      className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm transition hover:opacity-80"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ✅ Navbar Item Component
const NavItem = ({ text, active }) => (
  <a
    href="#"
    className={`block px-4 py-2 text-sm font-medium ${
      active ? "text-orange-500 font-semibold" : "text-gray-600"
    } hover:text-orange-600`}
  >
    {text}
  </a>
);

export default ManageShopkeepers;
