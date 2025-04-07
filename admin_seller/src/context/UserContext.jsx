import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: null,
    name: null,
    token: null,
    seller_id: null, // Changed from id to seller_id for clarity
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const seller_id = localStorage.getItem("seller_id");
    
    if (token && role && name && seller_id) {
      setUser({ role, name, token, seller_id });
    }
  }, []);

  const login = (role, name, seller_id, token, callback) => {
    setUser({ role, name, token, seller_id });
    
    // Store user info in localStorage
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    localStorage.setItem("seller_id", seller_id);
    localStorage.setItem("token", token);
    
    if (callback) callback();
  };

  const logout = () => {
    setUser({ role: null, name: null, token: null, seller_id: null });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("seller_id");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};