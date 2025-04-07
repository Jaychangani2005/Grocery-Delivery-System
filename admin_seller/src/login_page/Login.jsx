// src/login_page/Login.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

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
  const [showRegistrationOptions, setShowRegistrationOptions] = useState(false);
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

  const handleRegistrationOption = (option) => {
    switch (option) {
      case "delivery":
        navigate("/delivery-registration");
        break;
      case "end-user":
        navigate("/end-user-registration");
        break;
      case "seller":
        navigate("/seller-registration");
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-orange-500 mb-6">
          Login
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
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <div className="mt-4 space-y-3">
            <button
              onClick={() => handleRegistrationOption("seller")}
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
              disabled={isLoading}
            >
              Register as Seller
            </button>
            <button
              onClick={() => handleRegistrationOption("delivery")}
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
              disabled={isLoading}
            >
              Register as Delivery Agent
            </button>
            <button
              onClick={() => handleRegistrationOption("end-user")}
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
              disabled={isLoading}
            >
              Register as Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;