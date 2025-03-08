// import { useState } from "react";
// import { FiMenu, FiX, FiUser } from "react-icons/fi";

// const AdminDashboard = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const shopkeeperRequests = [
//     { id: 1, name: "C", store: "abc", phone: "123" },
//     { id: 2, name: "SB", store: "xyz", phone: "1234567894" },
//   ];

//   const deliveryRequests = [
//     { id: 1, name: "C", vehicle: "abc", phone: "123" },
//     { id: 2, name: "SB", vehicle: "xyz", phone: "1234567894" },
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6">
//           <NavItem text="Dashboard" active />
//           <NavItem text="Manage Shopkeeper" />
//           <NavItem text="Manage Delivery" />
//           <NavItem text="View User" />
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center space-x-3">
//           <label className="flex items-center cursor-pointer">
//             <span className="mr-2">Open</span>
//             <input type="checkbox" className="hidden" />
//             <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-1">
//               <div className="w-4 h-4 bg-orange-500 rounded-full transition-transform duration-300 transform translate-x-0"></div>
//             </div>
//           </label>
//           <FiUser size={24} />
//         </div>

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
//           <NavItem text="Manage Shopkeeper" />
//           <NavItem text="Manage Delivery" />
//           <NavItem text="View User" />
//         </div>
//       )}

//       {/* Page Content */}
//       <div className="mt-20 p-6">
//         <Section title="Shopkeeper Request">
//           <ResponsiveTable
//             headers={["Shopkeeper Name", "Store Name", "Phone Number", "Actions"]}
//             data={shopkeeperRequests}
//             renderRow={(item) => (
//               <>
//                 <td className="p-3">{item.name}</td>
//                 <td>{item.store}</td>
//                 <td>{item.phone}</td>
//                 <td className="text-center">
//                   <ActionButton text="View" color="orange" />
//                 </td>
//               </>
//             )}
//           />
//         </Section>

//         <Section title="Delivery Person Request">
//           <ResponsiveTable
//             headers={["Name", "Vehicle Type", "Phone Number", "Actions"]}
//             data={deliveryRequests}
//             renderRow={(item) => (
//               <>
//                 <td className="p-3">{item.name}</td>
//                 <td>{item.vehicle}</td>
//                 <td>{item.phone}</td>
//                 <td className="text-center">
//                   <ActionButton text="View" color="orange" />
//                 </td>
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

// // ✅ Responsive Table Component
// const ResponsiveTable = ({ headers, data, renderRow }) => (
//   <div className="overflow-x-auto">
//     <table className="w-full border-collapse">
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
//           <tr key={index} className="border-t bg-orange-50 hover:bg-orange-100 transition">
//             {renderRow(item)}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// // ✅ Action Button Component
// const ActionButton = ({ text, color }) => {
//   const colors = {
//     orange: "bg-orange-500",
//   };

//   return (
//     <button className={`${colors[color]} text-white px-3 py-1 rounded-full text-sm transition hover:opacity-80`}>
//       {text}
//     </button>
//   );
// };

// export default AdminDashboard;





// import { useState } from "react";
// import { FiMenu, FiX, FiUser } from "react-icons/fi";

// const AdminDashboard = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const shopkeeperRequests = [
//     { id: 1, name: "C", store: "abc", phone: "123" },
//     { id: 2, name: "SB", store: "xyz", phone: "1234567894" },
//   ];

//   const deliveryRequests = [
//     { id: 1, name: "C", vehicle: "abc", phone: "123" },
//     { id: 2, name: "SB", vehicle: "xyz", phone: "1234567894" },
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* ✅ Navbar */}
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

//         {/* ✅ Desktop Menu */}
//         <div className="hidden md:flex space-x-6">
//           <NavItem text="Dashboard" active />
//           <NavItem text="Manage Shopkeeper" />
//           <NavItem text="Manage Delivery" />
//           <NavItem text="View User" />
//         </div>

//         {/* ✅ User Section */}
//         <div className="flex items-center space-x-4">
//           {/* Toggle Switch */}
//           <label className="flex items-center cursor-pointer">
//             <span className="mr-2">Open</span>
//             <input type="checkbox" className="hidden" />
//             <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-1">
//               <div className="w-4 h-4 bg-orange-500 rounded-full transition-transform duration-300 transform translate-x-0"></div>
//             </div>
//           </label>
//           <FiUser size={24} className="text-gray-700" />
//         </div>

//         {/* ✅ Mobile Menu Toggle */}
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

//       {/* ✅ Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4">
//           <NavItem text="Dashboard" active />
//           <NavItem text="Manage Shopkeeper" />
//           <NavItem text="Manage Delivery" />
//           <NavItem text="View User" />
//         </div>
//       )}

