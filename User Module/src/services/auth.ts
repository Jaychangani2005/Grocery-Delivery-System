import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:3000/api';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const authService = {
  // Login user
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      // For demo purposes, we'll simulate a successful login
      // In a real app, you would make an API call to your backend
      console.log('Logging in with:', { email, password });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user and token
      const mockUser: User = {
        id: 1,
        name: email.split('@')[0], // Use part of email as name
        email: email
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store token in localStorage
      localStorage.setItem('token', mockToken);
      
      return {
        user: mockUser,
        token: mockToken
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Failed to login');
    }
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', 'false');
  },
  
  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('token');
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }
}; 