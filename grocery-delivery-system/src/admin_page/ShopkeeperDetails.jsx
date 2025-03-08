// import { useNavigate } from "react-router-dom";

// const ShopkeeperDetails = () => {
//   const navigate = useNavigate();

//   const ShopkeeperDetails = {
//     full_name: "John Doe",
//     phone_number: "9876543210",
//     email: "johndoe@example.com",
//     store_name: "John's Grocery",
//     store_category: "Supermarket",
//     store_address: "123 Main Street, City",
//     opening_hours: "9:00 AM",
//     closing_hours: "9:00 PM",
//     fssai_license: "FSSAI123456789",
//     gst_number: "GSTIN987654321",
//     bank_account_holder: "John Doe",
//     bank_account_number: "123456789012",
//     ifsc_code: "IFSC0012345",
//     bank_name: "ABC Bank",
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       {/* ✅ Navbar (Same as Dashboard) */}
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
//       <div className="mt-20 p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-semibold text-orange-500 mb-6">
//           ShopkeeperDetails
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* ✅ Displaying ShopkeeperDetails Info in a Better Way */}
//           <DetailCard title="Full Name" value={ShopkeeperDetails.full_name} />
//           <DetailCard title="Phone Number" value={ShopkeeperDetails.phone_number} />
//           <DetailCard title="Email" value={ShopkeeperDetails.email} />
//           <DetailCard title="Store Name" value={ShopkeeperDetails.store_name} />
//           <DetailCard title="Store Category" value={ShopkeeperDetails.store_category} />
//           <DetailCard title="Store Address" value={ShopkeeperDetails.store_address} />
//           <DetailCard title="Opening Hours" value={ShopkeeperDetails.opening_hours} />
//           <DetailCard title="Closing Hours" value={ShopkeeperDetails.closing_hours} />
//           <DetailCard title="FSSAI License" value={ShopkeeperDetails.fssai_license} />
//           <DetailCard title="GST Number" value={ShopkeeperDetails.gst_number} />
//           <DetailCard title="Bank Account Holder" value={ShopkeeperDetails.bank_account_holder} />
//           <DetailCard title="Bank Account Number" value={ShopkeeperDetails.bank_account_number} />
//           <DetailCard title="IFSC Code" value={ShopkeeperDetails.ifsc_code} />
//           <DetailCard title="Bank Name" value={ShopkeeperDetails.bank_name} />
//         </div>


//         {/* ✅ Accept & Decline Buttons */}
//         <div className="mt-6 flex justify-center space-x-4">
//           <button className="bg-green-500 text-white px-6 py-2 rounded-full text-lg hover:opacity-80 transition">
//             Accept
//           </button>
//           <button className="bg-red-500 text-white px-6 py-2 rounded-full text-lg hover:opacity-80 transition">
//             Decline
//           </button>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// // ✅ Component for Each Detail Card (Better UI than plain text)
// const DetailCard = ({ title, value }) => (
//   <div className="bg-orange-50 p-4 rounded-lg shadow-md border border-orange-200">
//     <p className="text-gray-600 text-sm font-medium">{title}</p>
//     <p className="text-lg font-semibold">{value}</p>
//   </div>
// );

// export default ShopkeeperDetails;



import { useNavigate } from "react-router-dom";

const ShopkeeperDetails = () => {
  const navigate = useNavigate();

  // Dummy shopkeeper details (Replace with real data from API/state)
  const shopkeeperDetails = {
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

  // Function to handle removal with confirmation
  const handleRemove = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this shopkeeper?"
    );
    if (confirmDelete) {
      // TODO: Perform delete action (API call or state update)
      alert("Shopkeeper removed successfully!"); // Temporary alert for testing
      navigate(-1); // Navigate back after deletion
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* ✅ Navbar */}
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
          Shopkeeper Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ Displaying Shopkeeper Details */}
          <DetailCard title="Full Name" value={shopkeeperDetails.full_name} />
          <DetailCard title="Phone Number" value={shopkeeperDetails.phone_number} />
          <DetailCard title="Email" value={shopkeeperDetails.email} />
          <DetailCard title="Store Name" value={shopkeeperDetails.store_name} />
          <DetailCard title="Store Category" value={shopkeeperDetails.store_category} />
          <DetailCard title="Store Address" value={shopkeeperDetails.store_address} />
          <DetailCard title="Opening Hours" value={shopkeeperDetails.opening_hours} />
          <DetailCard title="Closing Hours" value={shopkeeperDetails.closing_hours} />
          <DetailCard title="FSSAI License" value={shopkeeperDetails.fssai_license} />
          <DetailCard title="GST Number" value={shopkeeperDetails.gst_number} />
          <DetailCard title="Bank Account Holder" value={shopkeeperDetails.bank_account_holder} />
          <DetailCard title="Bank Account Number" value={shopkeeperDetails.bank_account_number} />
          <DetailCard title="IFSC Code" value={shopkeeperDetails.ifsc_code} />
          <DetailCard title="Bank Name" value={shopkeeperDetails.bank_name} />
        </div>

        {/* ✅ Remove Button with Confirmation */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleRemove}
            className="bg-red-500 text-white px-6 py-2 rounded-full text-lg hover:opacity-80 transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable Detail Card Component
const DetailCard = ({ title, value }) => (
  <div className="bg-orange-50 p-4 rounded-lg shadow-md border border-orange-200">
    <p className="text-gray-600 text-sm font-medium">{title}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default ShopkeeperDetails;
