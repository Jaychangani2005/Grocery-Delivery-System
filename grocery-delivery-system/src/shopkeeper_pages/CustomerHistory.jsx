import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const CustomerHistory = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Dummy Customer Order History Data (Replace with actual data from API)
  const orderHistory = [
    {
      order_id: "ORD001",
      customer_name: "Rahul Sharma",
      phone_number: "9876543210",
      email: "rahul@example.com",
      total_items: 3,
      total_price: "₹750",
      order_date: "20 Feb 2025",
      delivery_date: "22 Feb 2025",
      payment_status: "Paid",
      order_status: "Delivered",
    },
    {
      order_id: "ORD002",
      customer_name: "Priya Mehta",
      phone_number: "9871234560",
      email: "priya@example.com",
      total_items: 5,
      total_price: "₹1250",
      order_date: "18 Feb 2025",
      delivery_date: "20 Feb 2025",
      payment_status: "Paid",
      order_status: "Delivered",
    },
    {
      order_id: "ORD003",
      customer_name: "Amit Verma",
      phone_number: "9988776655",
      email: "amit@example.com",
      total_items: 2,
      total_price: "₹500",
      order_date: "15 Feb 2025",
      delivery_date: "17 Feb 2025",
      payment_status: "Pending",
      order_status: "Processing",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Navbar */}

      {/* <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

        <div className="hidden md:flex space-x-6">
          <NavItem text="Dashboard" />
          <NavItem text="Product Management" />
          <NavItem text="Order Management"  />
          <NavItem text="Customer Details" active/>
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
      )} */}


      {/* ✅ Page Content */}
      <div className="mt-20 p-6">
        <h2 className="text-2xl font-semibold text-orange-500 mb-6 text-center">
          Customer Order History
        </h2>

        {/* ✅ Order History Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer Name</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Total Items</th>
                <th className="px-4 py-3 text-left">Total Price</th>
                <th className="px-4 py-3 text-left">Order Date</th>
                <th className="px-4 py-3 text-left">Delivery Date</th>
                <th className="px-4 py-3 text-left">Payment Status</th>
                <th className="px-4 py-3 text-left">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-3">{order.order_id}</td>
                  <td className="px-4 py-3">{order.customer_name}</td>
                  <td className="px-4 py-3">{order.phone_number}</td>
                  <td className="px-4 py-3">{order.email}</td>
                  <td className="px-4 py-3">{order.total_items}</td>
                  <td className="px-4 py-3">{order.total_price}</td>
                  <td className="px-4 py-3">{order.order_date}</td>
                  <td className="px-4 py-3">{order.delivery_date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.payment_status === "Paid"
                          ? "bg-green-200 text-green-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.order_status === "Delivered"
                          ? "bg-blue-200 text-blue-700"
                          : "bg-orange-200 text-orange-700"
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

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

export default CustomerHistory;
