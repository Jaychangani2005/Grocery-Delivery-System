import React, { useState, useEffect } from 'react';
import { FiBell, FiX } from 'react-icons/fi';

const NotificationToast = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide notification after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-md z-50 animate-fade-in">
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-orange-100 rounded-full p-2">
          <FiBell className="h-5 w-5 text-orange-500" />
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">New Order Received!</p>
          <p className="mt-1 text-sm text-gray-500">
            Order #{notification.orderId} from {notification.customer} at {notification.address}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast; 