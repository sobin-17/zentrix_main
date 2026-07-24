import React from 'react';
import { Link } from 'react-router-dom';

const OurProducts = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Products</h1>
      <p className="text-gray-400 text-base sm:text-lg mb-8 text-center px-4">
        Coming soon — exciting products are on the way!
      </p>
      <Link to="/" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors font-medium">
        Back to Home
      </Link>
    </div>
  );
};

export default OurProducts;