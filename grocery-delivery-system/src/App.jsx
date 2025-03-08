// // import {  BrowserRouter as Router,  Routes,  Route,  Navigate,} from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// // import {Dashboard} from "./shopkeeper_pages/Dashboard";
// // // import Dashboard from "./shopkeeper_pages/Dashboard";
// // import ProductManagement from "./shopkeeper_pages/ProductManagement";

// import Dashboard from "./shopkeeper_pages/Dashboard.jsx";
// import ProductManagement from "./shopkeeper_pages/ProductManagement.jsx";

// import AddProduct from "./shopkeeper_pages/AddProduct";
// import ViewProduct from "./shopkeeper_pages/ViewProduct";
// import OrderManagement from "./shopkeeper_pages/OrderManagement";
// import OrderDetails from "./shopkeeper_pages/OrderDetails";
// import CustomerHistory from "./shopkeeper_pages/CustomerHistory";

// // Register
// import Register from "./login_page/End_use_RegistrationPage";
// import SellerRegistration from "./login_page/Seller_Registration";
// import DeliveryRegistration from "./login_page/Delivery_Registration";
// import Login from "./login_page/Login";

// // AdminDashboard
// import AdminDashboard from "./admin_page/AdminDashboard";
// import DeliveryPersonRequests from "./admin_page/DeliveryPersonRequests";
// import DeliveryPersonDetails from "./admin_page/DeliveryPersonDetails";
// import ManageShopkeepers from "./admin_page/ManageShopkeepers";
// import ManageDelivery from "./admin_page/ManageDelivery";
// import ViewUsers from "./admin_page/ViewUsers";
// import ShopkeeperRequests from "./admin_page/ShopkeeperRequests";
// import ShopkeeperDetails from "./admin_page/ShopkeeperDetails";

// function App() {
//   return (
//     // <Router>
//     //   <Routes>

//     //     <div>
//     //       <Link to="/">Dashboard</Link>
//     //       <Link to="/ProductManagement">ProductManagement</Link>
//     //     </div>
//     //     <Route path="/" element={<Dashboard />} />
//     //     <Route path="/ProductManagement" element={<ProductManagement />}  />
//     //     {/* Shopkeeper */}
//     //     {/* <Route path="/" element={<CustomerHistory />} /> */}
//     //     {/* <Route path="/" element={<OrderDetails />} /> */}
//     //     {/* <Route path="/" element={<OrderManagement />} /> */}
//     //     {/* <Route path="/" element={<AddProduct />} /> */}
//     //     {/* <Route path="/" element={<ProductManagement />} /> */}
//     //     {/* <Route path="/" element={<ViewProduct />} /> */}
//     //     {/* <Route path="/" element={<Dashboard />} /> */}

//     //     {/* Admin */}
//     //     {/* <Route path="/" element={<AdminDashboard />} /> */}
//     //     {/* <Route path="/" element={<ShopkeeperDetails/>} /> */}
//     //     {/* <Route path="/" element={<ShopkeeperRequests/>} /> */}
//     //     {/* <Route path="/" element={<DeliveryPersonDetails/>} /> */}
//     //     {/* <Route path="/" element={<DeliveryPersonRequests/>} /> */}
//     //     {/* <Route path="/" element={<ManageShopkeepers/>} /> */}
//     //     {/* <Route path="/" element={<ManageDelivery/>} /> */}
//     //     {/* <Route path="/" element={<ViewUsers />} /> */}

//     //     {/* Login */}
//     //     {/* <Route path="/" element={<Login />} /> */}
//     //     {/* <Route path="/" element={<SellerRegistration />} /> */}
//     //     {/* <Route path="/" element={<DeliveryRegistration />} /> */}
//     //     {/* <Route path="/" element={<Register />} /> */}
//     //     {/* <Route path="/products" element={<ProductManagement />} /> */}
//     //     {/* <Route path="/dashboard" element={<Navigate to="/" />} /> */}
//     //   </Routes>
//     // </Router>

//     <Router>
//     <div>
//       <nav>
//         <Link to="/">Dashboard</Link>
//         <Link to="/ProductManagement">Product Management</Link>
//       </nav>

