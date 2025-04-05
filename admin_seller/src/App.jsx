import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./shopkeeper_pages/Dashboard";
import ProductManagement from "./shopkeeper_pages/ProductManagement";
import AddProduct from "./shopkeeper_pages/AddProduct";
import ViewProduct from "./shopkeeper_pages/ViewProduct";
import OrderManagement from "./shopkeeper_pages/OrderManagement";
import OrderDetails from "./shopkeeper_pages/OrderDetails";
import ViewOrderDetails from "./shopkeeper_pages/ViewOrderDetails";
import AdminDashboard from "./admin_page/AdminDashboard";
import ShopkeeperRequest from "./admin_page/shopkeeperRequest";
import ShopkeeperDetails from "./admin_page/ShopkeeperDetails";
import DeliveryPersonDetails from "./admin_page/DeliveryPersonDetails";
import ManageShopkeepers from "./admin_page/ManageShopkeepers";
import ManageDelivery from "./admin_page/ManageDelivery";
import ViewUsers from "./admin_page/ViewUsers";
import EditProduct from "./shopkeeper_pages/EditProduct";
import AdminLogin from "./admin_page/AdminLogin";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ManageDeliveries from "./admin_page/ManageDeliveries";
import DeliveryAgentDetails from "./admin_page/DeliveryAgentDetails";
import UserDetails from "./admin_page/UserDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Seller Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/view-product/:productId" element={<ViewProduct />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/order-details/:orderId" element={<OrderDetails />} />
        <Route path="/profile" element={<h1>Profile Page (Coming Soon)</h1>} />
        <Route path="/settings" element={<h1>Settings Page (Coming Soon)</h1>} />
        <Route path="/edit-product/:productId" element={<EditProduct />} />
        <Route path="/view-order-details/:orderId" element={<ViewOrderDetails />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-shopkeepers" element={<ManageShopkeepers />} />
        <Route path="/shopkeeper-details/:id" element={<ShopkeeperDetails />} />
        <Route path="/view-users" element={<ViewUsers />} />
        <Route path="/manage-delivery" element={<ManageDelivery />} />
        <Route path="/delivery-person-details/:id" element={<DeliveryPersonDetails />} />
        <Route path="/shopkeeper-request" element={<ShopkeeperRequest />} />
        <Route path="/admin/delivery-agents" element={<ManageDeliveries />} />
        <Route path="/admin/delivery-agents/:id" element={<DeliveryAgentDetails />} />
        <Route path="/admin/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
