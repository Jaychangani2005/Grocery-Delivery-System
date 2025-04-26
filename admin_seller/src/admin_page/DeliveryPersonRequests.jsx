import { useNavigate } from "react-router-dom";

const DeliveryPersonRequests = () => {
  const navigate = useNavigate();

  // Dummy delivery person details (Replace with real data from API/state)
  const DeliveryPersonRequests = {
    full_name: "Rahul Sharma",
    phone_number: "9876543210",
    email: "rahulsharma@example.com",
    date_of_birth: "1995-07-15",
    gender: "Male",
    address: "456 Street Name, City, State",
    vehicle_type: "Bike",
    vehicle_registration_number: "MH12AB1234",
    driving_license_number: "DL123456789",
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* ✅ Navbar (Same as Dashboard) */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">ApnaKirana</h1>
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
          Delivery Person Request
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ Displaying Delivery Person Info in a Better Way */}
          <DetailCard title="Full Name" value={DeliveryPersonRequests.full_name} />
          <DetailCard title="Phone Number" value={DeliveryPersonRequests.phone_number} />
          <DetailCard title="Email" value={DeliveryPersonRequests.email} />
          <DetailCard title="Date of Birth" value={DeliveryPersonRequests.date_of_birth} />
          <DetailCard title="Gender" value={DeliveryPersonRequests.gender} />
          <DetailCard title="Address" value={DeliveryPersonRequests.address} />
          <DetailCard title="Vehicle Type" value={DeliveryPersonRequests.vehicle_type} />
          <DetailCard title="Vehicle Registration Number" value={DeliveryPersonRequests.vehicle_registration_number} />
          <DetailCard title="Driving License Number" value={DeliveryPersonRequests.driving_license_number} />
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

export default DeliveryPersonRequests;
