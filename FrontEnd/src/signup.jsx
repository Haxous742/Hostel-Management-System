import { signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import './App.css';

const signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); 

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
      <div className="bg-gray-800 bg-transparent  border-2 border-white p-8 rounded-lg shadow-lg text-center w-96 z-10 animate-slide-up">
        <h1 className="text-white text-3xl font-bold mb-4">Welcome!</h1>
        <p className="text-gray-300 text-lg mb-6">
          Sign in to access the Hostel Management System.
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Input */}
        <div className="relative w-full mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Login */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error */}
        <button
          onClick={() => {
            if(!email.endsWith('@iiitb.ac.in')){
              setError("Invalid email address. Please use your IIITB email.");
              return;
            }
            setError('');
            navigate('/dashboard')}}
          className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default signup;