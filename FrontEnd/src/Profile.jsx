import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { FaQuestionCircle } from 'react-icons/fa';
import SideBar from './Components/SideBar';
import Navbar from './Components/NavBar';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Joseph McFall',
    title: 'Web Developer',
    timezone: '',
    language: '',
    dob: '',
    gender: '',
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log(profileData);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <SideBar />
      <Navbar />
      <div className="ml-64 mt-16">
        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Profile Card */}
          <div className="bg-slate-800 rounded-lg p-6 w-full md:w-1/3 relative shadow-md mb-6 md:mb-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Profile Picture</h2>
              <div className="relative group">
                <FaQuestionCircle className="text-gray-400 cursor-pointer" />
                <div className="absolute hidden group-hover:block top-6 left-0 bg-gray-700 text-xs p-2 rounded w-48 z-10">
                  You can change your profile picture by clicking on the edit tab.
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-blue-500"
              />
              <div>
                <h3 className="text-xl font-bold">{profileData.name}</h3>
                <p className="text-gray-400">{profileData.title}</p>
              </div>
            </div>
            <button className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 flex items-center space-x-2">
              <FiEdit2 />
              <span>Edit</span>
            </button>
          </div>

          {/* Settings Form */}
          <div className="bg-slate-800 rounded-lg p-6 w-full md:w-2/3 shadow-md mb-6 md:mb-0">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm text-gray-400">Timezone</label>
                <select
                  name="timezone"
                  value={profileData.timezone}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 rounded bg-slate-700 text-white"
                >
                  <option value="">Select timezone</option>
                  <option value="UTC-08:00">UTC-08:00 - Pacific Standard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400">Language</label>
                <select
                  name="language"
                  value={profileData.language}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 rounded bg-slate-700 text-white"
                >
                  <option value="">Select language</option>
                  <option value="English">English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={profileData.dob}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 rounded bg-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400">Gender</label>
                <select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 rounded bg-slate-700 text-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>

        {/* Additional Personal Info */}
        <div className="w-full max-w-5xl mx-auto mt-8 bg-slate-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400">Name</label>
              <p className="text-white">{profileData.name}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Room No</label>
              <p className="text-white">A-203</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Phone No</label>
              <p className="text-white">+91 9876543210</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Branch</label>
              <p className="text-white">Computer Science</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Roll No</label>
              <p className="text-white">CS21B001</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Email ID</label>
              <p className="text-white">joseph@iiitb.ac.in</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Parents Email ID</label>
              <p className="text-white">parent.joseph@gmail.com</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Birthday</label>
              <p className="text-white">{profileData.dob || "Not set"}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Gender</label>
              <p className="text-white">{profileData.gender || "Not set"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;