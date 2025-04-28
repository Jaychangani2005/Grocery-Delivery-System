import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '@/config';

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
  // Login or Register user
  login: async (email: string, password: string, name?: string): Promise<LoginResponse> => {
    try {
      // First try to login
      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password
        });

        const { user, token } = response.data;
        
        // Store token and user in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        
        return {
          user,
          token
        };
      } catch (loginError) {
        // If login fails, try to register if name is provided
        if (name) {
          const registerResponse = await axios.post(`${API_URL}/auth/register`, {
            name,
            email,
            password
          });

          const { user, token } = registerResponse.data;
          
          // Store token and user in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isLoggedIn', 'true');
          
          return {
            user,
            token
          };
        } else {
          throw new Error('Invalid credentials');
        }
      }
    } catch (error) {
      console.error('Login/Register error:', error);
      throw new Error('Failed to login/register');
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
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('user');
    return !!(token && isLoggedIn && user);
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