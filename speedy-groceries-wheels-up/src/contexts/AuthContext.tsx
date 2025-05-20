import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  license_number: string;
  status: string;
  is_approved: number;
  is_rejected: number;
  mobilenumber: string;
  Aadharnumber: string;
  pancard: string;
  Address: string;
  city: string;
  state: string;
  pincode: string;
  vehicle_type: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    mobilenumber: string;
    Aadharnumber: string;
    pancard: string;
    Address: string;
    city: string;
    state: string;
    pincode: string;
    vehicle_type: 'Bike' | 'Scooter' | 'car';
    license_number: string;
  }) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const navigate = useNavigate();

  // Effect to handle navigation based on auth state
  useEffect(() => {
    if (user && token) {
      // If we're on the login page and user is authenticated, redirect to dashboard
      if (window.location.pathname === '/login') {
        navigate('/delivery');
      }
    } else {
      // If we're not on the login page and user is not authenticated, redirect to login
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        navigate('/login');
      }
    }
  }, [user, token, navigate]);

  const login = (userData: User, newToken: string) => {
    try {
      // Store in state
      setUser(userData);
      setToken(newToken);

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', newToken);

      // Navigate to dashboard
      navigate('/delivery');
    } catch (error) {
      console.error('Error during login:', error);
      // Clear any partial data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
    }
  };

  const logout = () => {
    // Clear from state
    setUser(null);
    setToken(null);

    // Clear from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Navigate to login
    navigate('/login');
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    mobilenumber: string;
    Aadharnumber: string;
    pancard: string;
    Address: string;
    city: string;
    state: string;
    pincode: string;
    vehicle_type: 'Bike' | 'Scooter' | 'car';
    license_number: string;
  }) => {
    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || result.error || 'Registration failed');
      }

      // After successful registration, navigate to login
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