//       {/* ✅ Routes Wrapper */}
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/ProductManagement" element={<ProductManagement />} />
//       </Routes>
//     </div>
//   </Router>

//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// // Shopkeeper Pages
// import Dashboard from "./shopkeeper_pages/Dashboard.jsx";
// import ProductManagement from "./shopkeeper_pages/ProductManagement.jsx";
// import AddProduct from "./shopkeeper_pages/AddProduct";
// import ViewProduct from "./shopkeeper_pages/ViewProduct";
// import OrderManagement from "./shopkeeper_pages/OrderManagement";
// import OrderDetails from "./shopkeeper_pages/OrderDetails";
// import CustomerHistory from "./shopkeeper_pages/CustomerHistory";

// // Register & Login Pages
// import Register from "./login_page/End_use_RegistrationPage";
// import SellerRegistration from "./login_page/Seller_Registration";
// import DeliveryRegistration from "./login_page/Delivery_Registration";
// import Login from "./login_page/Login";

// // Admin Pages
// import AdminDashboard from "./admin_page/AdminDashboard";
// import DeliveryPersonRequests from "./admin_page/DeliveryPersonRequests";
// import DeliveryPersonDetails from "./admin_page/DeliveryPersonDetails";
// import ManageShopkeepers from "./admin_page/ManageShopkeepers";
// import ManageDelivery from "./admin_page/ManageDelivery";
// import ViewUsers from "./admin_page/ViewUsers";
// import ShopkeeperRequests from "./admin_page/ShopkeeperRequests";
// import ShopkeeperDetails from "./admin_page/ShopkeeperDetails";

// function App() {
//   return (
//     <Router>
//       <div>
//         {/* ✅ Navigation Links */}
//         <nav>
//           <Link to="/">Dashboard</Link>
//           <Link to="/ProductManagement">Product Management</Link>
//           <Link to="/OrderManagement">Order Management</Link>
//           <Link to="/AdminDashboard">Admin Dashboard</Link>
//           <Link to="/Login">Login</Link>
//         </nav>

//         {/* ✅ Routes Setup */}
//         <Routes>
//           {/* Shopkeeper Routes */}
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/ProductManagement" element={<ProductManagement />} />
//           <Route path="/AddProduct" element={<AddProduct />} />
//           <Route path="/ViewProduct" element={<ViewProduct />} />
//           <Route path="/OrderManagement" element={<OrderManagement />} />
//           <Route path="/OrderDetails" element={<OrderDetails />} />
//           <Route path="/CustomerHistory" element={<CustomerHistory />} />

//           {/* Admin Routes */}
//           <Route path="/AdminDashboard" element={<AdminDashboard />} />
//           <Route path="/ShopkeeperRequests" element={<ShopkeeperRequests />} />
//           <Route path="/ShopkeeperDetails" element={<ShopkeeperDetails />} />
//           <Route path="/DeliveryPersonRequests" element={<DeliveryPersonRequests />} />
//           <Route path="/DeliveryPersonDetails" element={<DeliveryPersonDetails />} />
//           <Route path="/ManageShopkeepers" element={<ManageShopkeepers />} />
//           <Route path="/ManageDelivery" element={<ManageDelivery />} />
//           <Route path="/ViewUsers" element={<ViewUsers />} />

//           {/* Registration & Login Routes */}
//           <Route path="/Login" element={<Login />} />
//           <Route path="/Register" element={<Register />} />
//           <Route path="/SellerRegistration" element={<SellerRegistration />} />
//           <Route path="/DeliveryRegistration" element={<DeliveryRegistration />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;











// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi"; // Import icons

// // Shopkeeper Pages
// import Dashboard from "./shopkeeper_pages/Dashboard.jsx";
// import ProductManagement from "./shopkeeper_pages/ProductManagement.jsx";
// import AddProduct from "./shopkeeper_pages/AddProduct";
// import ViewProduct from "./shopkeeper_pages/ViewProduct";
// import OrderManagement from "./shopkeeper_pages/OrderManagement";
// import OrderDetails from "./shopkeeper_pages/OrderDetails";
// import CustomerHistory from "./shopkeeper_pages/CustomerHistory";

// // Register & Login Pages
// import Register from "./login_page/End_use_RegistrationPage";
// import SellerRegistration from "./login_page/Seller_Registration";
// import DeliveryRegistration from "./login_page/Delivery_Registration";
// import Login from "./login_page/Login";

