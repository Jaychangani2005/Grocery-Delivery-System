// import { useState } from "react";

// const ProductManagement = () => {
//   const [products, setProducts] = useState([
//     { id: 123, name: "abc", price: 200 },
//     { id: 124, name: "xyz", price: 300 },
//   ]);

//   const [search, setSearch] = useState("");

//   // 🔍 Filtered products based on search input
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       {/* ✅ Navbar */}
//       <nav className="flex justify-between items-center bg-white p-4 shadow-md">
//         <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>
//         <div className="flex space-x-6">
//           <NavItem text="Dashboard" />
//           <NavItem text="Product Management" active />
//           <NavItem text="Order Management" />
//           <NavItem text="Customer Tracking" />
//         </div>
//       </nav>

//       {/* ✅ Product Management Section */}
//       <div className="mt-6 max-w-5xl mx-auto">
//         <div className="flex justify-between items-center mb-4">
//           <button className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition">
//             Add Product
//           </button>

//           {/* 🔍 Search Bar */}
//           <input
//             type="text"
//             placeholder="Search product..."
//             className="p-2 border border-gray-300 rounded-md shadow-md"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* ✅ Product Table */}
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-orange-100 text-gray-700">
//                 <th className="p-3 text-left">Product ID</th>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Price</th>
//                 <th className="p-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map((product, index) => (
//                 <tr
//                   key={product.id}
//                   className={`${
//                     index % 2 === 0 ? "bg-orange-50" : "bg-orange-100"
//                   } hover:bg-orange-200 transition`}
//                 >
//                   <td className="p-3">{product.id}</td>
//                   <td className="p-3">{product.name}</td>
//                   <td className="p-3">{product.price}</td>
//                   <td className="p-3 flex gap-2">
//                     <ActionButton text="View" color="orange" />
//                     <ActionButton text="Update" color="orange" />
//                     <ActionButton text="Remove" color="orange" />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ✅ Navbar Item Component
// const NavItem = ({ text, active }) => (
//   <a
//     href="#"
//     className={`text-sm font-medium ${
//       active ? "text-orange-500" : "text-gray-600"
//     } hover:text-orange-600`}
//   >
//     {text}
//   </a>
// );

// // ✅ Action Button Component
// const ActionButton = ({ text, color }) => (
//   <button
//     className={`bg-${color}-500 text-white px-3 py-1 rounded-md text-sm transition hover:bg-${color}-600`}
//   >
//     {text}
//   </button>
// );

// export default ProductManagement;




import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const ProductManagement = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([
    { id: 123, name: "abc", price: 200 },
    { id: 124, name: "xyz", price: 300 },
  ]);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Responsive Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>

        <div className="hidden md:flex space-x-6">
          <NavItem text="Dashboard" />
          <NavItem text="Product Management" active />
          <NavItem text="Order Management" />
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
          <NavItem text="Product Management" active />
          <NavItem text="Order Management" />
          <NavItem text="Customer Tracking" />
        </div>
      )}

      <div className="mt-20 p-6">
        <Section title="Product Management">
          <div className="flex justify-between items-center mb-4">
            <ActionButton text="Add Product" color="orange" />
            <input
              type="text"
              placeholder="Search product..."
              className="p-2 border border-gray-300 rounded-md shadow-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ResponsiveTable
            headers={["Product ID", "Name", "Price", "Actions"]}
            data={filteredProducts}
            renderRow={(product) => (
              <>
                <td className="p-3">{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td className="flex gap-2">
                  <ActionButton text="View" color="gray" />
                  <ActionButton text="Update" color="blue" />
                  <ActionButton text="Remove" color="red" />
                </td>
              </>
            )}
            isActionColumn
          />
        </Section>
      </div>
    </div>
  );
};

const NavItem = ({ text, active }) => (
  <a href="#" className={`block px-4 py-2 text-sm font-medium ${active ? "text-orange-500" : "text-gray-600"} hover:text-orange-600`}>
    {text}
  </a>
);

const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="bg-white shadow-md rounded-lg mt-4 p-4">{children}</div>
  </section>
);

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
              <ActionButton text="Update" color="blue" />
              <ActionButton text="Remove" color="red" />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ActionButton = ({ text, color }) => {
  const colors = {
    gray: "bg-gray-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
  };

  return (
    <button className={`${colors[color]} text-white px-3 py-1 rounded-full text-sm transition hover:opacity-80`}>
      {text}
    </button>
  );
};

export default ProductManagement;
