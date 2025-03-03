// import { useState } from "react";
// import { FiMenu, FiX } from "react-icons/fi";

// const Dashboard = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const [orders, setOrders] = useState([
//     { id: 1, customer: "C", address: "abc", details: "Food Item" },
//     { id: 2, customer: "SB", address: "xyz", details: "Food Item" },
//   ]);

//   const [pendingDeliveries, setPendingDeliveries] = useState([
//     { id: "#12345", customer: "JC", address: "abc", status: "Pending" },
//     { id: "#12346", customer: "ST", address: "xyz", status: "Pending" },
//   ]);

//   const [outOfDelivery, setOutOfDelivery] = useState([
//     { id: "#12345", customer: "JC", address: "abc", status: "Pending" },
//     { id: "#12346", customer: "ST", address: "xyz", status: "Pending" },
//   ]);


//   const [completedDeliveries, setCompletedDeliveries] = useState([
//     { id: "#12345", customer: "JC", address: "abc", status: "Completed" },
//     { id: "#12346", customer: "ST", address: "xyz", status: "Completed" },
//   ]);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* ✅ Responsive Navbar */}
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6">
//           <NavItem text="Dashboard" active />
//           <NavItem text="Product Management" />
//           <NavItem text="Order Management" />
//           <NavItem text="Customer Tracking" />
//         </div>

// {/*
//     <div className="bg-gray-100 min-h-screen p-6">
//       <nav className="flex justify-between items-center bg-white p-4 shadow-md">
//         <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>
//         <div className="flex space-x-6">
//           <Link to="/" className="text-gray-600 hover:text-orange-600">Dashboard</Link>
//           <Link to="/products" className="text-orange-500 font-bold">Product Management</Link>
//           <Link to="/orders" className="text-gray-600 hover:text-orange-600">Order Management</Link>
//           <Link to="/tracking" className="text-gray-600 hover:text-orange-600">Customer Tracking</Link>
//         </div>
//       </nav>

//       <h2 className="mt-6 text-lg font-semibold">Welcome to Dashboard</h2>
//     </div>

//  */}


//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           {menuOpen ? (
//             <FiX
//               size={24}
//               className="cursor-pointer"
//               onClick={() => setMenuOpen(false)}
//             />
//           ) : (
//             <FiMenu
//               size={24}
//               className="cursor-pointer"
//               onClick={() => setMenuOpen(true)}
//             />
//           )}
//         </div>
//       </nav>

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4">
//           <NavItem text="Dashboard" active />
//           <NavItem text="Product Management" />
//           <NavItem text="Order Management" />
//           <NavItem text="Customer Tracking" />
//         </div>
//       )}

//       <div className="mt-20 p-6">
//         <Section title="New Orders">
//           <ResponsiveTable
//             headers={[
//               "Customer Name",
//               "Delivery Address",
//               "Order Details",
//               "Actions",
//             ]}
//             data={orders}
//             renderRow={(order) => (
//               <>
//                 <td className="p-3">{order.customer}</td>
//                 <td>{order.address}</td>
//                 <td>{order.details}</td>
//                 <td className="flex gap-2">
//                   <ActionButton text="View" color="gray" />
//                   <ActionButton text="Accept" color="green" />
//                   <ActionButton text="Deny" color="red" />
//                 </td>
//               </>
//             )}
//             isActionColumn
//           />
//         </Section>

//         <Section title="Pending Deliveries">
//           <ResponsiveTable
//             headers={[
//               "Order ID",
//               "Customer Name",
//               "Delivery Address",
//               "Order Status",
//               "Actions",
//             ]}
//             data={pendingDeliveries}
//             renderRow={(order) => (
//               <>
//                 <td className="p-3">{order.id}</td>
//                 <td>{order.customer}</td>
//                 <td>{order.address}</td>
//                 <td className="text-yellow-500">{order.status}</td>
//                 <td className="flex gap-2">
//                   <ActionButton text="Complete" color="blue" />
//                 </td>
//               </>
//             )}
//             isActionColumn
//           />
//         </Section>

