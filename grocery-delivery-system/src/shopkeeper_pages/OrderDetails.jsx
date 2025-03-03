import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const OrderDetails = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Dummy Order Data (Replace with actual data from API)
  const order = {
    order_id: "ORD12345",
    product_name: "Organic Apple",
    category: "Fruits",
    subcategory: "Organic",
    description: "Fresh organic apples from Himachal Pradesh",
    price: "₹250",
    quantity: "2 kg",
    total_price: "₹500",
    customer_name: "Rahul Sharma",
    phone_number: "9876543210",
    // email: "rahul@example.com",
    delivery_address: "123, Green Street, Mumbai",
    payment_status: "Paid",
    order_status: "Pending",
    order_date: "24 Feb 2025",
    // estimated_delivery: "26 Feb 2025",
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

        <div className="hidden md:flex space-x-6">
          <NavItem text="Dashboard" />
          <NavItem text="Product Management" active/>
          <NavItem text="Order Management"  />
          <NavItem text="Customer Tracking" />
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
          <NavItem text="Product Management" />
          <NavItem text="Order Management" active />
          <NavItem text="Customer Tracking" />
        </div>
      )}

      {/* ✅ Page Content */}
      <div className="mt-20 p-6">
        <h2 className="text-2xl font-semibold text-orange-500 mb-6 text-center">
          Order Details
        </h2>

        {/* ✅ Order Info Card */}
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-4">
            Order Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Order ID" value={order.order_id} />
            <InfoRow label="Order Date" value={order.order_date} />
            {/* <InfoRow label="Estimated Delivery" value={order.estimated_delivery} /> */}
            <InfoRow label="Order Status" value={order.order_status} />
            <InfoRow label="Payment Status" value={order.payment_status} />
          </div>

          <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mt-6 mb-4">
            Product Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Product Name" value={order.product_name} />
            <InfoRow label="Category" value={order.category} />
            <InfoRow label="Subcategory" value={order.subcategory} />
            <InfoRow label="Price" value={order.price} />
            <InfoRow label="Quantity" value={order.quantity} />
            <InfoRow label="Total Price" value={order.total_price} />
            <div className="col-span-2">
              <InfoRow label="Description" value={order.description} />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mt-6 mb-4">
            Customer Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Customer Name" value={order.customer_name} />
            <InfoRow label="Phone Number" value={order.phone_number} />
            {/* <InfoRow label="Email" value={order.email} /> */}
            <div className="col-span-2">
              <InfoRow label="Delivery Address" value={order.delivery_address} />
            </div>
          </div>

          {/* ✅ Accept & Deny Buttons */}
          <div className="flex justify-between mt-6">
            <button className="bg-green-500 text-white px-5 py-2 rounded-full text-sm transition hover:opacity-80">
              Accept
            </button>
            <button className="bg-red-500 text-white px-5 py-2 rounded-full text-sm transition hover:opacity-80">
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Info Row Component
const InfoRow = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="text-gray-700 font-semibold">{value}</span>
  </div>
);

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

export default OrderDetails;