// // Admin Pages
// import AdminDashboard from "./admin_page/AdminDashboard";
// import DeliveryPersonRequests from "./admin_page/DeliveryPersonRequests";
// import DeliveryPersonDetails from "./admin_page/DeliveryPersonDetails";
// import ManageShopkeepers from "./admin_page/ManageShopkeepers";
// import ManageDelivery from "./admin_page/ManageDelivery";
// import ViewUsers from "./admin_page/ViewUsers";
// import ShopkeeperRequests from "./admin_page/ShopkeeperRequests";
// import ShopkeeperDetails from "./admin_page/ShopkeeperDetails";

// function App() {
//   const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

//   return (
//     <Router>
//       <div>
//         {/* ✅ Navigation Links */}
//         <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6">
//             <NavItem to="/" text="Dashboard" />
//             <NavItem to="/product-management" text="Product Management" />
//             <NavItem to="/order-management" text="Order Management" />
//             <NavItem to="/admin-dashboard" text="Admin Dashboard" />
//             <NavItem to="/login" text="Login" />
//           </div>

//           {/* Mobile Menu Toggle */}
//           <div className="md:hidden">
//             {menuOpen ? (
//               <FiX
//                 size={24}
//                 className="cursor-pointer"
//                 onClick={() => setMenuOpen(false)}
//               />
//             ) : (
//               <FiMenu
//                 size={24}
//                 className="cursor-pointer"
//                 onClick={() => setMenuOpen(true)}
//               />
//             )}
//           </div>
//         </nav>

//         {/* Mobile Dropdown Menu */}
//         {menuOpen && (
//           <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4">
//             <NavItem to="/" text="Dashboard" />
//             <NavItem to="/product-management" text="Product Management" />
//             <NavItem to="/order-management" text="Order Management" />
//             <NavItem to="/admin-dashboard" text="Admin Dashboard" />
//             <NavItem to="/login" text="Login" />
//           </div>
//         )}

//         {/* ✅ Routes Setup */}
//         <Routes>
//           {/* Shopkeeper Routes */}
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/product-management" element={<ProductManagement />} />
//           <Route path="/add-product" element={<AddProduct />} />
//           <Route path="/view-product" element={<ViewProduct />} />
//           <Route path="/order-management" element={<OrderManagement />} />
//           <Route path="/order-details" element={<OrderDetails />} />
//           <Route path="/customer-history" element={<CustomerHistory />} />

//           {/* Admin Routes */}
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/shopkeeper-requests" element={<ShopkeeperRequests />} />
//           <Route path="/shopkeeper-details" element={<ShopkeeperDetails />} />
//           <Route
//             path="/delivery-person-requests"
//             element={<DeliveryPersonRequests />}
//           />
//           <Route
//             path="/delivery-person-details"
//             element={<DeliveryPersonDetails />}
//           />
//           <Route path="/manage-shopkeepers" element={<ManageShopkeepers />} />
//           <Route path="/manage-delivery" element={<ManageDelivery />} />
//           <Route path="/view-users" element={<ViewUsers />} />

//           {/* Registration & Login Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/seller-registration" element={<SellerRegistration />} />
//           <Route
//             path="/delivery-registration"
//             element={<DeliveryRegistration />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// // ✅ Reusable NavItem Component
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

// export default App;















// // App.js
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar"; // Import the Navbar component

// // Shopkeeper Pages
// import Dashboard from "./shopkeeper_pages/Dashboard.jsx";
// import ProductManagement from "./shopkeeper_pages/ProductManagement.jsx";
// import AddProduct from "./shopkeeper_pages/AddProduct";
// import ViewProduct from "./shopkeeper_pages/ViewProduct";
// import OrderManagement from "./shopkeeper_pages/OrderManagement";
// import OrderDetails from "./shopkeeper_pages/OrderDetails";
// import CustomerHistory from "./shopkeeper_pages/CustomerHistory";

// // Register & Login Pages
// import Register from "./login_page/End_use_RegistrationPage";
// import SellerRegistration from "./login_page/Seller_Registration";
// import DeliveryRegistration from "./login_page/Delivery_Registration";
// import Login from "./login_page/Login";

