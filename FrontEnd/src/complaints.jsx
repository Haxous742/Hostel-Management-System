import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Components/NavBar';
import SideBar from './Components/SideBar';

const Complaints = () => {
  const [category, setCategory] = useState('Mess');
  const [complaint, setComplaint] = useState('');
  const [complaintsList, setComplaintsList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get('/api/student/complaints/show')
      .then((res) => {
        setComplaintsList(res.data);
        console.log('Fetched complaints:', res.data);
      })
      .catch((err) => {
        console.error('Error fetching complaints:', err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaint.trim()) return;

    setIsSubmitting(true);
    axios
      .post('/api/student/complaints/new', {
        category,
        text: complaint,
      })
      .then((res) => {
        const newComplaint = {
          id: res.data.id || Date.now(),
          category,
          text: complaint,
          date: new Date().toLocaleDateString(),
          status: 'Pending',
        };
        setComplaintsList([...complaintsList, newComplaint]);
        setComplaint('');
      })
      .catch((err) => {
        console.error('Error submitting complaint:', err);
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar onLogout={handleLogout} />
      <SideBar />
      <div className="pt-20 sm:pl-64 min-h-screen">
        <div className="p-6">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">
              Complaints Portal
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Half - Complaint Form */}
              <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Submit a Complaint
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="category" className="block text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2"
                    >
                      <option value="Mess">Mess</option>
                      <option value="Hostel Rooms">Hostel Rooms</option>
                      <option value="Hostel Washroom">Hostel Washroom</option>
                      <option value="MPH">MPH</option>
                      <option value="Gym">Gym</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="complaint" className="block text-gray-300 mb-1">
                      Complaint
                    </label>
                    <textarea
                      id="complaint"
                      rows="4"
                      value={complaint}
                      onChange={(e) => setComplaint(e.target.value)}
                      className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2"
                      placeholder="Describe your issue..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                  </button>
                </form>
              </div>

              {/* Right Half - Complaints List */}
              <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Your Complaints
                </h2>
                {complaintsList.length === 0 ? (
                  <p className="text-gray-400 text-center italic">
                    No complaints filed yet.
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {complaintsList.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`w-3 h-3 rounded-full ${
                                {
                                  Mess: 'bg-red-500',
                                  'Hostel Rooms': 'bg-green-500',
                                  'Hostel Washroom': 'bg-yellow-500',
                                  MPH: 'bg-purple-500',
                                  Gym: 'bg-orange-500',
                                  Others: 'bg-blue-500',
                                }[item.category] || 'bg-gray-400'
                              }`}
                            ></span>
                            <span className="font-medium text-gray-200">
                              {item.category}
                            </span>
                          </div>
                          <span className="text-sm text-gray-400">{item.date}</span>
                        </div>
                        <p className="text-gray-300">{item.text}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                              item.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {item.status}
                          </span>
                          <button
                            onClick={() => {
                              const updatedComplaintsList = complaintsList.filter((_, i) => i !== idx);
                              setComplaintsList(updatedComplaintsList);
                            }}
                            className="bg-red-600 text-white px-3 py-1 text-xs rounded-lg hover:bg-red-700 transition-all"
                          >
                            Delete Complaint
                          </button>
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
