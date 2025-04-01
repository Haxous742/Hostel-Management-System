import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("Loading..."); // Initial state

  // Verify cookie on load
  useEffect(() => {
    axios.post('/api/verify')
      .then((response) => {
        if (response.data.message === "cookie not verified") {
          navigate("/");
        } else {
          const data= response.data.user;
          setContent(
            <div className="dashboard-content">
              <h1>Welcome {data.name}</h1>
              <p>Email: {data.email}</p>
              <p>Role: {data.role}</p>
            </div>
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setContent("Error loading dashboard.");
      });
  }, []);



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
      <>
      <div>{content}</div>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">Logout</button>
      </>

  );

};

export default Dashboard;
