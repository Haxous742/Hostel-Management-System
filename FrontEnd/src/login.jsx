import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth } from './firebase'
import { provider } from './firebase'
import axios from 'axios'

const login = () => {

    const handleLogin = async() => {

        signInWithPopup(auth, provider).then((loginResponse) => {
          
          const userDetails = {
              email: loginResponse.user.email,
              name: loginResponse.user.displayName,
              token: loginResponse.user.accessToken
          }

          // cheking if user is from @iiitb.ac.in or not
          if (userDetails.email.endsWith('@iiitb.ac.in')) {
              console.log(userDetails)
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
        <h1>LOGIN</h1>
    
        <button onClick={handleLogin}>Login</button>

    </div>
  )
}

export default login