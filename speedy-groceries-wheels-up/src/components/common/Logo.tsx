import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-delivery-primary text-white rounded-full flex items-center justify-center font-bold text-xl">SD</div>
      <span className="text-xl font-bold text-gray-900">ApnaKirana Delivery</span>
    </Link>
  );
};

export default Logo;
