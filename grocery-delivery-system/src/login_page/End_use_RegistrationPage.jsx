import { useState } from "react";
import { Link } from "react-router-dom"; // Assuming React Router is used for navigation

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Form Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.full_name.trim()) newErrors.full_name = "Full Name is required";
    if (!formData.email.includes("@") || !formData.email.includes("."))
      newErrors.email = "Enter a valid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Registration Successful ✅");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-orange-500 mb-6">
          End User Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 text-sm sm:text-base mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-3 text-sm sm:text-base border rounded-md shadow-sm focus:ring focus:ring-orange-300"
            />
            {errors.full_name && <p className="text-red-500 text-xs sm:text-sm">{errors.full_name}</p>}
          </div>

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
            />
            {errors.email && <p className="text-red-500 text-xs sm:text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm sm:text-base mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 text-sm sm:text-base border rounded-md shadow-sm focus:ring focus:ring-orange-300"
            />
            {errors.password && <p className="text-red-500 text-xs sm:text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 text-sm sm:text-base mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full p-3 text-sm sm:text-base border rounded-md shadow-sm focus:ring focus:ring-orange-300"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-xs sm:text-sm">{errors.confirm_password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 text-sm sm:text-base rounded-md font-semibold shadow-md hover:bg-orange-600 transition"
          >
            Register
          </button>
        </form>

        {/* ✅ Already Have an Account? */}
        <p className="text-center text-gray-600 text-sm sm:text-base mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
