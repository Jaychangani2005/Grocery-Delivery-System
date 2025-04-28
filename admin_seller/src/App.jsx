import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./shopkeeper_pages/Dashboard";
import ProductManagement from "./shopkeeper_pages/ProductManagement";
import AddProduct from "./shopkeeper_pages/AddProduct";
import ViewProduct from "./shopkeeper_pages/ViewProduct";
import OrderManagement from "./shopkeeper_pages/OrderManagement";
import OrderDetails from "./shopkeeper_pages/OrderDetails";
import ViewOrderDetails from "./shopkeeper_pages/ViewOrderDetails";
import NewOrders from "./shopkeeper_pages/orders/NewOrders";
import PendingOrders from "./shopkeeper_pages/orders/PendingOrders";
import OutForDelivery from "./shopkeeper_pages/orders/OutForDelivery";
import CompletedOrders from "./shopkeeper_pages/orders/CompletedOrders";
import CancelOrders from "./shopkeeper_pages/orders/CancelOrders";
import AdminDashboard from "./admin_page/AdminDashboard";
import ShopkeeperRequest from "./admin_page/shopkeeperRequest";
import ShopkeeperDetails from "./admin_page/ShopkeeperDetails";
import DeliveryPersonDetails from "./admin_page/DeliveryPersonDetails";
import ManageShopkeepers from "./admin_page/ManageShopkeepers";
import ManageDelivery from "./admin_page/ManageDelivery";
import ViewUsers from "./admin_page/ViewUsers";
import EditProduct from "./shopkeeper_pages/EditProduct";
import AdminLogin from "./admin_page/AdminLogin";
import ManageDeliveries from "./admin_page/ManageDeliveries";
import DeliveryAgentDetails from "./admin_page/DeliveryAgentDetails";
import UserDetails from "./admin_page/UserDetails";
import SellerEarnings from './shopkeeper_pages/SellerEarnings';
import Login from './login_page/Login';
import SellerRegistration from './login_page/Seller_Registration';
import DeliveryRegistration from './login_page/Delivery_Registration';
import EndUserRegistration from './login_page/End_use_RegistrationPage';
import { UserProvider } from './context/UserContext';
import Profile from "./shopkeeper_pages/Profile";
import SellerNavbar from "./components/SellerNavbar";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import DeliveryAgentVerification from "./shopkeeper_pages/DeliveryAgentVerification";

// Layout component for seller pages
const SellerLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-background">
      <SellerNavbar />
      <div className="flex-1 flex flex-col md:ml-64">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <SellerLayout>{children}</SellerLayout>;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/seller-registration" element={<SellerRegistration />} />
          <Route path="/delivery-registration" element={<DeliveryRegistration />} />
          <Route path="/end-user-registration" element={<EndUserRegistration />} />
          
          {/* Seller Routes - Protected */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><ProductManagement /></ProtectedRoute>} />
          <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/view-product/:productId" element={<ProtectedRoute><ViewProduct /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrderManagement /></ProtectedRoute>} />
          <Route path="/earnings" element={<ProtectedRoute><SellerEarnings /></ProtectedRoute>} />
          <Route path="/order-details/:orderId" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/edit-product/:productId" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
          <Route path="/view-order-details/:orderId" element={<ProtectedRoute><ViewOrderDetails /></ProtectedRoute>} />
          <Route path="/new-orders" element={<ProtectedRoute><NewOrders /></ProtectedRoute>} />
          <Route path="/pending-orders" element={<ProtectedRoute><PendingOrders /></ProtectedRoute>} />
          <Route path="/out-for-delivery" element={<ProtectedRoute><OutForDelivery /></ProtectedRoute>} />
          <Route path="/completed-orders" element={<ProtectedRoute><CompletedOrders /></ProtectedRoute>} />
          <Route path="/cancel-orders" element={<ProtectedRoute><CancelOrders /></ProtectedRoute>} />
          <Route path="/seller/delivery-verification" element={<ProtectedRoute><DeliveryAgentVerification /></ProtectedRoute>} />
          
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
          <Route path="/admin/delivery-verification" element={<DeliveryAgentVerification />} />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
