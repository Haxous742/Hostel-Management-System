import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth } from './firebase'
import { provider } from './firebase'
import axios from 'axios'
import './App.css'
import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const login = () => {

    const handleLogin = async() => {

      // sign in with popup
      
        signInWithPopup(auth, provider).then((loginResponse) => {
          
          const userDetails = {
              email: loginResponse.user.email,
              name: loginResponse.user.displayName,
              token: loginResponse.user.accessToken
          }

          // cheking if user is from @iiitb.ac.in or not
          if (userDetails.email.endsWith('@iiitb.ac.in')) {
            // send user details 
            axios.post('/api/login', userDetails)
              .then((response) => {
                console.log(response.data)
                alert("Login Successfull")
              })
              .catch((error) => {
                console.log(error)
                alert("Login Failed")
              });
          }
          else{
            alert("Please use your @iiitb.ac.in email to login")
          }

      })
      .catch((error) => {
        console.log(error)
      });

    }

    const [passwordVisible, setPasswordVisible] = useState(false);

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
            )}
          </button>
        </div>

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

export default login