//       {/* ✅ Page Content */}
//       <div className="mt-20 p-6 space-y-6">
//         <Section title="Shopkeeper Requests">
//           <ResponsiveTable
//             headers={["Shopkeeper Name", "Store Name", "Phone Number", "Actions"]}
//             data={shopkeeperRequests}
//             renderRow={(item) => (
//               <>
//                 <td className="p-3 text-center">{item.name}</td>
//                 <td className="p-3 text-center">{item.store}</td>
//                 <td className="p-3 text-center">{item.phone}</td>
//                 <td className="p-3 text-center">
//                   <ActionButton text="View" color="orange" />
//                 </td>
//               </>
//             )}
//           />
//         </Section>

//         <Section title="Delivery Person Requests">
//           <ResponsiveTable
//             headers={["Name", "Vehicle Type", "Phone Number", "Actions"]}
//             data={deliveryRequests}
//             renderRow={(item) => (
//               <>
//                 <td className="p-3 text-center">{item.name}</td>
//                 <td className="p-3 text-center">{item.vehicle}</td>
//                 <td className="p-3 text-center">{item.phone}</td>
//                 <td className="p-3 text-center">
//                   <ActionButton text="View" color="orange" />
//                 </td>
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

// // ✅ Responsive Table Component
// const ResponsiveTable = ({ headers, data, renderRow }) => (
//   <div className="overflow-x-auto">
//     <table className="w-full border-collapse">
//       <thead>
//         <tr className="bg-orange-100 text-gray-700">
//           {headers.map((header, index) => (
//             <th key={index} className="p-3 text-center">{header}</th>
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
//   </div>
// );

// // ✅ Action Button Component
// const ActionButton = ({ text, color }) => {
//   const colors = {
//     orange: "bg-orange-500",
//   };

//   return (
//     <button className={`${colors[color]} text-white px-4 py-2 rounded-lg text-sm transition hover:opacity-80`}>
//       {text}
//     </button>
//   );
// };

// export default AdminDashboard;





import { useState } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const shopkeeperRequests = [
    { id: 1, name: "C", store: "abc", phone: "1234567894" },
    { id: 2, name: "SB", store: "xyz", phone: "1234567894" },
  ];

  const deliveryRequests = [
    { id: 1, name: "C", store: "abc", phone: "1234567894" },
    { id: 2, name: "SB", store: "xyz", phone: "1234567894" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Navbar */}
      {/* <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-left">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

        <div className="hidden md:flex space-x-6">
          <NavItem text="Dashboard" active />
          <NavItem text="Manage Shopkeeper" />
          <NavItem text="Manage Delivery" />
          <NavItem text="View User" />
        </div>


        <div className="md:hidden">
          {menuOpen ? (
            <FiX
              size={24}
              className="cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <FiMenu
              size={24}
              className="cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4">
          <NavItem text="Dashboard" active />
          <NavItem text="Manage Shopkeeper" />
          <NavItem text="Manage Delivery" />
          <NavItem text="View User" />
        </div>
      )} */}

      {/* ✅ Page Content */}
      <div className="mt-20 p-6 space-y-6">
        <Section title="Shopkeeper Requests">
          <UniformTable
            headers={["Name", "Store Name", "Phone Number", "Actions"]}
            data={shopkeeperRequests}
          />
        </Section>

        <Section title="Delivery Person Requests">
          <UniformTable
            headers={["Name", "Store Name", "Phone Number", "Actions"]}
            data={deliveryRequests}
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
    className={`block px-4 py-2 text-sm font-medium ${
      active ? "text-orange-500" : "text-gray-600"
    } hover:text-orange-600`}
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

// ✅ Uniform Table Component (Same Alignment for Both Tables)
const UniformTable = ({ headers, data }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-orange-100 text-gray-700">
          {headers.map((header, index) => (
            <th key={index} className="p-3 text-center">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-t bg-orange-50 hover:bg-orange-100 transition">
            <td className="p-3 text-center">{item.name}</td>
            <td className="p-3 text-center">{item.store}</td>
            <td className="p-3 text-center">{item.phone}</td>
            <td className="p-3 text-center">
              <ActionButton text="View" color="orange" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ✅ Action Button Component
const ActionButton = ({ text, color }) => {
  const colors = {
    orange: "bg-orange-500",
  };

  return (
    <button className={`${colors[color]} text-white px-4 py-2 rounded-lg text-sm transition hover:opacity-80`}>
      {text}
    </button>
  );
};

export default AdminDashboard;
