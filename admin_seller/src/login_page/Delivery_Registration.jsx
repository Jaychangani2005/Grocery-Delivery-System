// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // For redirection

// const DeliveryRegistration = () => {
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     full_name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//     date_of_birth: "",
//     gender: "",
//     emergency_contact: "",
//     address: "",
//     vehicle_type: "",
//     vehicle_registration_number: "",
//     driving_license_number: "",
//     driving_license_image: null,
//     bank_account_holder: "",
//     bank_account_number: "",
//     ifsc_code: "",
//     upi_id: "",
//   });

//   const [errors, setErrors] = useState({});

//   // ✅ Handle Input Change
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "driving_license_image") {
//       setFormData({ ...formData, [name]: files[0] }); // Handle file upload
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
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
//       if (!formData.date_of_birth) newErrors.date_of_birth = "Date of Birth is required";
//       else {
//         const dob = new Date(formData.date_of_birth);
//         const age = new Date().getFullYear() - dob.getFullYear();
//         if (age < 18) newErrors.date_of_birth = "You must be 18+ years old";
//       }
//       if (!formData.gender) newErrors.gender = "Gender is required";
//       if (!formData.emergency_contact.trim()) newErrors.emergency_contact = "Emergency Contact is required";
//       if (!formData.address.trim()) newErrors.address = "Address is required";
//     }

//     if (step === 2) {
//       if (!formData.vehicle_type) newErrors.vehicle_type = "Vehicle Type is required";
//       if (!formData.vehicle_registration_number.trim())
//         newErrors.vehicle_registration_number = "Vehicle Registration Number is required";
//       if (!formData.driving_license_number.trim())
//         newErrors.driving_license_number = "Driving License Number is required";
//       if (!formData.driving_license_image) newErrors.driving_license_image = "Driving License Image is required";
//     }

//     if (step === 3) {
//       if (!formData.bank_account_holder.trim())
//         newErrors.bank_account_holder = "Account Holder Name is required";
//       if (!/^\d{9,18}$/.test(formData.bank_account_number))
//         newErrors.bank_account_number = "Enter a valid account number";
//       if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc_code))
//         newErrors.ifsc_code = "Enter a valid IFSC code";
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
//       alert("Delivery Person Registration Successful ✅");
//       console.log(formData);
//       navigate("/success"); // Redirect to success page
//     }
//   };

//   const redirectToLogin = () => {
//     navigate("/login"); // Redirect to the login page
//   };


//   return (
//     <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-lg">
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-orange-500 mb-6">
//           Delivery Person Registration
//         </h2>

//         <form className="space-y-4 sm:space-y-5">
//           {/* Step 1: Delivery Details */}
//           {step === 1 && (
//             <>
//               <InputField label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} error={errors.full_name} />
//               <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} />
//               <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
//               <InputField label="Date of Birth" name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} error={errors.date_of_birth} />
//               <Dropdown label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} error={errors.gender} />
//               <InputField label="Emergency Contact" name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} error={errors.emergency_contact} />
//               <InputField label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
//               <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
//               <InputField label="Confirm Password" name="confirm_password" type="password" value={formData.confirm_password} onChange={handleChange} error={errors.confirm_password} />
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

//           {/* Step 2: Vehicle Details */}
//           {step === 2 && (
//             <>
//               <Dropdown label="Vehicle Type" name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} options={["Bike", "Scooter"]} error={errors.vehicle_type} />
//               <InputField label="Vehicle Registration Number" name="vehicle_registration_number" value={formData.vehicle_registration_number} onChange={handleChange} error={errors.vehicle_registration_number} />
//               <InputField label="Driving License Number" name="driving_license_number" value={formData.driving_license_number} onChange={handleChange} error={errors.driving_license_number} />
//               <FileInput label="Driving License Image" name="driving_license_image" onChange={handleChange} error={errors.driving_license_image} />
//             </>
//           )}

//           {/* Step 3: Bank Details */}
//           {step === 3 && (
//             <>
//               <InputField label="Bank Account Holder" name="bank_account_holder" value={formData.bank_account_holder} onChange={handleChange} error={errors.bank_account_holder} />
//               <InputField label="Bank Account Number" name="bank_account_number" value={formData.bank_account_number} onChange={handleChange} error={errors.bank_account_number} />
//               <InputField label="IFSC Code" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} error={errors.ifsc_code} />
//               <InputField label="UPI ID (Optional)" name="upi_id" value={formData.upi_id} onChange={handleChange} />
//             </>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between">
//             {step > 1 && <Button text="Previous" onClick={handlePrev} color="gray" />}
//             {step < 3 ? <Button text="Next" onClick={handleNext} color="orange" /> : <Button text="Submit" onClick={handleSubmit} color="green" />}
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

// const Dropdown = ({ label, name, value, onChange, options, error }) => (
//   <div>
//     <label className="block text-gray-700 text-sm sm:text-base">{label}</label>
//     <select
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`w-full p-2 border rounded text-sm sm:text-base ${
//         error ? "border-red-500" : "border-gray-300"
//       }`}
//     >
//       <option value="">Select {label}</option>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//     {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
//   </div>
// );

// const FileInput = ({ label, name, onChange, error }) => (
//   <div>
//     <label className="block text-gray-700 text-sm sm:text-base">{label}</label>
//     <input
//       type="file"
//       name={name}
//       onChange={onChange}
//       className={`w-full p-2 border rounded text-sm sm:text-base ${
//         error ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
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

// export default DeliveryRegistration;