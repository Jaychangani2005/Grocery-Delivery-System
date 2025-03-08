// import { useState } from "react";
// import { FiMenu, FiX, FiSearch, FiCalendar } from "react-icons/fi";

// export default function OrderManagement() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");

//   const orders = [
//     { id: "#101", customer: "John Doe", address: "123 Main St", date: "2025-02-10", status: "Delivered" },
//     { id: "#102", customer: "Jane Smith", address: "456 Park Ave", date: "2025-02-12", status: "Pending" },
//     { id: "#103", customer: "Alice Johnson", address: "789 Elm St", date: "2025-02-14", status: "Shipped" },
//   ];

//   const filteredOrders = orders.filter((order) =>
//     order.customer.toLowerCase().includes(search.toLowerCase()) &&
//     (filter === "all" || (filter === "week" && isWithinWeek(order.date)) || (filter === "month" && isWithinMonth(order.date)))
//   );

//   function isWithinWeek(date) {
//     const orderDate = new Date(date);
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//     return orderDate >= oneWeekAgo;
//   }

//   function isWithinMonth(date) {
//     const orderDate = new Date(date);
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//     return orderDate >= oneMonthAgo;
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* ✅ Navbar */}
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

//         <div className="hidden md:flex space-x-6">
//           <NavItem text="Dashboard" />
//           <NavItem text="Product Management" />
//           <NavItem text="Order Management" active />
//           <NavItem text="Customer Tracking" />
//         </div>

//         <div className="md:hidden">
//           {menuOpen ? (
//             <FiX size={24} className="cursor-pointer" onClick={() => setMenuOpen(false)} />
//           ) : (
//             <FiMenu size={24} className="cursor-pointer" onClick={() => setMenuOpen(true)} />
//           )}
//         </div>
//       </nav>

//       {menuOpen && (
//         <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4">
//           <NavItem text="Dashboard" />
//           <NavItem text="Product Management" />
//           <NavItem text="Order Management" active />
//           <NavItem text="Customer Tracking" />
//         </div>
//       )}

//       {/* ✅ Order Management Section */}
//       <div className="mt-20 p-6">
//         <Section title="Order History">
//           <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
//             {/* 🔍 Search Bar */}
//             <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 shadow-md">
//               <FiSearch className="text-gray-500 mr-2" />
//               <input
//                 type="text"
//                 placeholder="Search order..."
//                 className="outline-none w-full"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>

//             {/* 📅 Date Filters */}
//             <div className="flex items-center space-x-3">
//               <button onClick={() => setFilter("all")} className={getButtonStyle(filter === "all")}>All</button>
//               <button onClick={() => setFilter("week")} className={getButtonStyle(filter === "week")}>Last Week</button>
//               <button onClick={() => setFilter("month")} className={getButtonStyle(filter === "month")}>Last Month</button>
//               <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
//                 <FiCalendar className="mr-2" /> Select Date
//               </button>
//             </div>
//           </div>

//           {/* 📌 Order Table */}
//           <ResponsiveTable
//             headers={["Order ID", "Customer", "Address", "Date", "Status", "Actions"]}
//             data={filteredOrders}
//             renderRow={(order) => (
//               <>
//                 <td className="p-3">{order.id}</td>
//                 <td>{order.customer}</td>
//                 <td>{order.address}</td>
//                 <td>{order.date}</td>
//                 <td>
//                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="flex gap-2">
//                   <ActionButton text="View" color="gray" />
//                   <ActionButton text="Cancel" color="red" />
//                 </td>
//               </>
//             )}
//             isActionColumn
//           />
//         </Section>
//       </div>
//     </div>
//   );
// }

// /* ✅ Navbar Item */
// const NavItem = ({ text, active }) => (
//   <a href="#" className={`block px-4 py-2 text-sm font-medium ${active ? "text-orange-500" : "text-gray-600"} hover:text-orange-600`}>
//     {text}
//   </a>
// );

// /* ✅ Page Section */
// const Section = ({ title, children }) => (
//   <section className="mt-8">
//     <h2 className="text-xl font-semibold">{title}</h2>
//     <div className="bg-white shadow-md rounded-lg mt-4 p-4">{children}</div>
//   </section>
// );

// /* ✅ Responsive Table */
// const ResponsiveTable = ({ headers, data, renderRow, isActionColumn = false }) => (
//   <div className="overflow-x-auto">
//     <table className="w-full hidden md:table border-collapse">
//       <thead>
//         <tr className="bg-orange-100 text-gray-700">
//           {headers.map((header, index) => (
//             <th key={index} className="p-3 text-left">{header}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index} className="border-t bg-orange-50 hover:bg-orange-100 transition">
//             {renderRow(item)}
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     <div className="md:hidden">
//       {data.map((item, index) => (
//         <div key={index} className="bg-white p-4 shadow-md rounded-lg my-2">
//           {headers.map((header, idx) => (
//             <p key={idx} className="text-gray-700">
//               <strong>{header}:</strong> {Object.values(item)[idx]}
//             </p>
//           ))}
//           {isActionColumn && (
//             <div className="flex gap-2 mt-2">
//               <ActionButton text="View" color="gray" />
//               <ActionButton text="Cancel" color="red" />
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// );

