// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // For navigation

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   // ✅ Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Validation Function
//   const validate = () => {
//     let newErrors = {};

//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       newErrors.email = "Enter a valid email";

//     if (!formData.password.trim()) newErrors.password = "Password is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Handle Login
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       alert("Login Successful ✅");
//       console.log("Logged in:", formData);
//       // Redirect to dashboard or homepage after login
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-lg">
//         <h2 className="text-2xl sm:text-3xl font-semibold text-center text-orange-500 mb-6">Login</h2>

//         <form className="space-y-5">
//           <InputField
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             error={errors.email}
//           />
//           <InputField
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={errors.password}
//           />

//           {/* Login Button */}
//           <div className="flex justify-between items-center">
//             <Button text="Login" onClick={handleLogin} color="orange" />
//             <p className="text-sm">
//               Don't have an account?{" "}
//               <span
//                 className="text-blue-500 cursor-pointer"
//                 onClick={() => navigate("/register")}
//               >
//                 Create New Account
//               </span>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // ✅ Reusable Components
// const InputField = ({ label, name, type = "text", value, onChange, error }) => (
//   <div>
//     <label className="block text-gray-700">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full p-2 border rounded"
//     />
//     {error && <p className="text-red-500 text-sm">{error}</p>}
//   </div>
// );

// const Button = ({ text, onClick, color }) => (
//   <button
//     onClick={onClick}
//     className={`px-4 py-2 text-white rounded bg-${color}-500`}
//   >
//     {text}
//   </button>
// );

// export default Login;





// Working   Sat-3:30
// login_page/Login.jsx
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";

// const Login = () => {
//   const { login } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate login logic
//     if (formData.email === "seller@gmail.com") {
//       login("seller", "Seller Name");
//       navigate("/seller-dashboard");
//     } else if (formData.email === "admin@gmail.com") {
//       login("admin", "Admin Name");
//       navigate("/admin-dashboard");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;















// // src/login_page/Login.jsx
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";

// const Login = () => {
//   const { login } = useContext(UserContext); // Access the login function from UserContext
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   // ✅ Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Validation Function
//   const validate = () => {
//     let newErrors = {};

//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       newErrors.email = "Enter a valid email";

//     if (!formData.password.trim()) newErrors.password = "Password is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Handle Login
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       // Simulate login logic
//       if (formData.email === "seller@gmail.com") {
//         login("seller", "Seller Name");
//         navigate("/seller-dashboard");
//       } else if (formData.email === "admin@gmail.com") {
//         login("admin", "Admin Name");
//         navigate("/admin-dashboard");
//       } else {
//         alert("Invalid credentials");
//       }
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-lg">
//         <h2 className="text-2xl sm:text-3xl font-semibold text-center text-orange-500 mb-6">Login</h2>

//         <form className="space-y-5">
//           <InputField
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             error={errors.email}
//           />
//           <InputField
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={errors.password}
//           />

//           {/* Login Button */}
//           <div className="flex justify-between items-center">
//             <Button text="Login" onClick={handleLogin} color="orange" />
//             <p className="text-sm">
//               Don't have an account?{" "}
//               <span
//                 className="text-blue-500 cursor-pointer"
//                 onClick={() => navigate("/register")}
//               >
//                 Create New Account
//               </span>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // ✅ Reusable Components
// const InputField = ({ label, name, type = "text", value, onChange, error }) => (
//   <div>
//     <label className="block text-gray-700">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`w-full p-2 border rounded ${
//         error ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {error && <p className="text-red-500 text-sm">{error}</p>}
//   </div>
// );

// const Button = ({ text, onClick, color }) => (
//   <button
//     onClick={onClick}
//     className={`px-4 py-2 text-white rounded bg-${color}-500 hover:bg-${color}-600 transition`}
//   >
//     {text}
//   </button>
// );

// export default Login;



























// src/login_page/Login.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { login } = useContext(UserContext); // Access the login function from UserContext
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showRegistrationOptions, setShowRegistrationOptions] = useState(false); // State to show registration options

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
      // Simulate login logic
      if (formData.email === "seller@gmail.com") {
        login("seller", "Seller Name");
        navigate("/seller-dashboard");
      } else if (formData.email === "admin@gmail.com") {
        login("admin", "Admin Name");
        navigate("/admin-dashboard");
      } else {
        alert("Invalid credentials");
      }
    }
  };

  // ✅ Handle Registration Option Selection
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
                onClick={() => setShowRegistrationOptions(true)}
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>

        {/* Registration Options Modal */}
        {showRegistrationOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-center mb-4">Choose Registration Type</h3>
              <div className="space-y-4">
                <Button
                  text="Delivery Registration"
                  onClick={() => handleRegistrationOption("delivery")}
                  color="blue"
                />
                <Button
                  text="End User Registration"
                  onClick={() => handleRegistrationOption("end-user")}
                  color="green"
                />
                <Button
                  text="Seller Registration"
                  onClick={() => handleRegistrationOption("seller")}
                  color="orange"
                />
                <Button
                  text="Cancel"
                  onClick={() => setShowRegistrationOptions(false)}
                  color="gray"
                />
              </div>
            </div>
          </div>
        )}
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
      className={`w-full p-2 border rounded ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const Button = ({ text, onClick, color }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-2 text-white rounded bg-${color}-500 hover:bg-${color}-600 transition`}
  >
    {text}
  </button>
);

export default Login;