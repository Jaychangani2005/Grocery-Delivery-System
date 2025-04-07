import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = async () => {
    try {
      setLoading(true);
      setError('');
      // Clear the token from localStorage
      localStorage.removeItem('token');
      // Call the logout function from context
      logout();
      // Redirect to login page
      navigate('/login');
    } catch (err) {
      setError('Error during logout. Please try again.');
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-500">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
              } transition duration-200`}
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                <p className="mt-1 text-lg text-gray-900">{user.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-lg text-gray-900 capitalize">{user.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Store ID</label>
                <p className="mt-1 text-lg text-gray-900">{user.seller_id}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-lg text-gray-900">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 