// /* ✅ Action Buttons */
// const ActionButton = ({ text, color }) => {
//   const colors = {
//     gray: "bg-gray-500",
//     red: "bg-red-500",
//   };

//   return (
//     <button className={`${colors[color]} text-white px-3 py-1 rounded-full text-sm transition hover:opacity-80`}>
//       {text}
//     </button>
//   );
// };

// /* ✅ Utility Functions */
// const getButtonStyle = (active) => `px-4 py-2 rounded-lg transition ${active ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-orange-300"}`;
// const getStatusColor = (status) => status === "Delivered" ? "bg-green-200 text-green-700" : status === "Pending" ? "bg-yellow-200 text-yellow-700" : "bg-blue-200 text-blue-700";





// Deepseek
import { useState } from "react";
import { FiMenu, FiX, FiSearch, FiCalendar } from "react-icons/fi";

export default function OrderManagement() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const orders = [
    { id: "#101", customer: "abc", address: "123 Main St", date: "2025-02-10", status: "Delivered" },
    { id: "#102", customer: "def", address: "456 Park Ave", date: "2025-02-12", status: "Pending" },
    { id: "#103", customer: "xyz", address: "789 Elm St", date: "2025-02-14", status: "Shipped" },
  ];

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "all" || (filter === "week" && isWithinWeek(order.date)) || (filter === "month" && isWithinMonth(order.date)))
  );

  function isWithinWeek(date) {
    const orderDate = new Date(date);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return orderDate >= oneWeekAgo;
  }

  function isWithinMonth(date) {
    const orderDate = new Date(date);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return orderDate >= oneMonthAgo;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Navbar */}
      {/* <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

        <div className="hidden md:flex space-x-6">
          <NavItem text="Dashboard" />
          <NavItem text="Product Management" />
          <NavItem text="Order Management" active />
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
      )} */}

      {/* ✅ Order Management Section */}
      <div className="mt-20 p-6">
        <Section title="Order History">
          {/* 🔍 Search Bar and Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            {/* Search Bar */}
            <div className="w-full md:w-auto flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 shadow-md">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search order..."
                className="outline-none w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Date Filters */}
            <div className="w-full md:w-auto flex flex-wrap gap-2">
              <button onClick={() => setFilter("all")} className={getButtonStyle(filter === "all")}>All</button>
              <button onClick={() => setFilter("week")} className={getButtonStyle(filter === "week")}>Last Week</button>
              <button onClick={() => setFilter("month")} className={getButtonStyle(filter === "month")}>Last Month</button>
              <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                <FiCalendar className="mr-2" /> Select Date
              </button>
            </div>
          </div>

          {/* 📌 Order Table */}
          <ResponsiveTable
            headers={["Order ID", "Customer", "Address", "Date", "Status", "Actions"]}
            data={filteredOrders}
            renderRow={(order) => (
              <>
                <td className="p-3">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <ActionButton text="View" color="gray" />
                  <ActionButton text="Cancel" color="red" />
                </td>
              </>
            )}
            isActionColumn
          />
        </Section>
      </div>
    </div>
  );
}

/* ✅ Navbar Item */
const NavItem = ({ text, active }) => (
  <a href="#" className={`block px-4 py-2 text-sm font-medium ${active ? "text-orange-500" : "text-gray-600"} hover:text-orange-600`}>
    {text}
  </a>
);

/* ✅ Page Section */
const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="bg-white shadow-md rounded-lg mt-4 p-4">{children}</div>
  </section>
);

/* ✅ Responsive Table */
const ResponsiveTable = ({ headers, data, renderRow, isActionColumn = false }) => (
  <div className="overflow-x-auto">
    {/* Desktop Table */}
    <table className="w-full hidden md:table border-collapse">
      <thead>
        <tr className="bg-orange-100 text-gray-700">
          {headers.map((header, index) => (
            <th key={index} className="p-3 text-left">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-t bg-orange-50 hover:bg-orange-100 transition">
            {renderRow(item)}
          </tr>
        ))}
      </tbody>
    </table>

    {/* Mobile Table */}
    <div className="md:hidden">
      {data.map((item, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded-lg my-2">
          {headers.map((header, idx) => (
            <p key={idx} className="text-gray-700">
              <strong>{header}:</strong> {Object.values(item)[idx]}
            </p>
          ))}
          {isActionColumn && (
            <div className="flex gap-2 mt-2">
              <ActionButton text="View" color="gray" />
              <ActionButton text="Cancel" color="red" />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

/* ✅ Action Buttons */
const ActionButton = ({ text, color }) => {
  const colors = {
    gray: "bg-gray-500",
    red: "bg-red-500",
  };

  return (
    <button className={`${colors[color]} text-white px-3 py-1 rounded-full text-sm transition hover:opacity-80`}>
      {text}
    </button>
  );
};

/* ✅ Utility Functions */
const getButtonStyle = (active) => `px-4 py-2 rounded-lg transition ${active ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-orange-300"}`;
const getStatusColor = (status) => status === "Delivered" ? "bg-green-200 text-green-700" : status === "Pending" ? "bg-yellow-200 text-yellow-700" : "bg-blue-200 text-blue-700";