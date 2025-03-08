import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const ViewUsers = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Dummy Users Data (Replace with real data)
  const [users, setUsers] = useState([
    { id: 1, full_name: "Amit Kumar", email: "amit@example.com" },
    { id: 2, full_name: "Neha Singh", email: "neha@example.com" },
    { id: 3, full_name: "Rahul Sharma", email: "rahul@example.com" },
  ]);

  // Remove User Function
  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Navbar */}
      {/* <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-left">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

        <div className="hidden md:flex space-x-6">
          <NavItem text="Dashboard" />
          <NavItem text="Manage Shopkeeper" />
          <NavItem text="Manage Delivery" />
          <NavItem text="View User" active />
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
          <NavItem text="Manage Shopkeeper" />
          <NavItem text="Manage Delivery" />
          <NavItem text="View User" active />
        </div>
      )} */}

      {/* ✅ Page Content */}
      <div className="mt-20 p-6">
        <h2 className="text-2xl font-semibold text-orange-500 mb-6 text-center">
          View Users
        </h2>

        {/* ✅ Full-Width Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-orange-100 text-gray-700">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Full Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t bg-orange-50 hover:bg-orange-100 transition">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.full_name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="text-center p-4">
                    <button
                      onClick={() => removeUser(user.id)}
                      className="bg-red-500 text-white px-5 py-2 rounded-full text-sm transition hover:opacity-80"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ No Users Message */}
        {users.length === 0 && (
          <p className="text-center text-gray-600 mt-6">No users found.</p>
        )}
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

export default ViewUsers;
