import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth } from './firebase'
import { provider } from './firebase'
import axios from 'axios'
import './App.css'

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

     

  return (
    <div>
        <h1 >LOGIN</h1>
    
        <button className='px-4 py-2 text-white bg-gradient-to-r from-pink-500 to-red-500 rounded hover:opacity-90' onClick={handleLogin}>Login</button>

    </div>
  )
}

export default login