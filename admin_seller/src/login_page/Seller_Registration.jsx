// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// const SellerRegistration = () => {
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     full_name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//     store_name: "",
//     store_category: "Grocery",
//     store_address: "",
//     opening_hours: "",
//     closing_hours: "",
//     fssai_license: "",
//     business_address: "",
//     gst_number: "",
//     bank_account_holder: "",
//     bank_account_number: "",
//     ifsc_code: "",
//     bank_name: "",
//   });

//   const [errors, setErrors] = useState({});

//   // ✅ Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Validation Function
//   const validateStep = () => {
//     let newErrors = {};

//     if (step === 1) {
//       if (!formData.full_name.trim()) newErrors.full_name = "Full Name is required";
//       if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit phone number";
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email";
//       if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
//       if (formData.password !== formData.confirm_password)
//         newErrors.confirm_password = "Passwords do not match";
//     }

//     if (step === 2) {
//       if (!formData.store_name.trim()) newErrors.store_name = "Store Name is required";
//       if (!formData.store_address.trim()) newErrors.store_address = "Store Address is required";
//       if (!formData.opening_hours.trim()) newErrors.opening_hours = "Opening Hours required";
//       if (!formData.closing_hours.trim()) newErrors.closing_hours = "Closing Hours required";
//       if (!formData.fssai_license.trim()) newErrors.fssai_license = "FSSAI License is required";
//       if (!formData.business_address.trim()) newErrors.business_address = "Business Address required";
//       if (!formData.gst_number.trim()) newErrors.gst_number = "GST Number is required";
//     }

//     if (step === 3) {
//       if (!formData.bank_account_holder.trim())
//         newErrors.bank_account_holder = "Account Holder Name required";
//       if (!/^\d{9,18}$/.test(formData.bank_account_number))
//         newErrors.bank_account_number = "Enter a valid account number";
//       if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc_code))
//         newErrors.ifsc_code = "Enter a valid IFSC code";
//       if (!formData.bank_name.trim()) newErrors.bank_name = "Bank Name is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };

//   // ✅ Handle Navigation
//   const handleNext = (e) => {
//     e.preventDefault(); // Prevent form submission
//     if (validateStep()) {
//       setStep(step + 1); // Move to the next step if validation passes
//     }
//   };

//   const handlePrev = (e) => {
//     e.preventDefault(); // Prevent form submission
//     setStep(step - 1); // Move to the previous step
//   };

//   // ✅ Handle Final Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateStep()) {
//       alert("Seller Registration Successful ✅");
//       console.log(formData);
//     }
//   };

//   // ✅ Redirect to Login Page
//   const redirectToLogin = () => {
//     navigate("/login"); // Redirect to the login page
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-lg">
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-orange-500 mb-6">
//           Seller Registration
//         </h2>

//         <form className="space-y-4 sm:space-y-5">
//           {/* Step 1: Seller Details */}
//           {step === 1 && (
//             <>
//               <InputField label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} error={errors.full_name} />
//               <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} />
//               <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
//               <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
//               <InputField label="Confirm Password" name="confirm_password" type="password" value={formData.confirm_password} onChange={handleChange} error={errors.confirm_password} />

//               {/* Already have an account? */}
//               <div className="text-center mt-4">
//                 <p className="text-gray-600 text-sm sm:text-base">
//                   Already have an account?{" "}
//                   <button
//                     type="button"
//                     onClick={redirectToLogin}
//                     className="text-orange-500 hover:underline focus:outline-none"
//                   >
//                     Login here
//                   </button>
//                 </p>
//               </div>
//             </>
//           )}

//           {/* Step 2: Store Details */}
//           {step === 2 && (
//             <>
//               <InputField label="Store Name" name="store_name" value={formData.store_name} onChange={handleChange} error={errors.store_name} />
//               <Dropdown label="Store Category" name="store_category" value={formData.store_category} onChange={handleChange} options={["Grocery", "Electronics", "Clothing", "Pharmacy"]} />
//               <InputField label="Store Address" name="store_address" value={formData.store_address} onChange={handleChange} error={errors.store_address} />
//               <InputField label="Opening Hours" name="opening_hours" type="time" value={formData.opening_hours} onChange={handleChange} error={errors.opening_hours} />
//               <InputField label="Closing Hours" name="closing_hours" type="time" value={formData.closing_hours} onChange={handleChange} error={errors.closing_hours} />
//               <InputField label="FSSAI License" name="fssai_license" value={formData.fssai_license} onChange={handleChange} error={errors.fssai_license} />
//               <InputField label="Business Address" name="business_address" value={formData.business_address} onChange={handleChange} error={errors.business_address} />
//               <InputField label="GST Number" name="gst_number" value={formData.gst_number} onChange={handleChange} error={errors.gst_number} />
//             </>
//           )}

//           {/* Step 3: Bank Details */}
//           {step === 3 && (
//             <>
//               <InputField label="Bank Account Holder" name="bank_account_holder" value={formData.bank_account_holder} onChange={handleChange} error={errors.bank_account_holder} />
//               <InputField label="Bank Account Number" name="bank_account_number" value={formData.bank_account_number} onChange={handleChange} error={errors.bank_account_number} />
//               <InputField label="IFSC Code" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} error={errors.ifsc_code} />
//               <InputField label="Bank Name" name="bank_name" value={formData.bank_name} onChange={handleChange} error={errors.bank_name} />
//             </>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between">
//             {step > 1 && (
//               <Button text="Previous" onClick={handlePrev} color="gray" />
//             )}
//             {step < 3 ? (
//               <Button text="Next" onClick={handleNext} color="orange" />
//             ) : (
//               <Button text="Submit" onClick={handleSubmit} color="green" />
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Reusable Components
// const InputField = ({ label, name, type = "text", value, onChange, error }) => (
//   <div>
//     <label className="block text-gray-700 text-sm sm:text-base">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`w-full p-2 border rounded text-sm sm:text-base ${
//         error ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
//   </div>
// );

// const Dropdown = ({ label, name, value, onChange, options }) => (
//   <div>
//     <label className="block text-gray-700 text-sm sm:text-base">{label}</label>
//     <select
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
//     >
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const Button = ({ text, onClick, color }) => (
//   <button
//     onClick={onClick}
//     className={`px-4 py-2 text-white rounded text-sm sm:text-base bg-${color}-500 hover:bg-${color}-600 transition`}
//   >
//     {text}
//   </button>
// );
// export default SellerRegistration;