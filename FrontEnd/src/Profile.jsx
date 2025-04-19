import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { FaQuestionCircle, FaTimes } from 'react-icons/fa';
import SideBar from './Components/SideBar';
import Navbar from './Components/NavBar';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Aryan Sharma',
    title: 'Part-time Prostitute',
    timezone: '',
    language: '',
    dob: '',
    gender: '',
    profileImage: '../public/img/dick.png',
    roomNo: 'A-203',
    phoneNo: '+91 9876543210',
    branch: 'Computer Science',
    rollNo: 'CS21B001',
    emailId: 'joseph@iiitb.ac.in',
    parentsEmailId: 'parent.joseph@gmail.com',
  });

  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isPersonalPopupOpen, setIsPersonalPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });
  const handleSave = () => console.log(profileData);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleUpload = () => {
    if (selectedFile) {
      setProfileData({ ...profileData, profileImage: previewImage });
      console.log('Uploading file:', selectedFile.name);
      setIsProfilePopupOpen(false);
      setSelectedFile(null);
      setPreviewImage(null);
    }
  };
  const handleDelete = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setProfileData({ ...profileData, profileImage: '../public/img/dick.png' });
    console.log('Profile picture deleted');
  };
  const handlePersonalSave = () => {
    console.log('Personal data updated:', profileData);
    setIsPersonalPopupOpen(false);
  };
  const handlePersonalDelete = () => {
    console.log('Personal data deletion triggered');
    setIsPersonalPopupOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <SideBar />
      <Navbar />
      <div className="sm:ml-64 mt-16">
        {/* Profile Card (Full Width) */}
        <div className="bg-slate-800 rounded-lg p-6 w-full relative shadow-md mb-6">
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
            <img src={profileData.profileImage} alt="Profile" className="w-20 h-20 rounded-full border-2 border-blue-500" />
            <div>
              <h3 className="text-xl font-bold">{profileData.name}</h3>
              <p className="text-gray-400">{profileData.title}</p>
            </div>
          </div>
          <button className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 flex items-center space-x-2" onClick={() => setIsProfilePopupOpen(true)}>
            <FiEdit2 />
            <span>Edit</span>
          </button>

          {/* Popup for Profile Picture Update */}
          {isProfilePopupOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-slate-800 rounded-lg p-6 w-96 shadow-lg relative">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Update profile picture</h2>
                  <button className="text-gray-400 hover:text-white" onClick={() => setIsProfilePopupOpen(false)}>
                    <FaTimes />
                  </button>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <img src={previewImage || profileData.profileImage} alt="Current Profile" className="w-16 h-16 rounded-full border-2 border-blue-500" />
                  <div>
                    <label className="block text-sm text-gray-400">Choose File</label>
                    <input type="file" accept="image/svg+xml, image/png, image/jpeg, image/gif" onChange={handleFileChange} className="w-full mt-1 p-2 rounded bg-slate-700 text-white" />
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    {selectedFile && <p className="text-sm text-white">{selectedFile.name}</p>}
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <button className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700" onClick={handleUpload} disabled={!selectedFile}>
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload new picture
                  </button>
                  <button className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded" onClick={() => setIsProfilePopupOpen(false)}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Personal Info */}
        <div className="w-full max-w-5xl mx-auto mt-8 bg-slate-800 rounded-lg p-6 shadow-md">
          {/* Personal info content remains unchanged */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 flex items-center space-x-2" onClick={() => setIsPersonalPopupOpen(true)}>
              <FiEdit2 />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm text-gray-400">Name</label><p className="text-white">{profileData.name}</p></div>
            <div><label className="block text-sm text-gray-400">Room No</label><p className="text-white">{profileData.roomNo}</p></div>
            <div><label className="block text-sm text-gray-400">Phone No</label><p className="text-white">{profileData.phoneNo}</p></div>
            <div><label className="block text-sm text-gray-400">Branch</label><p className="text-white">{profileData.branch}</p></div>
            <div><label className="block text-sm text-gray-400">Roll No</label><p className="text-white">{profileData.rollNo}</p></div>
            <div><label className="block text-sm text-gray-400">Email ID</label><p className="text-white">{profileData.emailId}</p></div>
            <div><label className="block text-sm text-gray-400">Parents Email ID</label><p className="text-white">{profileData.parentsEmailId}</p></div>
            <div><label className="block text-sm text-gray-400">Birthday</label><p className="text-white">{profileData.dob || "Not set"}</p></div>
            <div><label className="block text-sm text-gray-400">Gender</label><p className="text-white">{profileData.gender || "Not set"}</p></div>
          </div>
          {/* Personal popup remains unchanged */}
          {isPersonalPopupOpen && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-slate-800 rounded-lg p-6 w-full max-w-3xl shadow-lg relative">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Update user</h2>
                  <button className="text-gray-400 hover:text-white" onClick={() => setIsPersonalPopupOpen(false)}><FaTimes /></button>
                </div>
                <div className="mb-4"><h3 className="text-md font-medium mb-2">General Information</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div><label className="block text-sm text-gray-400">Name</label><input type="text" name="name" value={profileData.name} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-slate-700 text-white border border-gray-600" /></div>
                    <div><label className="block text-sm text-gray-400">Room No</label><input type="text" name="roomNo" value={profileData.roomNo} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-slate-700 text-white border border-gray-600" /></div>
                    <div><label className="block text-sm text-gray-400">Phone No</label><input type="text" name="phoneNo" value={profileData.phoneNo} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-slate-700 text-white border border-gray-600" /></div>
                    <div><label className="block text-sm text-gray-400">Branch</label><input type="text" name="branch" value={profileData.branch} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-slate-700 text-white border border-gray-600" /></div>
                    <div><label className="block text-sm text-gray-400">Roll No</label><input type="text" name="rollNo" value={profileData.rollNo} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-slate-700 text-white border border-gray-600" /></div>
                  </div>
                  <div className="space-y-4">
                    <div><label className="block text-sm text-gray-400">Email ID</label><input type="email" name="emailId" value={profileData.emailId} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-slate-700 text-white border border-gray-600" /></div>
                    <div><label className="block text-sm text-gray-400">Parents Email ID</label><input type="email" name="parentsEmailId" value={profileData.parentsEmailId} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-slate-700 text-white border border-gray-600" /></div>
                    <div><label className="block text-sm text-gray-400">Birthday</label><input type="date" name="dob" value={profileData.dob} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-slate-700 text-white border border-gray-600" /></div>
                    <div><label className="block text-sm text-gray-400">Gender</label><input type="text" name="gender" value={profileData.gender} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-slate-700 text-white border border-gray-600" /></div>
                  </div>
                </div>
                <div className="flex justify-end mt-6 space-x-4">
                  <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white" onClick={handlePersonalSave}>Update user</button>
                  <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white" onClick={handlePersonalDelete}>Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;