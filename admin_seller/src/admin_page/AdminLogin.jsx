import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post("/api/admin/login", formData, {
        withCredentials: true
      });
      
      if (response.data.message === "Login successful") {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-orange-500 mb-6">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm sm:text-base mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 text-sm sm:text-base border rounded-md shadow-sm focus:ring focus:ring-orange-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm sm:text-base mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 text-sm sm:text-base border rounded-md shadow-sm focus:ring focus:ring-orange-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 text-sm sm:text-base rounded-md font-semibold shadow-md hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 