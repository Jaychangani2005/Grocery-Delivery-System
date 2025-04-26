import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add spacing for mobile navbar */}
      <div className="md:hidden h-16"></div>
      {/* Main content with proper padding */}
      <div className="p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper; 