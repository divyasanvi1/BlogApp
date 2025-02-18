import React from 'react';
import Particlesbackground from '../components/Particlesbackground'; 

const NotFound = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen  text-white">
      
      <Particlesbackground />

     
      <div className="relative z-10 text-center bg-gray-800/50 backdrop-blur-lg p-10 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-500 animate-bounce">404</h1>
        <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
        <p className="text-gray-300 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-400 transition"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
