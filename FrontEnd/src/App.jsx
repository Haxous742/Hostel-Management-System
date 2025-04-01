import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'
import Signup from './signup'
import Dashboard from './dashboard'
import LandingPage from './LandingPage'
import './App.css'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App