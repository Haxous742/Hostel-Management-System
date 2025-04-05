import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'
import Signup from './signup'
import Dashboard from './dashboard'
import LandingPage from './LandingPage'
import Menu from './Menu'
import './App.css'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/Menu" element={<Menu />} />
        <Route path="/dashboard/Community" element={<Dashboard />} />
        <Route path="/dashboard/Complaints" element={<Dashboard />} />
        <Route path="/dashboard/Profile" element={<Dashboard />} />
        <Route path="/dashboard/Leave" element={<Dashboard />} />
        <Route path="/dashboard/Leave/Cab-Sharing" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App