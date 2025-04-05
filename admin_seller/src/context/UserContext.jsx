// // src/context/UserContext.js
// import React, { createContext, useState, useEffect } from "react";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState({
//     role: null,
//     name: null,
//     token: null,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setUser((prev) => ({ ...prev, token }));
//     }
//   }, []);

//   const login = (role, name, callback) => {
//     setUser({ role, name, token: localStorage.getItem("token") });
//     if (callback) callback();
//   };

//   const logout = () => {
//     setUser({ role: null, name: null, token: null });
//     localStorage.removeItem("token");
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };