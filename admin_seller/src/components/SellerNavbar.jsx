// // src/components/SellerNavbar.jsx
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi";

// const SellerNavbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
//       {/* Logo */}
//       <h1 className="text-xl font-bold text-orange-500">GroceryDash (Seller)</h1>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex space-x-6">
//         <NavItem to="/seller-dashboard" text="Dashboard" active />
//         <NavItem to="/product-management" text="Product Management" />
//         <NavItem to="/order-management" text="Order Management" />
//         <NavItem to="/customer-tracking" text="Customer Tracking" />
//       </div>

//       {/* Mobile Menu Toggle */}
//       <div className="md:hidden">
//         {menuOpen ? (
//           <FiX
//             size={24}
//             className="cursor-pointer"
//             onClick={() => setMenuOpen(false)}
//           />
//         ) : (
//           <FiMenu
//             size={24}
//             className="cursor-pointer"
//             onClick={() => setMenuOpen(true)}
//           />
//         )}
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4">
//           <NavItem to="/seller-dashboard" text="Dashboard" active />
//           <NavItem to="/product-management" text="Product Management" />
//           <NavItem to="/order-management" text="Order Management" />
//           <NavItem to="/customer-tracking" text="Customer Tracking" />
//         </div>
//       )}
//     </nav>
//   );
// };

// // Reusable NavItem Component
// const NavItem = ({ to, text, active }) => (
//   <Link
//     to={to}
//     className={`block px-4 py-2 text-sm font-medium ${
//       active ? "text-orange-500" : "text-gray-600"
//     } hover:text-orange-600`}
//   >
//     {text}
//   </Link>
// );

// export default SellerNavbar;







// src/components/SellerNavbar.jsx
// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom"; // Added useLocation
// import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi"; // Added FiUser and FiLogOut

// const SellerNavbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle
//   const [profileMenuOpen, setProfileMenuOpen] = useState(false); // State for profile dropdown toggle

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
//       {/* Logo */}
//       <h1 className="text-xl font-bold text-orange-500">GroceryDash (Seller)</h1>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex space-x-6 items-center">
//         <NavItem to="/seller-dashboard" text="Dashboard" />
//         <NavItem to="/product-management" text="Product Management" />
//         <NavItem to="/order-management" text="Order Management" />
//         <NavItem to="/customer-tracking" text="Customer Tracking" />

//         {/* Profile Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setProfileMenuOpen(!profileMenuOpen)}
//             className="flex items-center focus:outline-none"
//           >
//             <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//               <FiUser className="text-gray-600" size={20} />
//             </div>
//           </button>

//           {/* Dropdown Menu */}
//           {profileMenuOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
//               <Link
//                 to="/profile"
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 Profile
//               </Link>
//               <Link
//                 to="/settings"
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 Settings
//               </Link>
//               <button
//                 onClick={() => {
//                   // Add logout logic here
//                   alert("Logged out!");
//                   setProfileMenuOpen(false);
//                 }}
//                 className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
//               >
//                 <FiLogOut className="mr-2" />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu Toggle */}
//       <div className="md:hidden">
//         {menuOpen ? (
//           <FiX
//             size={24}
//             className="cursor-pointer"
//             onClick={() => setMenuOpen(false)}
//           />
//         ) : (
//           <FiMenu
//             size={24}
//             className="cursor-pointer"
//             onClick={() => setMenuOpen(true)}
//           />
//         )}
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4">
//           <NavItem to="/seller-dashboard" text="Dashboard" />
//           <NavItem to="/product-management" text="Product Management" />
//           <NavItem to="/order-management" text="Order Management" />
//           <NavItem to="/customer-tracking" text="Customer Tracking" />

//           {/* Mobile Profile Dropdown */}
//           <div className="mt-4">
//             <button
//               onClick={() => setProfileMenuOpen(!profileMenuOpen)}
//               className="flex items-center focus:outline-none"
//             >
//               <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//                 <FiUser className="text-gray-600" size={20} />
//               </div>
//               <span className="ml-2 text-sm text-gray-700">Profile</span>
//             </button>

//             {/* Mobile Dropdown Menu */}
//             {profileMenuOpen && (
//               <div className="mt-2 space-y-2">
//                 <Link
//                   to="/profile"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Profile
//                 </Link>
//                 <Link
//                   to="/settings"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Settings
//                 </Link>
//                 <button
//                   onClick={() => {
//                     // Add logout logic here
//                     alert("Logged out!");
//                     setProfileMenuOpen(false);
//                   }}
//                   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
//                 >
//                   <FiLogOut className="mr-2" />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// // Reusable NavItem Component
// const NavItem = ({ to, text }) => {
//   const location = useLocation(); // Get the current location
//   const isActive = location.pathname === to; // Check if the current route matches the NavItem's route

//   return (
//     <Link
//       to={to}
//       className={`block px-4 py-2 text-sm font-medium ${
//         isActive ? "text-orange-500" : "text-gray-600"
//       } hover:text-orange-600`}
//     >
//       {text}
//     </Link>
//   );
// };

// export default SellerNavbar;









// src/components/SellerNavbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiHome, FiShoppingBag, FiDollarSign, FiPackage, FiSettings } from "react-icons/fi";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome },
  { name: 'Orders', href: '/orders', icon: FiShoppingBag },
  { name: 'Earnings', href: '/earnings', icon: FiDollarSign },
  { name: 'Products', href: '/products', icon: FiPackage },
  { name: 'Settings', href: '/settings', icon: FiSettings },
];

const SellerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold text-orange-500">GroceryDash (Seller)</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        {navigation.map((item) => (
          <NavItem 
            key={item.href}
            to={item.href} 
            text={item.name} 
            icon={item.icon}
          />
        ))}

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FiUser className="text-gray-600" size={20} />
            </div>
          </button>

          {/* Dropdown Menu */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
            </div>
          )}
        </div>
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
          {navigation.map((item) => (
            <NavItem 
              key={item.href}
              to={item.href} 
              text={item.name} 
              icon={item.icon}
            />
          ))}

          {/* Mobile Profile Dropdown */}
          <div className="mt-4">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FiUser className="text-gray-600" size={20} />
              </div>
              <span className="ml-2 text-sm text-gray-700">Profile</span>
            </button>

            {/* Mobile Dropdown Menu */}
            {profileMenuOpen && (
              <div className="mt-2 space-y-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable NavItem Component
const NavItem = ({ to, text, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-sm font-medium ${
        isActive ? "text-orange-500" : "text-gray-600"
      } hover:text-orange-600`}
    >
      <Icon className="mr-2" size={18} />
      {text}
    </Link>
  );
};

export default SellerNavbar;