// // Admin Pages
// import AdminDashboard from "./admin_page/AdminDashboard";
// import DeliveryPersonRequests from "./admin_page/DeliveryPersonRequests";
// import DeliveryPersonDetails from "./admin_page/DeliveryPersonDetails";
// import ManageShopkeepers from "./admin_page/ManageShopkeepers";
// import ManageDelivery from "./admin_page/ManageDelivery";
// import ViewUsers from "./admin_page/ViewUsers";
// import ShopkeeperRequests from "./admin_page/ShopkeeperRequests";
// import ShopkeeperDetails from "./admin_page/ShopkeeperDetails";

// function App() {
//   return (
//     <Router>
//       <div>
//         {/* Use the Navbar Component */}
//         <Navbar />

//         {/* Routes Setup */}
//         <Routes>
//           {/* Shopkeeper Routes */}
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/product-management" element={<ProductManagement />} />
//           <Route path="/add-product" element={<AddProduct />} />
//           <Route path="/view-product" element={<ViewProduct />} />
//           <Route path="/order-management" element={<OrderManagement />} />
//           <Route path="/order-details" element={<OrderDetails />} />
//           <Route path="/customer-history" element={<CustomerHistory />} />

//           {/* Admin Routes */}
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/shopkeeper-requests" element={<ShopkeeperRequests />} />
//           <Route path="/shopkeeper-details" element={<ShopkeeperDetails />} />
//           <Route
//             path="/delivery-person-requests"
//             element={<DeliveryPersonRequests />}
//           />
//           <Route
//             path="/delivery-person-details"
//             element={<DeliveryPersonDetails />}
//           />
//           <Route path="/manage-shopkeepers" element={<ManageShopkeepers />} />
//           <Route path="/manage-delivery" element={<ManageDelivery />} />
//           <Route path="/view-users" element={<ViewUsers />} />

//           {/* Registration & Login Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/seller-registration" element={<SellerRegistration />} />
//           <Route
//             path="/delivery-registration"
//             element={<DeliveryRegistration />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;








// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { UserProvider, UserContext } from "./context/UserContext"; // Correct path
// import { useContext } from "react";

// // Navbars
// import SellerNavbar from "./components/SellerNavbar";
// import AdminNavbar from "./components/AdminNavbar";

// // Pages
// import Dashboard from "./shopkeeper_pages/Dashboard";
// import ProductManagement from "./shopkeeper_pages/ProductManagement";
// import OrderManagement from "./shopkeeper_pages/OrderManagement";
// import AdminDashboard from "./admin_page/AdminDashboard";
// import ManageShopkeepers from "./admin_page/ManageShopkeepers";
// import ViewUsers from "./admin_page/ViewUsers";
// import Login from "./login_page/Login";
// import SellerRegistration from "./login_page/Seller_Registration";

// function App() {
//   const { user } = useContext(UserContext);

//   return (
//     <Router>
//       {/* Conditionally render the navbar based on the user's role */}
//       {user?.role === "seller" && <SellerNavbar />}
//       {user?.role === "admin" && <AdminNavbar />}

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/seller-registration" element={<SellerRegistration />} />

//         {/* Seller Routes */}
//         {user?.role === "seller" && (
//           <>
//             <Route path="/seller-dashboard" element={<Dashboard />} />
//             <Route path="/product-management" element={<ProductManagement />} />
//             <Route path="/order-management" element={<OrderManagement />} />
//           </>
//         )}

//         {/* Admin Routes */}
//         {user?.role === "admin" && (
//           <>
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//             <Route path="/manage-shopkeepers" element={<ManageShopkeepers />} />
//             <Route path="/view-users" element={<ViewUsers />} />
//           </>
//         )}

//         {/* Redirect to login if no user is logged in */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// // Wrap the App with UserProvider
// export default function AppWrapper() {
//   return (
//     <UserProvider>
//       <App />
//     </UserProvider>
//   );
// }







// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { UserProvider, UserContext } from "./context/UserContext";
// import { useContext } from "react";

// // Navbars
// import SellerNavbar from "./components/SellerNavbar";
// import AdminNavbar from "./components/AdminNavbar"; // Import the AdminNavbar

