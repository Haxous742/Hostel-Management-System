import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./Components/SideBar";
import Navbar from "./Components/NavBar";

const PublicProfilePage = ({ userId }) => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true); // To show loading indicator while fetching data
  const [error, setError] = useState(null); // To handle errors





  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true); // Start loading
        const res = await axios.get(`/api/user/${userId}`);
        console.log("Fetched Profile Data:", res.data); // Log the fetched data
        if (res.data && res.data.student) {
          setProfileData(res.data.student); // Adjusting to use the student object from API
        } else {
          setError("Profile data not found.");
        }
        setLoading(false); // End loading
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data.");
        setLoading(false); // End loading even in case of error
      }
    };
  
    if (userId) fetchProfileData();
  }, []); // Added userId in dependency array
  





  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 dark:bg-gray-900 text-white">
        <SideBar />
        <Navbar />
        <main className="pt-16 sm:ml-64 p-6">
          <div className="max-w-4xl mx-auto text-center">Loading...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-800 dark:bg-gray-900 text-white">
        <SideBar />
        <Navbar />
        <main className="pt-16 sm:ml-64 p-6">
          <div className="max-w-4xl mx-auto text-center text-red-500">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 dark:bg-gray-900 text-white">
      <SideBar />
      <Navbar />
      <main className="pt-16 sm:ml-64 p-6">
        <div className="max-w-4xl mx-auto space-y-6 mt-6">
          {/* Profile Card */}
          <div className="bg-slate-900 p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-6 mb-6">
              <img
                src={profileData.avatarURL || "/img/default-avatar.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-blue-500"
              />
              <div>
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <p className="text-gray-400">{profileData.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                <div className="bg-gray-800 p-3 rounded">{profileData.name || "N/A"}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone</label>
                <div className="bg-gray-800 p-3 rounded">{profileData.phone || "N/A"}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">User ID</label>
                <div className="bg-gray-800 p-3 rounded">{profileData._id}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Batch</label>
                <div className="bg-gray-800 p-3 rounded">{profileData.batch || "N/A"}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Room Number</label>
                <div className="bg-gray-800 p-3 rounded">{profileData.roomNumber || "N/A"}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Parent's Email</label>
                <div className="bg-gray-800 p-3 rounded">{profileData.parentEmail || "N/A"}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Parent's Phone</label>
                <div className="bg-gray-800 p-3 rounded">{profileData.parentPhone || "N/A"}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Gender</label>
                <div className="bg-gray-800 p-3 rounded">{profileData.gender || "N/A"}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Date of Birth</label>
                <div className="bg-gray-800 p-3 rounded">
                  {new Date(profileData.dob).toLocaleDateString() || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicProfilePage;
