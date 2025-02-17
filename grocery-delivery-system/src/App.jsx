// import Dashboard from "./Dashboard";

// function App() {
//   return <Dashboard />;
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import ProductManagement from "./pages/ProductManagement";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/products" element={<ProductManagement />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


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

        <Route path="/" element={<OrderManagement />} />
        <Route path="/" element={<ViewProduct />} />
        <Route path="/" element={<ProductManagement />} />
        <Route path="/" element={<AddProduct />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/" />} />
        <Route path="/products" element={<ProductManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
