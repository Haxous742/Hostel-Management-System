import React, { useState } from 'react';
import Navbar from './Components/NavBar';
import SideBar from './Components/SideBar';

const Complaints = () => {
  const [category, setCategory] = useState('Mess');
  const [complaint, setComplaint] = useState('');
  const [complaintsList, setComplaintsList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaint.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setComplaintsList([
        ...complaintsList,
        {
          id: Date.now(),
          category,
          text: complaint,
          date: new Date().toLocaleDateString(),
          status: 'Pending',
        },
      ]);
      setComplaint('');      
      setIsSubmitting(false);
    }, 500);
  };

  // Dummy onLogout function for Navbar
  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Navbar */}
      <Navbar onLogout={handleLogout} />

      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="pt-20 sm:pl-64 min-h-screen">
        <div className="p-6">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              Complaints Portal
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Half - Complaint Form */}
              <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-[1.02] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                  File a Complaint
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                      >
                        <option value="Mess">Mess</option>
                        <option value="Hostel Rooms">Hostel Rooms</option>
                        <option value="Hostel Washroom">Hostel Washroom</option>
                        <option value="MPH">MPH</option>
                        <option value="Gym">Gym</option>
                        <option value="Others">Others</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {/* Map category to color */}
                        <span
                          className={`w-3 h-3 rounded-full inline-block ${
                            {
                              Mess: 'bg-red-500',
                              'Hostel Rooms': 'bg-green-500',
                              'Hostel Washroom': 'bg-yellow-500',
                              MPH: 'bg-purple-500',
                              Gym: 'bg-orange-500',
                              Others: 'bg-blue-500',
                            }[category]
                          }`}
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Your Complaint
                    </label>
                    <textarea
                      value={complaint}
                      onChange={(e) => setComplaint(e.target.value)}
                      rows="6"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Describe your complaint here..."
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !complaint.trim()}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                      isSubmitting || !complaint.trim()
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                  </button>
                </div>
              </div>

              {/* Right Half - Complaints List */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                  Your Complaints
                </h2>
                {complaintsList.length === 0 ? (
                  <p className="text-gray-500 text-center italic">
                    No complaints filed yet.
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {complaintsList.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`w-3 h-3 rounded-full ${
                                item.category === 'Mess' ? 'bg-red-500' : 'bg-blue-500'
                              }`}
                            ></span>
                            <span className="font-medium text-gray-700">
                              {item.category}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <p className="text-gray-600">{item.text}</p>
                        <div className="mt-2">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                              item.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;