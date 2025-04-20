import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './signup';
import Dashboard from './dashboard';
import LandingPage from './LandingPage';
import Complaints from './complaints';
import Mess from './mess';
import NotFound from './NotFound';
import './App.css';
import Leave from './Leave';
import Community from './Community';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute'; 
import YourPosts from './yourposts';

import PublicProfile from './PublicProfile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/mess" element={<ProtectedRoute><Mess /></ProtectedRoute>} />
        <Route path="/dashboard/Community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/dashboard/Community/yourposts" element={<ProtectedRoute><YourPosts /></ProtectedRoute>} />
        <Route path="/dashboard/Complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
        <Route path="/dashboard/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard/Leave" element={<ProtectedRoute><Leave /></ProtectedRoute>} />
        <Route path="/dashboard/Leave/Cab-Sharing" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />


        <Route path="/user/:userId" element={<ProtectedRoute><PublicProfile /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
