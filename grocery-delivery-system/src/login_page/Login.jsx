import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validation Function
  const validate = () => {
    let newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Login Successful ✅");
      console.log("Logged in:", formData);
      // Redirect to dashboard or homepage after login
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-orange-500 mb-6">Login</h2>

        <form className="space-y-5">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          {/* Login Button */}
          <div className="flex justify-between items-center">
            <Button text="Login" onClick={handleLogin} color="orange" />
            <p className="text-sm">
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Reusable Components
const InputField = ({ label, name, type = "text", value, onChange, error }) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const Button = ({ text, onClick, color }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-white rounded bg-${color}-500`}
  >
    {text}
  </button>
);

export default Login;
