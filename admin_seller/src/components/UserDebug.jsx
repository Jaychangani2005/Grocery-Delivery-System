import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserDebug = () => {
  const { user } = useContext(UserContext);
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">User Debug Info</h2>
      <pre className="bg-white p-2 rounded overflow-auto">
        {JSON.stringify(user, null, 2)}
      </pre>
      <div className="mt-2">
        <p><strong>Role:</strong> {user?.role || 'Not set'}</p>
        <p><strong>Name:</strong> {user?.name || 'Not set'}</p>
        <p><strong>Seller ID:</strong> {user?.seller_id || 'Not set'}</p>
        <p><strong>Token:</strong> {user?.token ? 'Set' : 'Not set'}</p>
      </div>
    </div>
  );
};

export default UserDebug; 