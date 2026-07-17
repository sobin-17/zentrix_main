import React from 'react';
import { Link } from 'react-router-dom';

const OurPortfolio = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Our Portfolio</h1>
      <p className="text-gray-400 mb-8">Coming soon — exciting projects are on the way!</p>
      <Link to="/" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">
        Back to Home
      </Link>
    </div>
  );
};

export default OurPortfolio;