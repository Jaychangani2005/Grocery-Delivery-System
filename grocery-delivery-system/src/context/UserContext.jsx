// src/context/UserContext.js
import { createContext, useState } from "react";

// Create a context for user data
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { role: "seller" | "admin", name: "John" }

  // Function to log in a user
  const login = (role, name) => {
    setUser({ role, name });
  };

  // Function to log out a user
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};