//         <Section title="Out of Deliveries">
//           <ResponsiveTable
//             headers={[
//               "Order ID",
//               "Customer Name",
//               "Delivery Address",
//               "Order Status",
//             ]}
//             data={outOfDelivery}
//             renderRow={(order) => (
//               <>
//                 <td className="p-3">{order.id}</td>
//                 <td>{order.customer}</td>
//                 <td>{order.address}</td>
//                 <td className="text-yellow-500">{order.status}</td>
//               </>
//             )}
//           />
//         </Section>

//         <Section title="Completed Deliveries">
//           <ResponsiveTable
//             headers={[
//               "Order ID",
//               "Customer Name",
//               "Delivery Address",
//               "Order Status",
//             ]}
//             data={completedDeliveries}
//             renderRow={(order) => (
//               <>
//                 <td className="p-3">{order.id}</td>
//                 <td>{order.customer}</td>
//                 <td>{order.address}</td>
//                 <td className="text-green-500">{order.status}</td>
//               </>
//             )}
//           />
//         </Section>
//       </div>
//     </div>
//   );
// };

// // ✅ Navbar Item Component
// const NavItem = ({ text, active }) => (
//   <a
//     href="#"
//     className={`block px-4 py-2 text-sm font-medium ${
//       active ? "text-orange-500" : "text-gray-600"
//     } hover:text-orange-600`}
//   >
//     {text}
//   </a>
// );

// // ✅ Section Component
// const Section = ({ title, children }) => (
//   <section className="mt-8">
//     <h2 className="text-xl font-semibold">{title}</h2>
//     <div className="bg-white shadow-md rounded-lg mt-4 p-4">{children}</div>
//   </section>
// );

// // ✅ Responsive Table Component (Converts to Cards on Mobile)
// const ResponsiveTable = ({
//   headers,
//   data,
//   renderRow,
//   isActionColumn = false,
// }) => (
//   <div className="overflow-x-auto">
//     <table className="w-full hidden md:table border-collapse">
//       <thead>
//         <tr className="bg-orange-100 text-gray-700">
//           {headers.map((header, index) => (
//             <th key={index} className="p-3 text-left">
//               {header}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr
//             key={index}
//             className="border-t bg-orange-50 hover:bg-orange-100 transition"
//           >
//             {renderRow(item)}
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     {/* Mobile View - Cards */}
//     <div className="md:hidden">
//       {data.map((item, index) => (
//         <div key={index} className="bg-white p-4 shadow-md rounded-lg my-2">
//           {headers.map((header, idx) => (
//             <p key={idx} className="text-gray-700">
//               <strong>{header}:</strong> {Object.values(item)[idx]}
//             </p>
//           ))}
//           {/* Show Actions if needed */}
//           {isActionColumn && (
//             <div className="flex gap-2 mt-2">
//               {item.status ? (
//                 <ActionButton text="Complete" color="blue" />
//               ) : (
//                 <>
//                   <ActionButton text="View" color="gray" />
//                   <ActionButton text="Accept" color="green" />
//                   <ActionButton text="Deny" color="red" />
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // ✅ Action Button Component
// const ActionButton = ({ text, color }) => {
//   const colors = {
//     gray: "bg-gray-500",
//     green: "bg-green-500",
//     red: "bg-red-500",
//     blue: "bg-blue-500",
//   };

//   return (
//     <button
//       className={`${colors[color]} text-white px-3 py-1 rounded-full text-sm transition hover:opacity-80`}
//     >
//       {text}
//     </button>
//   );
// };

// export default Dashboard;





import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [orders, setOrders] = useState([
    { id: 1, customer: "C", address: "abc", details: "Food Item" },
    { id: 2, customer: "SB", address: "xyz", details: "Food Item" },
  ]);

  const [pendingDeliveries, setPendingDeliveries] = useState([
    { id: "#12345", customer: "JC", address: "abc", details: "Groceries - Rice, Milk", status: "Pending" },
    { id: "#12346", customer: "ST", address: "xyz", details: "Vegetables - Tomatoes, Onions", status: "Pending" },
  ]);

  const [outOfDelivery, setOutOfDelivery] = useState([
    { id: "#12345", customer: "JC", address: "abc", status: "Pending" },
    { id: "#12346", customer: "ST", address: "xyz", status: "Pending" },
  ]);

  const [completedDeliveries, setCompletedDeliveries] = useState([
    { id: "#12345", customer: "JC", address: "abc", status: "Completed" },
    { id: "#12346", customer: "ST", address: "xyz", status: "Completed" },
  ]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Responsive Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavItem text="Dashboard" active />
          <NavItem text="Product Management" />
          <NavItem text="Order Management" />
          <NavItem text="Customer Tracking" />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {menuOpen ? (
            <FiX size={24} className="cursor-pointer" onClick={() => setMenuOpen(false)} />
          ) : (
            <FiMenu size={24} className="cursor-pointer" onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4">
          <NavItem text="Dashboard" active />
          <NavItem text="Product Management" />
          <NavItem text="Order Management" />
          <NavItem text="Customer Tracking" />
        </div>
      )}

      <div className="mt-20 p-6">
        <Section title="New Orders">
          <ResponsiveTable
            headers={["Customer Name", "Delivery Address", "Order Details", "Actions"]}
            data={orders}
            renderRow={(order) => (
              <>
                <td className="p-3">{order.customer}</td>
                <td>{order.address}</td>
                <td>{order.details}</td>
                <td className="flex gap-2">
                  <ActionButton text="View" color="blue" />
                  {/* <ActionButton text="Accept" color="green" />
                  <ActionButton text="Deny" color="red" /> */}
                </td>
              </>
            )}
            isActionColumn
          />
        </Section>

        {/* ✅ Updated Pending Deliveries Section with Order Details */}
        <Section title="Pending Deliveries">
          <ResponsiveTable
            headers={["Order ID", "Customer Name", "Delivery Address", "Order Details", "Order Status", "Actions"]}
            data={pendingDeliveries}
            renderRow={(order) => (
              <>
                <td className="p-3">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td>{order.details}</td> {/* ✅ Order Details added */}
                <td className="text-red-500">{order.status}</td>
                <td className="flex gap-2">
                  <ActionButton text="Complete" color="blue" />
                </td>
              </>
            )}
            isActionColumn
          />
        </Section>

        <Section title="Out of Deliveries">
          <ResponsiveTable
            headers={["Order ID", "Customer Name", "Delivery Address", "Order Status"]}
            data={outOfDelivery}
            renderRow={(order) => (
              <>
                <td className="p-3">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td className="text-red-500">{order.status}</td>
              </>
            )}
          />
        </Section>

        <Section title="Completed Deliveries">
          <ResponsiveTable
            headers={["Order ID", "Customer Name", "Delivery Address", "Order Status"]}
            data={completedDeliveries}
            renderRow={(order) => (
              <>
                <td className="p-3">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td className="text-green-500">{order.status}</td>
              </>
            )}
          />
        </Section>
      </div>
    </div>
  );
};

// ✅ Navbar Item Component
const NavItem = ({ text, active }) => (
  <a
    href="#"
    className={`block px-4 py-2 text-sm font-medium ${active ? "text-orange-500" : "text-gray-600"} hover:text-orange-600`}
  >
    {text}
  </a>
);

// ✅ Section Component
const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="bg-white shadow-md rounded-lg mt-4 p-4">{children}</div>
  </section>
);

// ✅ Responsive Table Component (Converts to Cards on Mobile)
const ResponsiveTable = ({ headers, data, renderRow, isActionColumn = false }) => (
  <div className="overflow-x-auto">
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

    {/* ✅ Mobile View - Cards */}
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
              <ActionButton text="Complete" color="blue" />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// ✅ Action Button Component
const ActionButton = ({ text, color }) => {
  const colors = {
    gray: "bg-gray-500",
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
  };

  return (
    <button className={`${colors[color]} text-white px-3 py-1 rounded-full text-sm transition hover:opacity-80`}>
      {text}
    </button>
  );
};

export default Dashboard;
