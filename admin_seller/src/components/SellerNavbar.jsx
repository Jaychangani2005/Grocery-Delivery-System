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
import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiHome, FiShoppingBag, FiPackage, FiTruck, FiCheckCircle, FiLogOut, FiSettings, FiXCircle } from "react-icons/fi";
import { UserContext } from "../context/UserContext";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome },
  { name: 'New Orders', href: '/new-orders', icon: FiShoppingBag },
  { name: 'Pending Orders', href: '/pending-orders', icon: FiPackage },
  { name: 'Out For Delivery', href: '/out-for-delivery', icon: FiTruck },
  { name: 'Completed Orders', href: '/completed-orders', icon: FiCheckCircle },
  { name: 'Cancel Orders', href: '/cancel-orders', icon: FiXCircle },
  { name: 'Products', href: '/products', icon: FiPackage },
  { name: 'Delivery Verification', href: '/seller/delivery-verification', icon: FiSettings },
];

const SellerNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileOpen && !event.target.closest('.profile-menu')) {
        setProfileOpen(false);
      }
    };

    // Add event listener for closing sidebar
    const handleCloseSidebar = () => {
      setSidebarOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('closeSidebar', handleCloseSidebar);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('closeSidebar', handleCloseSidebar);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiMenu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-green-600">ApnaKirana</h1>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors profile-menu"
          >
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <FiUser className="w-5 h-5 text-green-600" />
            </div>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Seller'}</p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setProfileOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`sidebar fixed inset-0 z-50 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h1 className="text-xl font-bold text-green-600">ApnaKirana</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiX className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-green-600">ApnaKirana</h1>
          </div>
          <div className="flex-grow flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  if (!profileOpen) {
                    navigate('/profile');
                  }
                }}
                className="w-full flex items-center focus:outline-none profile-menu"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-3 flex-grow">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Seller'}</p>
                  <p className="text-xs text-gray-500">View Profile</p>
                </div>
              </button>
              
              {profileOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Seller'}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerNavbar;