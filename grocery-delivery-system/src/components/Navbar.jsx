// components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <NavItem to="/" text="Dashboard" />
        <NavItem to="/product-management" text="Product Management" />
        <NavItem to="/order-management" text="Order Management" />
        <NavItem to="/admin-dashboard" text="Admin Dashboard" />
        <NavItem to="/login" text="Login" />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        {menuOpen ? (
          <FiX
            size={24}
            className="cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <FiMenu
            size={24}
            className="cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4">
          <NavItem to="/" text="Dashboard" />
          <NavItem to="/product-management" text="Product Management" />
          <NavItem to="/order-management" text="Order Management" />
          <NavItem to="/admin-dashboard" text="Admin Dashboard" />
          <NavItem to="/login" text="Login" />
        </div>
      )}
    </nav>
  );
};

// Reusable NavItem Component
const NavItem = ({ to, text }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-600"
  >
    {text}
  </Link>
);

export default Navbar;