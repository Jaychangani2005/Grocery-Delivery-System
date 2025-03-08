// import { useNavigate } from "react-router-dom";

// const DeliveryPersonDetails = () => {
//   const navigate = useNavigate();

//   // Dummy delivery person details (Replace with real data from API/state)
//   const deliveryPerson = {
//     full_name: "Rahul Sharma",
//     phone_number: "9876543210",
//     email: "rahulsharma@example.com",
//     date_of_birth: "1995-07-15",
//     gender: "Male",
//     emergency_contact: "9876509876",
//     address: "456 Street Name, City, State",
//     vehicle_type: "Bike",
//     vehicle_registration_number: "MH12AB1234",
//     driving_license_number: "DL123456789",
//     bank_account_holder: "Rahul Sharma",
//     bank_account_number: "123456789012",
//     ifsc_code: "HDFC0001234",
//     upi_id: "rahulsharma@upi",
//   };

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
//       <div className="mt-20 p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-semibold text-orange-500 mb-6">
//           Delivery Person Details
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* ✅ Displaying Delivery Person Info */}
//           <DetailCard title="Full Name" value={deliveryPerson.full_name} />
//           <DetailCard title="Phone Number" value={deliveryPerson.phone_number} />
//           <DetailCard title="Email" value={deliveryPerson.email} />
//           <DetailCard title="Date of Birth" value={deliveryPerson.date_of_birth} />
//           <DetailCard title="Gender" value={deliveryPerson.gender} />
//           <DetailCard title="Emergency Contact" value={deliveryPerson.emergency_contact} />
//           <DetailCard title="Address" value={deliveryPerson.address} />
//           <DetailCard title="Vehicle Type" value={deliveryPerson.vehicle_type} />
//           <DetailCard title="Vehicle Registration Number" value={deliveryPerson.vehicle_registration_number} />
//           <DetailCard title="Driving License Number" value={deliveryPerson.driving_license_number} />
//           <DetailCard title="Bank Account Holder" value={deliveryPerson.bank_account_holder} />
//           <DetailCard title="Bank Account Number" value={deliveryPerson.bank_account_number} />
//           <DetailCard title="IFSC Code" value={deliveryPerson.ifsc_code} />
//           <DetailCard title="UPI ID" value={deliveryPerson.upi_id} />
//         </div>

//         {/* ✅ Accept & Decline Buttons */}
//         {/* <div className="mt-6 flex justify-center space-x-4">
//           <button className="bg-green-500 text-white px-6 py-2 rounded-full text-lg hover:opacity-80 transition">
//             Accept
//           </button>
//           <button className="bg-red-500 text-white px-6 py-2 rounded-full text-lg hover:opacity-80 transition">
//             Decline
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// // ✅ Component for Each Detail Card (Reusable)
// const DetailCard = ({ title, value }) => (
//   <div className="bg-orange-50 p-4 rounded-lg shadow-md border border-orange-200">
//     <p className="text-gray-600 text-sm font-medium">{title}</p>
//     <p className="text-lg font-semibold">{value}</p>
//   </div>
// );

// export default DeliveryPersonDetails;





import { useNavigate } from "react-router-dom";

const DeliveryPersonDetails = () => {
  const navigate = useNavigate();

  // Dummy delivery person details (Replace with real data from API/state)
  const deliveryPerson = {
    full_name: "Rahul Sharma",
    phone_number: "9876543210",
    email: "rahulsharma@example.com",
    date_of_birth: "1995-07-15",
    gender: "Male",
    emergency_contact: "9876509876",
    address: "456 Street Name, City, State",
    vehicle_type: "Bike",
    vehicle_registration_number: "MH12AB1234",
    driving_license_number: "DL123456789",
    bank_account_holder: "Rahul Sharma",
    bank_account_number: "123456789012",
    ifsc_code: "HDFC0001234",
    upi_id: "rahulsharma@upi",
  };

  // Function to handle removal with confirmation
  const handleRemove = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this delivery person?"
    );
    if (confirmDelete) {
      // TODO: Perform delete action (API call or state update)
      alert("Delivery person removed successfully!"); // Temporary alert for testing
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
          Delivery Person Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ Displaying Delivery Person Info */}
          <DetailCard title="Full Name" value={deliveryPerson.full_name} />
          <DetailCard title="Phone Number" value={deliveryPerson.phone_number} />
          <DetailCard title="Email" value={deliveryPerson.email} />
          <DetailCard title="Date of Birth" value={deliveryPerson.date_of_birth} />
          <DetailCard title="Gender" value={deliveryPerson.gender} />
          <DetailCard title="Emergency Contact" value={deliveryPerson.emergency_contact} />
          <DetailCard title="Address" value={deliveryPerson.address} />
          <DetailCard title="Vehicle Type" value={deliveryPerson.vehicle_type} />
          <DetailCard title="Vehicle Registration Number" value={deliveryPerson.vehicle_registration_number} />
          <DetailCard title="Driving License Number" value={deliveryPerson.driving_license_number} />
          <DetailCard title="Bank Account Holder" value={deliveryPerson.bank_account_holder} />
          <DetailCard title="Bank Account Number" value={deliveryPerson.bank_account_number} />
          <DetailCard title="IFSC Code" value={deliveryPerson.ifsc_code} />
          <DetailCard title="UPI ID" value={deliveryPerson.upi_id} />
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

// ✅ Component for Each Detail Card (Reusable)
const DetailCard = ({ title, value }) => (
  <div className="bg-orange-50 p-4 rounded-lg shadow-md border border-orange-200">
    <p className="text-gray-600 text-sm font-medium">{title}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default DeliveryPersonDetails;
