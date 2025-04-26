import { useNavigate } from "react-router-dom";

const shopkeeperRequest = () => {
  const navigate = useNavigate();

  const shopkeeper = {
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
          Shopkeeper Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ Displaying Shopkeeper Info in a Better Way */}
          <DetailCard title="Full Name" value={shopkeeper.full_name} />
          <DetailCard title="Phone Number" value={shopkeeper.phone_number} />
          <DetailCard title="Email" value={shopkeeper.email} />
          <DetailCard title="Store Name" value={shopkeeper.store_name} />
          <DetailCard title="Store Category" value={shopkeeper.store_category} />
          <DetailCard title="Store Address" value={shopkeeper.store_address} />
          <DetailCard title="Opening Hours" value={shopkeeper.opening_hours} />
          <DetailCard title="Closing Hours" value={shopkeeper.closing_hours} />
          <DetailCard title="FSSAI License" value={shopkeeper.fssai_license} />
          <DetailCard title="GST Number" value={shopkeeper.gst_number} />
          <DetailCard title="Bank Account Holder" value={shopkeeper.bank_account_holder} />
          <DetailCard title="Bank Account Number" value={shopkeeper.bank_account_number} />
          <DetailCard title="IFSC Code" value={shopkeeper.ifsc_code} />
          <DetailCard title="Bank Name" value={shopkeeper.bank_name} />
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

export default shopkeeperRequest;