// // Pages
// import Dashboard from "./shopkeeper_pages/Dashboard";
// import ProductManagement from "./shopkeeper_pages/ProductManagement";
// import OrderManagement from "./shopkeeper_pages/OrderManagement";
// import CustomerHistory from "./shopkeeper_pages/CustomerHistory";

// import AdminDashboard from "./admin_page/AdminDashboard";
// import ManageShopkeepers from "./admin_page/ManageShopkeepers";
// import ManageDelivery from "./admin_page/ManageDelivery";
// import ViewUsers from "./admin_page/ViewUsers";
// import Login from "./login_page/Login";
// import SellerRegistration from "./login_page/Seller_Registration";


// function App() {
//   const { user } = useContext(UserContext);

//   return (
//     <Router>
//       {/* Conditionally render the navbar based on the user's role */}
//       {user?.role === "seller" && <SellerNavbar />}
//       {user?.role === "admin" && <AdminNavbar />} {/* Use AdminNavbar for admin */}

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/seller-registration" element={<SellerRegistration />} />

//         {/* Seller Routes */}
//         {user?.role === "seller" && (
//           <>
//             <Route path="/seller-dashboard" element={<Dashboard />} />
//             <Route path="/product-management" element={<ProductManagement />} />
//             <Route path="/order-management" element={<OrderManagement />} />
//             <Route path="/Customer-History" element={<CustomerHistory />} />

//           </>
//         )}

//         {/* Admin Routes */}
//         {user?.role === "admin" && (
//           <>
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//             <Route path="/manage-shopkeepers" element={<ManageShopkeepers />} />
//             <Route path="/manage-delivery" element={<ManageDelivery />} />
//             <Route path="/view-users" element={<ViewUsers />} />
//           </>
//         )}

//         {/* Redirect to login if no user is logged in */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// // Wrap the App with UserProvider
// export default function AppWrapper() {
//   return (
//     <UserProvider>
//       <App />
//     </UserProvider>
//   );
// }







// workinggggg
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, UserContext } from "./context/UserContext";
import { useContext } from "react";

import Login from "./login_page/Login";
import DeliveryRegistration from "./login_page/Delivery_Registration";
import EndUserRegistration from "./login_page/End_use_RegistrationPage";
import SellerRegistration from "./login_page/Seller_Registration";


// Navbars
import SellerNavbar from "./components/SellerNavbar";
import AdminNavbar from "./components/AdminNavbar";

// Pages
import Dashboard from "./shopkeeper_pages/Dashboard";
import ProductManagement from "./shopkeeper_pages/ProductManagement";
import OrderManagement from "./shopkeeper_pages/OrderManagement";
import CustomerHistory from "./shopkeeper_pages/CustomerHistory"; // Ensure this matches the file name

import AdminDashboard from "./admin_page/AdminDashboard";
import ManageShopkeepers from "./admin_page/ManageShopkeepers";
import ManageDelivery from "./admin_page/ManageDelivery";
import ViewUsers from "./admin_page/ViewUsers";
// import Login from "./login_page/Login";
// import SellerRegistration from "./login_page/Seller_Registration";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      {/* Conditionally render the navbar based on the user's role */}
      {user?.role === "seller" && <SellerNavbar />}
      {user?.role === "admin" && <AdminNavbar />}

      <Routes>
        {/* Public Routes */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/seller-registration" element={<SellerRegistration />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/delivery-registration" element={<DeliveryRegistration />} />
        <Route path="/end-user-registration" element={<EndUserRegistration />} />
        <Route path="/seller-registration" element={<SellerRegistration />} />


        {/* Seller Routes */}
        {user?.role === "seller" && (
          <>
            <Route path="/seller-dashboard" element={<Dashboard />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route path="/customer-tracking" element={<CustomerHistory />} /> {/* Updated path */}
          </>
        )}

        {/* Admin Routes */}
        {user?.role === "admin" && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/manage-shopkeepers" element={<ManageShopkeepers />} />
            <Route path="/manage-delivery" element={<ManageDelivery />} />
            <Route path="/view-users" element={<ViewUsers />} />
          </>
        )}

        {/* Redirect to login if no user is logged in */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

// Wrap the App with UserProvider
export default function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}