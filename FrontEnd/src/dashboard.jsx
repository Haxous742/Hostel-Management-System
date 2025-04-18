import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/NavBar';
import Sidebar from './Components/SideBar';

const Dashboard = () => {
  const navigate = useNavigate();

  // Verify cookie on load
  useEffect(() => {
    axios.post('/api/verify')
      .then((response) => {
        if (response.data.message === "cookie not verified") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios.post('/api/logout')
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:ml-64 mt-16">
          {/* Main content area remains empty */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;