// shopkeeper_pages/Dashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SellerNavbar from "../components/SellerNavbar";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [outOfDelivery, setOutOfDelivery] = useState([]);
  const [completedDeliveries, setCompletedDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
  // For development, we'll use a hardcoded seller_id
  // In production, this should come from authentication
  const seller_id = "1"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [newOrdersRes, pendingRes, outRes, completedRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/dashboard/new-orders?seller_id=${seller_id}`),
          axios.get(`http://localhost:5000/api/dashboard/pending-deliveries?seller_id=${seller_id}`),
          axios.get(`http://localhost:5000/api/dashboard/out-of-deliveries?seller_id=${seller_id}`),
          axios.get(`http://localhost:5000/api/dashboard/completed-deliveries?seller_id=${seller_id}`)
        ]);

        setOrders(newOrdersRes.data);
        setPendingDeliveries(pendingRes.data);
        setOutOfDelivery(outRes.data);
        setCompletedDeliveries(completedRes.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data. Please make sure the backend server is running.');
        // Set empty arrays to prevent undefined errors
        setOrders([]);
        setPendingDeliveries([]);
        setOutOfDelivery([]);
        setCompletedDeliveries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seller_id]);

  const handleViewOrder = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      // Clean the orderId by removing the '#' prefix if it exists
      const cleanOrderId = orderId.replace('#', '');
      
      await axios.put(`http://localhost:5000/api/dashboard/complete-delivery/${cleanOrderId}`, {
        status: "Out For delivery",
        seller_id: seller_id
      });

      // Refresh the data after updating
      const [pendingRes, outRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/dashboard/pending-deliveries?seller_id=${seller_id}`),
        axios.get(`http://localhost:5000/api/dashboard/out-of-deliveries?seller_id=${seller_id}`)
      ]);

      setPendingDeliveries(pendingRes.data);
      setOutOfDelivery(outRes.data);
      setError(null);
    } catch (err) {
      console.error('Error completing order:', err);
      setError('Failed to update order status. Please try again.');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavbar />
      <div className="p-6 mt-20 text-center">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavbar />
      <div className="p-6 mt-20">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <SellerNavbar />
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
                  <ActionButton text="View" color="blue" onClick={() => handleViewOrder(order.id)} />
                </td>
              </>
            )}
            isActionColumn
          />
        </Section>

        <Section title="Pending Deliveries">
          <ResponsiveTable
            headers={["Order ID", "Customer Name", "Delivery Address", "Order Details", "Order Status", "Actions"]}
            data={pendingDeliveries}
            renderRow={(order) => (
              <>
                <td className="p-3">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td>{order.details}</td>
                <td className="text-red-500">{order.status}</td>
                <td className="flex gap-2">
                  <ActionButton text="Complete" color="blue" onClick={() => handleCompleteOrder(order.id)} />
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
              <ActionButton text="Complete" color="blue" onClick={() => handleCompleteOrder(item.id)} />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ActionButton = ({ text, color, onClick }) => {
  const colors = {
    gray: "bg-gray-500",
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
  };

  return (
    <button
      className={`${colors[color]} text-white px-3 py-1 rounded-full text-sm transition hover:opacity-80`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Dashboard;