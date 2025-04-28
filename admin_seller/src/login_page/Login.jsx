// src/login_page/Login.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { FiUser, FiLock } from "react-icons/fi";

// Configure axios defaults
axios.defaults.withCredentials = true;

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLoginError("");
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setLoginError("");
      
      try {
        console.log("Attempting login with:", formData);
        const response = await axios.post("http://localhost:5000/api/auth/login", formData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
        
        console.log("Login response:", response.data);
        
        if (response.data.success) {
          // Call login with the appropriate ID based on role
          const seller_id = response.data.role === "seller" ? response.data.seller_id : null;
          login(
            response.data.role, 
            response.data.name, 
            seller_id,
            response.data.token,
            () => {
              console.log("Login successful:", { 
                role: response.data.role, 
                name: response.data.name,
                seller_id: seller_id,
                token: response.data.token
              });
              
              switch (response.data.role) {
                case "seller":
                  navigate("/dashboard", { replace: true });
                  break;
                case "admin":
                  navigate("/admin-dashboard", { replace: true });
                  break;
                case "delivery":
                  navigate("/delivery-dashboard", { replace: true });
                  break;
                case "end-user":
                  navigate("/", { replace: true });
                  break;
                default:
                  navigate("/", { replace: true });
              }
            }
          );
        }
      } catch (error) {
        console.error("Login error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        setLoginError(
          error.response?.data?.error || 
          error.message || 
          "An error occurred during login. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">ApnaKirana</h1>
          <p className="text-gray-600 mt-2">Your one-stop grocery delivery solution</p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Login to Your Account
          </h2>

          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {loginError}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 px-4 py-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 px-4 py-2 border rounded-md ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;