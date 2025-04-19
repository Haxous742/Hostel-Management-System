import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Components/NavBar';
import SideBar from './Components/SideBar';

const LeavePortal = () => {
  const [leaveType, setLeaveType] = useState('Medical');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveList, setLeaveList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get('/api/student/leave/show')
      .then((res) => {
        setLeaveList(res.data);
        console.log('Fetched leave requests:', res.data);
      })
      .catch((err) => {
        console.error('Error fetching leave requests:', err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim() || !startDate || !endDate) return;

    setIsSubmitting(true);
    axios
      .post('/api/student/leave/new', {
        leaveType,
        reason,
        startDate,
        endDate,
      })
      .then((res) => {
        const newLeave = {
          id: res.data.id || Date.now(),
          leaveType,
          reason,
          startDate,
          endDate,
          status: 'Pending',
        };
        setLeaveList([...leaveList, newLeave]);
        setReason('');
        setStartDate('');
        setEndDate('');
      })
      .catch((err) => {
        console.error('Error submitting leave request:', err);
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
              Leave Application Portal
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Half - Leave Form */}
              <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Apply for Leave
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="leaveType" className="block text-gray-300 mb-1">
                      Leave Type
                    </label>
                    <select
                      id="leaveType"
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2"
                    >
                      <option value="Medical">Medical</option>
                      <option value="Personal">Personal</option>
                      <option value="Family Emergency">Family Emergency</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Start Date</label>
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">End Date</label>
                    <input
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="reason" className="block text-gray-300 mb-1">
                      Reason
                    </label>
                    <textarea
                      id="reason"
                      rows="4"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2"
                      placeholder="Explain your reason for leave..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Apply for Leave'}
                  </button>
                </form>
              </div>

              {/* Right Half - Leave List */}
              <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Your Leave Requests
                </h2>
                {leaveList.length === 0 ? (
                  <p className="text-gray-400 text-center italic">
                    No leave applications yet.
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {leaveList.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`w-3 h-3 rounded-full ${
                                {
                                  Medical: 'bg-red-500',
                                  Personal: 'bg-blue-500',
                                  'Family Emergency': 'bg-yellow-500',
                                  Other: 'bg-green-500',
                                }[item.leaveType] || 'bg-gray-400'
                              }`}
                            ></span>
                            <span className="font-medium text-gray-200">
                              {item.leaveType}
                            </span>
                          </div>
                          <span className="text-sm text-gray-400">
                            {new Date(item.startDate).toLocaleDateString()} -{' '}
                            {new Date(item.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-300">{item.reason}</p>
                        <div className="mt-2">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                              item.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : item.status === 'Approved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
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

export default LeavePortal;
