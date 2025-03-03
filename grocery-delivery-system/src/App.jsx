import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./shopkeeper_pages/Dashboard";
import ProductManagement from "./shopkeeper_pages/ProductManagement";
import AddProduct from "./shopkeeper_pages/AddProduct";
import ViewProduct from "./shopkeeper_pages/ViewProduct";
import OrderManagement from "./shopkeeper_pages/OrderManagement";
import OrderDetails from "./shopkeeper_pages/OrderDetails";
import CustomerHistory from "./shopkeeper_pages/CustomerHistory";


// Register
import Register from "./login_page/End_use_RegistrationPage";
import SellerRegistration from "./login_page/Seller_Registration";
import DeliveryRegistration from "./login_page/Delivery_Registration";
import Login from "./login_page/Login";


// AdminDashboard
import AdminDashboard from "./admin_page/AdminDashboard";
import ShopkeeperDetails from "./admin_page/shopkeeperRequest";
import DeliveryPersonDetails from "./admin_page/DeliveryPersonRequest";
import ManageShopkeepers from "./admin_page/ManageShopkeepers";
import ManageDelivery from "./admin_page/ManageDelivery";
import ViewUsers from "./admin_page/ViewUsers";


function App() {
  return (
    <Router>
      <Routes>

        {/* Shopkeeper */}
        <Route path="/" element={<CustomerHistory />} />
        <Route path="/" element={<OrderDetails />} />
        <Route path="/" element={<OrderManagement />} />
        <Route path="/" element={<AddProduct />} />
        <Route path="/" element={<ProductManagement />} />
        <Route path="/" element={<ViewProduct />} />
        <Route path="/" element={<Dashboard />} />


        {/* Admin */}
        <Route path="/" element={<AdminDashboard/>} />
        <Route path="/" element={<ManageShopkeepers/>} />
        <Route path="/" element={<ShopkeeperDetails/>} />
        <Route path="/" element={<ViewUsers/>} />
        <Route path="/" element={<ManageDelivery/>} />
        <Route path="/" element={<DeliveryPersonDetails/>} />
        <Route path="/" element={<SellerRegistration />} />


        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/" element={<DeliveryRegistration />} />
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Navigate to="/" />} />
        <Route path="/products" element={<ProductManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
