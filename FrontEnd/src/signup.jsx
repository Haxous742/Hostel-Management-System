<<<<<<< Updated upstream
<<<<<<< Updated upstream:FrontEnd/src/login.jsx
import { signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import './App.css';

const login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); 
=======
=======
>>>>>>> Stashed changes

import React from 'react'
import './App.css'
import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const signup = () => {

    

    const [passwordVisible, setPasswordVisible] = useState(false);
<<<<<<< Updated upstream
>>>>>>> Stashed changes:FrontEnd/src/signup.jsx

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
=======

  return (
    
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
    {/* Welcome Message with Image Overlay */}
    <div
      className="relative flex items-center justify-center w-full md:w-1/2 bg-gradient-to-r from-indigo-900 to-gray-900"
      style={{
        backgroundImage: `src('. ./public/img/Hostel.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 "></div>
      <div className="relative text-center z-10">
        <h1 className="text-white text-4xl font-bold">Welcome!</h1>
        <p className="text-gray-300 text-lg mt-2">
          Use these awesome forms to login or create new account in your project for free.
        </p>
      </div>
    </div>

    {/* Registration Form */}
    <div className="flex items-center justify-center w-full md:w-1/2">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        {/* Name Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input with Toggle */}
        <div className="mb-4 relative">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {passwordVisible ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
>>>>>>> Stashed changes
            )}
          </button>
        </div>

<<<<<<< Updated upstream
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

<<<<<<< Updated upstream:FrontEnd/src/login.jsx
export default login;
=======
export default signup;
>>>>>>> Stashed changes:FrontEnd/src/signup.jsx
=======
        {/* Terms and Conditions Checkbox */}
        <div className="mb-4">
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2 text-blue-500" />
            I agree to the TERMS and CONDITION
          </label>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          SIGN UP
        </button>
      </form>
    </div>
  </div>
  )
}

export default signup;
>>>>>>> Stashed changes
