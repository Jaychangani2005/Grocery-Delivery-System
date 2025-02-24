import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProductManagement from "./pages/ProductManagement";
import AddProduct from "./pages/AddProduct";
import ViewProduct from "./pages/ViewProduct";
import OrderManagement from "./pages/OrderManagement";


function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route - Redirect to Dashboard */}

        <Route path="/" element={<Dashboard />} />  
        <Route path="/" element={<OrderManagement />} />
        <Route path="/" element={<ProductManagement />} />
        <Route path="/" element={<AddProduct />} />
        <Route path="/" element={<ViewProduct />} />
        <Route path="/dashboard" element={<Navigate to="/" />} />
        <Route path="/products" element={<ProductManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
