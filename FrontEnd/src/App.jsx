import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'
import Signup from './signup'
import Dashboard from './dashboard'
import LandingPage from './LandingPage'
import Complaints from './complaints'
import Menu from './Menu'
import NotFound from './NotFound'
import './App.css'
import Leave from './Leave'
import Community from './Community'
import Profile from './Profile'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/Menu" element={<Menu />} />
        <Route path="/dashboard/Community" element={<Community />} />
        <Route path="/dashboard/Complaints" element={<Complaints />} />
        <Route path="/dashboard/Profile" element={<Profile />} />
        <Route path="/dashboard/Leave" element={<Leave />} />
        <Route path="/dashboard/Leave/Cab-Sharing" element={<Dashboard />} />

      
        {/* Catch-all route (must be last) */}
        <Route path="*" element={<NotFound />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App