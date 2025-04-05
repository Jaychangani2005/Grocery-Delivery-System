// import { useNavigate } from "react-router-dom";

// const ShopkeeperRequests = () => {
//   const navigate = useNavigate();

//   // Dummy ShopkeeperRequests Requests (Replace with real data from API/state)
//   const ShopkeeperRequests = [
//     {
//       id: 1,
//       full_name: "John Doe",
//       phone_number: "9876543210",
//       email: "johndoe@example.com",
//       store_name: "John's Grocery",
//       store_category: "Supermarket",
//       store_address: "123 Main Street, City",
//       opening_hours: "9:00 AM",
//       closing_hours: "9:00 PM",
//     },
//     {
//       id: 2,
//       full_name: "Sarah Lee",
//       phone_number: "9123456789",
//       email: "sarahlee@example.com",
//       store_name: "Lee's Market",
//       store_category: "Grocery Store",
//       store_address: "456 Oak Street, City",
//       opening_hours: "8:00 AM",
//       closing_hours: "10:00 PM",
//     },
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       {/* ✅ Navbar */}
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:opacity-80"
//         >
//           Back
//         </button>
//       </nav>

//       {/* ✅ Page Content */}
//       <div className="mt-20 p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-semibold text-orange-500 mb-6">
//           ShopkeeperRequests Requests
//         </h2>

//         {/* ✅ Responsive Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse hidden md:table">
//             <thead>
//               <tr className="bg-orange-100 text-gray-700">
//                 <th className="p-3 text-left">Full Name</th>
//                 <th className="p-3 text-left">Phone Number</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Store Name</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Address</th>
//                 <th className="p-3 text-left">Opening Hours</th>
//                 <th className="p-3 text-left">Closing Hours</th>
//                 <th className="p-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ShopkeeperRequests.map((ShopkeeperRequests) => (
//                 <tr key={ShopkeeperRequests.id} className="border-t bg-orange-50 hover:bg-orange-100 transition">
//                   <td className="p-3">{ShopkeeperRequests.full_name}</td>
//                   <td>{ShopkeeperRequests.phone_number}</td>
//                   <td>{ShopkeeperRequests.email}</td>
//                   <td>{ShopkeeperRequests.store_name}</td>
//                   <td>{ShopkeeperRequests.store_category}</td>
//                   <td>{ShopkeeperRequests.store_address}</td>
//                   <td>{ShopkeeperRequests.opening_hours}</td>
//                   <td>{ShopkeeperRequests.closing_hours}</td>
//                   <td className="flex gap-2">
//                     <button 
//                       className="bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:opacity-80 transition"
//                     >
//                       Accept
//                     </button>
//                     <button 
//                       className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:opacity-80 transition"
//                     >
//                       Decline
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* ✅ Mobile View - Cards */}
//           <div className="md:hidden">
//             {ShopkeeperRequests.map((ShopkeeperRequests) => (
//               <div key={ShopkeeperRequests.id} className="bg-white p-4 shadow-md rounded-lg my-2">
//                 <DetailCard title="Full Name" value={ShopkeeperRequests.full_name} />
//                 <DetailCard title="Phone Number" value={ShopkeeperRequests.phone_number} />
//                 <DetailCard title="Email" value={ShopkeeperRequests.email} />
//                 <DetailCard title="Store Name" value={ShopkeeperRequests.store_name} />
//                 <DetailCard title="Category" value={ShopkeeperRequests.store_category} />
//                 <DetailCard title="Address" value={ShopkeeperRequests.store_address} />
//                 <DetailCard title="Opening Hours" value={ShopkeeperRequests.opening_hours} />
//                 <DetailCard title="Closing Hours" value={ShopkeeperRequests.closing_hours} />

//                 {/* ✅ Mobile Buttons */}
//                 <div className="flex gap-2 mt-2">
//                   <button className="bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:opacity-80 transition">
//                     Accept
//                   </button>
//                   <button className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:opacity-80 transition">
//                     Decline
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ✅ Component for Each Detail Card (Better UI than plain text)
// const DetailCard = ({ title, value }) => (
//   <div className="bg-orange-50 p-4 rounded-lg shadow-md border border-orange-200 mb-2">
//     <p className="text-gray-600 text-sm font-medium">{title}</p>
//     <p className="text-lg font-semibold">{value}</p>
//   </div>
// );

// export default ShopkeeperRequests;





import { useNavigate } from "react-router-dom";

const ShopkeeperRequests = () => {
  const navigate = useNavigate();

  const ShopkeeperRequests = {
    full_name: "John Doe",
    phone_number: "9876543210",
    email: "johndoe@example.com",
    store_name: "John's Grocery",
    store_category: "Supermarket",
    store_address: "123 Main Street, City",
    opening_hours: "9:00 AM",
    closing_hours: "9:00 PM",
    fssai_license: "FSSAI123456789",
    gst_number: "GSTIN987654321",
    bank_account_holder: "John Doe",
    bank_account_number: "123456789012",
    ifsc_code: "IFSC0012345",
    bank_name: "ABC Bank",
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* ✅ Navbar (Same as Dashboard) */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:opacity-80"
        >
          Back
        </button>
      </nav>

      {/* ✅ Page Content */}
      <div className="mt-20 p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-orange-500 mb-6">
          ShopkeeperRequests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ Displaying ShopkeeperRequests Info in a Better Way */}
          <DetailCard title="Full Name" value={ShopkeeperRequests.full_name} />
          <DetailCard title="Phone Number" value={ShopkeeperRequests.phone_number} />
          <DetailCard title="Email" value={ShopkeeperRequests.email} />
          <DetailCard title="Store Name" value={ShopkeeperRequests.store_name} />
          <DetailCard title="Store Category" value={ShopkeeperRequests.store_category} />
          <DetailCard title="Store Address" value={ShopkeeperRequests.store_address} />
          <DetailCard title="Opening Hours" value={ShopkeeperRequests.opening_hours} />
          <DetailCard title="Closing Hours" value={ShopkeeperRequests.closing_hours} />
        </div>

        {/* ✅ Accept & Decline Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-green-500 text-white px-6 py-2 rounded-full text-lg hover:opacity-80 transition">
            Accept
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-full text-lg hover:opacity-80 transition">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Component for Each Detail Card (Better UI than plain text)
const DetailCard = ({ title, value }) => (
  <div className="bg-orange-50 p-4 rounded-lg shadow-md border border-orange-200">
    <p className="text-gray-600 text-sm font-medium">{title}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default ShopkeeperRequests;
