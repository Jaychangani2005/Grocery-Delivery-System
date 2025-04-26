import React, { useState, useEffect } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const NotificationToast = ({ message, type = 'info', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Auto-hide notification after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.max(0, prev - 2));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onClose]);

  if (!isVisible) return null;

  // Get icon based on notification type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-green-500" size={20} />;
      case 'error':
        return <FiAlertCircle className="text-red-500" size={20} />;
      default:
        return <FiInfo className="text-blue-500" size={20} />;
    }
  };

  // Get background color based on notification type
  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in max-w-md w-full">
      <div className={`rounded-lg shadow-lg p-4 border ${getBgColor()} relative overflow-hidden`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="ml-4 text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
          <div 
            className={`h-full ${
              type === 'success' ? 'bg-green-500' : 
              type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationToast; 