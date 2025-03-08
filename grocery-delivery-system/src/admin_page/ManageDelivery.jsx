import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const ManageDelivery = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Dummy Delivery Personnel Data (Replace with real data)
  const deliveryPersonnel = [
    {
      id: 1,
      full_name: "Rahul Sharma",
      phone: "9876543210",
      email: "rahul@example.com",
      date_of_birth: "1992-05-15",
      gender: "Male",
      emergency_contact: "9876541230",
      address: "123, Street, City",
      vehicle_type: "Bike",
      vehicle_registration_number: "MH12AB1234",
      driving_license_number: "DL123456789",
      bank_account_holder: "Rahul Sharma",
      bank_account_number: "123456789012",
      ifsc_code: "HDFC0001234",
      upi_id: "rahul@ybl",
    },
    {
      id: 2,
      full_name: "Priya Singh",
      phone: "9876512345",
      email: "priya@example.com",
      date_of_birth: "1995-08-10",
      gender: "Female",
      emergency_contact: "9876549876",
      address: "456, Avenue, City",
      vehicle_type: "Scooter",
      vehicle_registration_number: "DL10CD5678",
      driving_license_number: "DL0987654321",
      bank_account_holder: "Priya Singh",
      bank_account_number: "987654321098",
      ifsc_code: "ICIC0005678",
      upi_id: "priya@upi",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Navbar */}
      {/* <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-left">
        <h1 className="text-xl font-bold text-orange-500">GroceryDash</h1>
        <div className="hidden md:flex space-x-6">
          <NavItem text="Dashboard"  />
          <NavItem text="Manage Shopkeeper" />
          <NavItem text="Manage Delivery"active />
          <NavItem text="View User" />
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
          <NavItem text="Dashboard" active />
          <NavItem text="Manage Shopkeeper" />
          <NavItem text="Manage Delivery" />
          <NavItem text="View User" />
        </div>
      )} */}

      {/* ✅ Page Content */}
      <div className="mt-20 p-6">
        <h2 className="text-2xl font-semibold text-orange-500 mb-6 text-center">
          Manage Delivery Person
        </h2>

        {/* ✅ Full-Width Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-orange-100 text-gray-700">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Full Name</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Vehicle Type</th>
                <th className="p-4 text-left">Vehicle Reg. No.</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveryPersonnel.map((person) => (
                <tr key={person.id} className="border-t bg-orange-50 hover:bg-orange-100 transition">
                  <td className="p-4">{person.id}</td>
                  <td className="p-4">{person.full_name}</td>
                  <td className="p-4">{person.phone}</td>
                  <td className="p-4">{person.email}</td>
                  <td className="p-4">{person.vehicle_type}</td>
                  <td className="p-4">{person.vehicle_registration_number}</td>
                  <td className="text-center p-4">
                    <button
                      onClick={() => navigate(`/delivery-details/${person.id}`)}
                      className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm transition hover:opacity-80"
                    >
                      View
                    </button>
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

export default ManageDelivery;
