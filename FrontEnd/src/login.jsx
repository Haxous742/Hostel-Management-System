import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth } from './firebase'
import { provider } from './firebase'
import axios from 'axios'

const login = () => {

    const handleLogin = async() => {

        const loginRespose= await signInWithPopup(auth, provider)
        console.log(loginRespose.user.accessToken)
        console.log(loginRespose)

      

    }

  return (
    <div>
        <h1>LOGIN</h1>
    
        <button onClick={handleLogin}>Login</button>

    </div>
  )
}

export default login