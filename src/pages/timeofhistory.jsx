import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const TimeofHistory = () => {
  const { isDarkMode } = useTheme();
  const [view, setView] = useState('list');
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(new Date().getMonth());
  const [status, setStatus] = useState('All');
  const [dept, setDept] = useState('All');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [requests, setRequests] = useState([
    {id: 1, employee: 'Aditya Kadam', avatar: 'A', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '12/01/2025 08:00:00', endDate: '12/01/2025 17:00:00', duration: '1 days', status: 'Refused', department: 'Administration'},
    {id: 2, employee: 'Tanmay N', avatar: 'T', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '07/08/2025 08:00:00', endDate: '07/08/2025 17:00:00', duration: '1 days', status: 'Approved', department: 'Administration'},
    {id: 3, employee: 'Tanmay N', avatar: 'T', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '06/13/2025 08:00:00', endDate: '06/13/2025 17:00:00', duration: '1 days', status: 'Approved', department: 'Administration'},
    {id: 4, employee: 'Tanmay N', avatar: 'T', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '06/03/2025 08:00:00', endDate: '06/03/2025 17:00:00', duration: '1 days', status: 'Approved', department: 'Administration'},
    {id: 5, employee: 'Abhijeet Devkar', avatar: 'A', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '05/23/2025 08:00:00', endDate: '05/24/2025 17:00:00', duration: '1 days', status: 'To Approve', department: 'Administration'},
    {id: 6, employee: 'Tanmay N', avatar: 'T', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '05/07/2025 08:00:00', endDate: '05/07/2025 17:00:00', duration: '1 days', status: 'Approved', department: 'Administration'},
    {id: 7, employee: 'Maithili Parh', avatar: 'M', mode: 'By Employee', type: 'Unpaid', description: '', startDate: '05/02/2025 08:00:00', endDate: '05/02/2025 17:00:00', duration: '8 hours', status: 'To Approve', department: 'Administration'},
    {id: 8, employee: 'Tanmay N', avatar: 'T', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '04/30/2025 08:00:00', endDate: '04/30/2025 17:00:00', duration: '1 days', status: 'Approved', department: 'Administration'},
    {id: 9, employee: 'Tanmay N', avatar: 'T', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '04/20/2025 08:00:00', endDate: '04/20/2025 17:00:00', duration: '0 days', status: 'Refused', department: 'Administration'},
    {id: 10, employee: 'Tanmay N', avatar: 'T', mode: 'By Employee', type: 'Unpaid', description: '', startDate: '03/29/2025 08:00:00', endDate: '03/29/2025 17:00:00', duration: '0 hours', status: 'Refused', department: 'Administration'},
    {id: 11, employee: 'Pooja Maruti Pawar', avatar: 'P', mode: 'By Employee', type: 'Sick Time Off', description: 'I would like to request leave for Leave for Sister\'s Pregnancy from 21/03/2025 to 25/03/2025', startDate: '03/24/2025 08:00:00', endDate: '03/24/2025 17:00:00', duration: '1 days', status: 'Approved', department: 'Administration'},
    {id: 12, employee: 'Prajkta Salunke', avatar: 'P', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '03/24/2025 08:00:00', endDate: '03/24/2025 17:00:00', duration: '1 days', status: 'Approved', department: 'Administration'},
    {id: 13, employee: 'Tanmay N', avatar: 'T', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '03/23/2025 08:00:00', endDate: '03/23/2025 17:00:00', duration: '0 days', status: 'Refused', department: 'Administration'},
    {id: 14, employee: 'Pooja Maruti Pawar', avatar: 'P', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '03/10/2025 08:00:00', endDate: '03/10/2025 17:00:00', duration: '1 days', status: 'Approved', department: 'Administration'},
    {id: 15, employee: 'Shrinath Ghorpade', avatar: 'S', mode: 'By Employee', type: 'Unpaid', description: '', startDate: '03/10/2025 08:00:00', endDate: '03/15/2025 17:00:00', duration: '40 hours', status: 'Approved', department: 'Administration'},
    {id: 16, employee: 'Pooja Maruti Pawar', avatar: 'P', mode: 'By Employee', type: 'Sick Time Off', description: '', startDate: '03/07/2025 08:00:00', endDate: '03/07/2025 17:00:00', duration: '1 days', status: 'Refused', department: 'Administration'},
  ]);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const colors = {Approved: 'bg-green-500', Refused: 'bg-red-500', 'To Approve': 'bg-orange-500'};
  const badges = {
    Approved: isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800',
    Refused: isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800',
    'To Approve': isDarkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-800',
    'Second Approval': isDarkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800',
    'Approval': isDarkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-800'
  };
  const avatarColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500', 'bg-indigo-500'];

  const getDays = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirst = (y, m) => new Date(y, m, 1).getDay();
  const parseDate = (d) => new Date(d.split(' ')[0]);
  const getTimeOff = (y, m, d) => {
    const target = new Date(y, m, d);
    return requests.filter(r => target >= parseDate(r.startDate) && target <= parseDate(r.endDate));
  };

  const handleApprove = (id) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: 'Approved' } : request
      )
    );
  };

  const handleReject = (id) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: 'Refused' } : request
      )
    );
  };

  const filtered = requests.filter(r =>
    (status === 'All' || r.status === status) &&
    (dept === 'All' || r.department === dept) &&
    r.employee.toLowerCase().includes(search.toLowerCase())
  );

  const nextM = () => month === 11 ? (setMonth(0), setYear(year + 1)) : setMonth(month + 1);
  const prevM = () => month === 0 ? (setMonth(11), setYear(year - 1)) : setMonth(month - 1);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.background = '#181c2f';
      document.body.style.background = '#181c2f';
    } else {
      document.documentElement.style.background = '#f9fafb';
      document.body.style.background = '#f9fafb';
    }
    const handleResize = () => {
      const mainContent = document.querySelector('.main-content');
      if (!mainContent) return;
      mainContent.style.marginLeft = 'auto';
      mainContent.style.marginRight = 'auto';
      mainContent.style.width = '100%';
      mainContent.style.maxWidth = '100vw';
      mainContent.style.paddingLeft = '8px';
      mainContent.style.paddingRight = '8px';
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen w-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} font-sans`} style={{overflowX: 'auto'}}>
      <style>
        {`
        html, body {
          background: ${isDarkMode ? '#181c2f' : '#f9fafb'} !important;
        }
        .main-content {
          margin-left: auto !important;
          margin-right: auto !important;
          width: 100% !important;
          max-width: 1440px !important;
          padding-left: 24px !important;
          padding-right: 24px !important;
        }
        .navbar-space {
          margin-top: 32px !important;
          margin-bottom: 32px !important;
        }
        .custom-table th, .custom-table td {
          padding: 16px 10px;
          font-size: 1rem;
          text-align: left;
          vertical-align: middle;
          border: 1.5px solid ${isDarkMode ? '#374151' : '#e5e7eb'};
        }
        .custom-table th {
          font-weight: bold;
          background: ${isDarkMode ? '#232946' : '#f3f4f6'};
          color: ${isDarkMode ? '#f3f4f6' : '#1f2937'};
          font-size: 1.08rem;
          letter-spacing: 0.02em;
        }
        .custom-table tr {
          background: ${isDarkMode ? '#181c2f' : '#fff'};
          transition: background 0.2s;
        }
        .custom-table tr:hover {
          background: ${isDarkMode ? '#232946' : '#f1f5f9'};
        }
        .custom-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 32px 0 rgba(80,80,120,0.18), 0 1.5px 8px 0 rgba(80,80,120,0.10);
          background: ${isDarkMode ? '#181c2f' : '#fff'};
        }
        .action-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 20px;
          font-weight: bold;
          margin-left: 2px;
          margin-right: 2px;
          box-shadow: 0 1.5px 8px 0 rgba(80,80,120,0.13);
        }
        .approve-btn {
          color: #16a34a;
          background-color: transparent;
          border: 1.5px solid #16a34a;
        }
        .approve-btn:hover {
          background-color: #16a34a;
          color: white;
        }
        .reject-btn {
          color: #dc2626;
          background-color: transparent;
          border: 1.5px solid #dc2626;
        }
        .reject-btn:hover {
          background-color: #dc2626;
          color: white;
        }
        .searchbar-large {
          min-width: 400px;
          max-width: 600px;
          width: 100%;
          font-size: 1.08rem;
          box-shadow: 0 2px 12px 0 rgba(80,80,120,0.13);
        }
        @media (max-width: 1440px) {
          .main-content {
            max-width: 100vw !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
        @media (max-width: 1200px) {
          .main-content {
            max-width: 100vw !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
        }
        @media (max-width: 1024px) {
          .main-content {
            max-width: 100vw !important;
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
          .custom-table th, .custom-table td {
            font-size: 0.97rem;
            padding: 10px 6px;
          }
          .searchbar-large {
            min-width: 220px;
            max-width: 320px;
          }
        }
        @media (max-width: 900px) {
          .main-content {
            max-width: 100vw !important;
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
          .custom-table th, .custom-table td {
            font-size: 0.95rem;
            padding: 8px 4px;
          }
        }
        @media (max-width: 768px) {
          .main-content {
            max-width: 100vw !important;
            padding-left: 2px !important;
            padding-right: 2px !important;
          }
          .custom-table th, .custom-table td {
            font-size: 0.92rem;
            padding: 6px 2px;
          }
          .searchbar-large {
            min-width: 120px;
            max-width: 180px;
            font-size: 0.95rem;
          }
        }
        @media (max-width: 640px) {
          .custom-table {
            display: none !important;
          }
          .mobile-card {
            display: block !important;
          }
        }
        @media (min-width: 641px) {
          .mobile-card {
            display: none !important;
          }
        }
        .mobile-card {
          box-shadow: 0 4px 20px 0 rgba(80,80,120,0.18), 0 1.5px 8px 0 rgba(80,80,120,0.10);
        }
        .header-shadow {
          box-shadow: 0 6px 32px 0 rgba(80,80,120,0.13), 0 1.5px 8px 0 rgba(80,80,120,0.08);
        }
        .calendar-compact {
          max-width: 900px !important;
          margin-left: auto;
          margin-right: auto;
        }
        .calendar-compact .grid-cols-7 > div {
          min-width: 0;
        }
        `}
      </style>
      <div className="main-content">
        {/* List View */}
        {view === 'list' && (
          <>
            {/* Add margin-top to navbar for space */}
            <div className="navbar-space"></div>
            <div className={`header-shadow ${isDarkMode ? 'bg-[#232946]' : 'bg-white'} border-b ${isDarkMode ? 'border-[#232946]' : 'border-gray-200'} rounded-t-xl`}>
              <div className="px-2 sm:px-6 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                    <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>All Time Off</h1>
                    <div className="relative w-full sm:w-auto">
                      <svg className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className={`searchbar-large w-full sm:w-auto pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          isDarkMode
                            ? 'bg-[#181c2f] text-gray-100 border-gray-600 placeholder-gray-400'
                            : 'bg-white text-gray-900 border-gray-300'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="relative">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center space-x-2 text-base px-4 py-2 rounded-lg shadow-sm ${
                          showFilters
                            ? 'bg-purple-100 text-purple-600'
                            : (isDarkMode ? 'text-gray-300 hover:bg-[#181c2f]' : 'text-gray-600 hover:bg-gray-100')
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span className="sidebar-text">Filters</span>
                      </button>
                      {showFilters && (
                        <div className={`absolute right-0 top-full mt-2 w-80 rounded-lg shadow-lg border z-10 ${
                          isDarkMode
                            ? 'bg-[#232946] border-[#232946]'
                            : 'bg-white border-gray-200'
                        }`}>
                          <div className="p-4 space-y-4">
                            <div>
                              <h3 className={`text-base font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Status</h3>
                              <div className="grid grid-cols-2 gap-2">
                                {['All', 'To Approve', 'Refused', 'Approved'].map(s => (
                                  <button
                                    key={s}
                                    onClick={() => setStatus(s)}
                                    className={`text-left px-3 py-2 text-base rounded ${
                                      status === s
                                        ? 'bg-blue-100 text-blue-700 font-semibold'
                                        : (isDarkMode ? 'text-gray-300 hover:bg-[#181c2f]' : 'text-gray-600 hover:bg-gray-50')
                                    }`}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      {[{v: 'list', icon: "M4 6h16M4 10h16M4 14h16M4 18h16"}, {v: 'calendar', icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"}].map(({v, icon}) => (
                        <button key={v} onClick={() => setView(v)} className={`p-2 rounded-lg shadow-sm ${view === v ? 'bg-purple-100 text-purple-600' : (isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600')}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} /></svg>
                          <span className="sidebar-text hidden md:inline">{v === 'list' ? 'List' : 'Calendar'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Table View */}
            <div className="w-full mt-6 overflow-x-auto">
              <table className="custom-table min-w-[900px]">
                <thead>
                  <tr>
                    <th style={{minWidth: 140}}>Employee</th>
                    <th style={{minWidth: 100}}>Mode</th>
                    <th style={{minWidth: 130}}>Time Off Type</th>
                    <th style={{minWidth: 100, maxWidth: 160, width: 120}}>Description</th>
                    <th style={{minWidth: 130}}>Start Date</th>
                    <th style={{minWidth: 130}}>End Date</th>
                    <th style={{minWidth: 100}}>Duration</th>
                    <th style={{minWidth: 180}}>Status & Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => (
                    <tr key={r.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-base font-bold ${avatarColors[r.employee.charCodeAt(0) % avatarColors.length]}`}>{r.avatar}</div>
                          <span className={`text-base font-semibold truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{r.employee}</span>
                        </div>
                      </td>
                      <td className={`text-base truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{r.mode}</td>
                      <td className={`text-base truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{r.type}</td>
                      <td className={`text-base truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} title={r.description} style={{maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{r.description || '-'}</td>
                      <td className={`text-base truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{r.startDate}</td>
                      <td className={`text-base truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{r.endDate}</td>
                      <td className={`text-base truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{r.duration}</td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-base font-semibold ${badges[r.status]}`}>
                            {r.status}
                          </span>
                          {r.status === 'To Approve' && (
                            <>
                              <button
                                onClick={() => handleApprove(r.id)}
                                className="action-button approve-btn"
                                title="Approve Request"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => handleReject(r.id)}
                                className="action-button reject-btn"
                                title="Reject Request"
                              >
                                ✗
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mobile Card View */}
              <div className="mobile-card px-2 py-2 space-y-4">
                {filtered.map(r => (
                  <div key={r.id} className={`rounded-xl shadow-lg border ${isDarkMode ? 'bg-[#232946] border-[#232946]' : 'bg-white border-gray-200'} p-4 flex flex-col`}>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold ${avatarColors[r.employee.charCodeAt(0) % avatarColors.length]}`}>{r.avatar}</div>
                      <span className={`font-semibold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{r.employee}</span>
                      <span className={`ml-auto px-3 py-1 rounded-full text-base font-semibold ${badges[r.status]}`}>{r.status}</span>
                    </div>
                    <div className="text-base mb-1"><span className="font-semibold">Mode:</span> {r.mode}</div>
                    <div className="text-base mb-1"><span className="font-semibold">Type:</span> {r.type}</div>
                    <div className="text-base mb-1"><span className="font-semibold">Description:</span> <span style={{maxWidth: 120, display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{r.description || '-'}</span></div>
                    <div className="text-base mb-1"><span className="font-semibold">Start:</span> {r.startDate}</div>
                    <div className="text-base mb-1"><span className="font-semibold">End:</span> {r.endDate}</div>
                    <div className="text-base mb-2"><span className="font-semibold">Duration:</span> {r.duration}</div>
                    {r.status === 'To Approve' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleApprove(r.id)}
                          className="action-button approve-btn"
                          title="Approve Request"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => handleReject(r.id)}
                          className="action-button reject-btn"
                          title="Reject Request"
                        >
                          ✗
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Calendar View */}
        {view === 'calendar' && (
          <div className="calendar-compact w-full mx-auto p-2 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-3 header-shadow rounded-xl">
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{months[month]} {year}</h2>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button onClick={prevM} className={`p-2 rounded-lg shadow-sm ${isDarkMode ? 'hover:bg-[#181c2f]' : 'hover:bg-gray-100'}`}>
                  <svg className={`w-8 h-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <span className={`font-semibold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{months[month]} {year}</span>
                <button onClick={nextM} className={`p-2 rounded-lg shadow-sm ${isDarkMode ? 'hover:bg-[#181c2f]' : 'hover:bg-gray-100'}`}>
                  <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
                <button
                  onClick={() => setView('list')}
                  className="ml-4 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 font-semibold"
                >
                  Back to List
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-0 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className={`p-2 text-center text-base font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{d}</div>
              ))}
            </div>
            <div className={`grid grid-cols-7 gap-0 border rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'border-[#232946]' : 'border-gray-200'}`}>
              {(() => {
                const days = [], daysInM = getDays(year, month), first = getFirst(year, month);
                for(let i = 0; i < first; i++) days.push(<div key={`e-${i}`} className={`h-20 border ${isDarkMode ? 'border-[#232946]' : 'border-gray-200'} bg-transparent`}></div>);
                for(let d = 1; d <= daysInM; d++) {
                  const timeOffs = getTimeOff(year, month, d);
                  const today = new Date().getDate() === d && new Date().getMonth() === month && new Date().getFullYear() === year;
                  days.push(
                    <div key={d} className={`h-20 border ${isDarkMode ? 'border-[#232946]' : 'border-gray-200'} p-1 rounded-lg ${today ? (isDarkMode ? 'bg-blue-900' : 'bg-blue-50') : (isDarkMode ? 'bg-[#181c2f]' : 'bg-white')} ${isDarkMode ? 'hover:bg-[#232946]' : 'hover:bg-gray-50'} transition`}>
                      <div className={`text-base font-bold mb-1 ${today ? 'text-blue-600' : (isDarkMode ? 'text-gray-100' : 'text-gray-900')}`}>{d}</div>
                      <div className="space-y-1">
                        {timeOffs.slice(0, 2).map((t, i) => (
                          <div key={`${t.id}-${i}`} className={`text-xs px-2 py-1 rounded text-white truncate ${colors[t.status]} font-semibold shadow`} title={`${t.employee} - ${t.type} (${t.status})`}>
                            {t.employee.split(' ')[0]}
                          </div>
                        ))}
                        {timeOffs.length > 2 && <div className={`text-xs px-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+{timeOffs.length - 2} more</div>}
                      </div>
                    </div>
                  );
                }
                return days;
              })()}
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              {Object.entries(colors).map(([s, c]) => (
                <div key={s} className="flex items-center space-x-2">
                  <div className={`w-5 h-4 rounded ${c}`}></div>
                  <span className={`text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
     );
};
export default TimeofHistory;