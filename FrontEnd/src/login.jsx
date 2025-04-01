import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase';
import { provider } from './firebase';
import './App.css';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const login = () => {
  
  const navigate = useNavigate(); 
     
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <img
        src="../public/img/Hostel.jpg"
        alt="Hostel"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Transparent Rectangle */}
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg text-center w-96 z-10 animate-slide-up">
        <h1 className="text-white text-3xl font-bold mb-4">Welcome!</h1>
        <p className="text-gray-300 text-lg mb-6">
          Sign in to access the Hostel Management System.
        </p>

        {/* Sign in with Microsoft Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft Logo"
            className="h-5 w-5 mr-2"
          />
          Sign in with Microsoft
        </button>
      </div>
    </div>
  );
};

export default login;