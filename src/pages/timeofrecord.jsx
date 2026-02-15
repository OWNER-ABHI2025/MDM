import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ScatterChart, Scatter
} from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

// Professional icons for filter buttons
const EmployeeIcon = (props) => (
  <svg {...props} className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" stroke="currentColor" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" />
  </svg>
);
const TypeIcon = (props) => (
  <svg {...props} className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" />
    <path d="M16 3v4M8 3v4" stroke="currentColor" />
  </svg>
);

const Icon = ({ d, ...props }) => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
);

const data = [
  { name: 'Abhijeet Devkar', sickTime: 120, unpaid: 0, vacation: 80, role: 'Employee', department: 'Engineering', isActive: true },
  { name: 'Aditya kadam', sickTime: 110, unpaid: 0, vacation: 120, role: 'Employee', department: 'Engineering', isActive: true },
  { name: 'Maithali Parit', sickTime: 0, unpaid: 180, vacation: 40, role: 'Employee', department: 'HR', isActive: false },
  { name: 'Pooja Maruti Pawar', sickTime: 220, unpaid: 0, vacation: 160, role: 'Senior Developer', department: 'Sales', isActive: true },
  { name: 'Prajkta salunke', sickTime: 160, unpaid: 0, vacation: 100, role: 'Employee', department: 'Marketing', isActive: true },
  { name: 'Shrinath Ghorpade', sickTime: 0, unpaid: 280, vacation: 20, role: 'Employee', department: 'Finance', isActive: false },
  { name: 'Tanmay N', sickTime: 320, unpaid: 0, vacation: 200, role: 'Manager', department: 'Engineering', isActive: true }
];

const charts = [
  { id: 'bar', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Bar Chart' },
  { id: 'line', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', label: 'Line Chart' },
  { id: 'area', icon: 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4', label: 'Area Chart' },
  { id: 'pie', icon: 'M12 2a10 10 0 1 0 10 10h-10z M12 12l7.07 7.07A10 10 0 0 1 12 22z', label: 'Pie Chart' },
  { id: 'stacked', icon: 'M3 10h18M3 14h18m-9-4v8m-7 0V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1z', label: 'Stacked Bar' }
];

const measures = [
  { id: 'sickTime', label: 'Sick Time Off', color: '#2563eb' },
  { id: 'unpaid', label: 'Unpaid Leave', color: '#f97316' },
  { id: 'vacation', label: 'Vacation Days', color: '#10b981' }
];

const getLabel = (f, k) => ({
  activeEmployee: { all: 'All Employees', active: 'Active Employee', inactive: 'Inactive Employee' },
  employeeType: { all: 'All Types', employee: 'Employee', manager: 'Manager', senior: 'Senior Developer' }
})[k][f];

const Dropdown = ({ type, options, current, onSelect, show, toggle, setFilter, isDarkMode }) => (
  <div className="relative">
    <button
      onClick={() => toggle(type)}
      className="text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 shadow-sm"
      style={{ backgroundColor: '#1C6BA0' }}
      onMouseEnter={e => e.target.style.backgroundColor = '#145a86'}
      onMouseLeave={e => e.target.style.backgroundColor = '#1C6BA0'}
    >
      {type === 'activeEmployee' ? <EmployeeIcon /> : <TypeIcon />}
      <span>{getLabel(current, type)}</span>
      {current !== 'all' && (
        <button
          onClick={e => { e.stopPropagation(); setFilter(type, 'all'); }}
          className="ml-1 text-lg leading-none"
          style={{ color: '#a7d0e8' }}
          onMouseEnter={e => e.target.style.color = 'white'}
          onMouseLeave={e => e.target.style.color = '#a7d0e8'}
        >×</button>
      )}
      <Icon d="M19 9l-7 7-7-7" />
    </button>
    {show && (
      <div className={`absolute top-full left-0 mt-2 w-56 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} shadow-xl z-50 overflow-hidden`}>
        <div className="py-2">
          <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-100 bg-gray-50'}`}>
            <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{type === 'activeEmployee' ? 'Employee Status' : 'Employee Type'}</div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Select filter option</div>
          </div>
          {options.map(([value, label]) => (
            <button
              key={value}
              onClick={() => onSelect(value)}
              className={`w-full text-left px-4 py-3 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} flex items-center justify-between transition-colors`}
              style={{
                backgroundColor: current === value ? (isDarkMode ? '#1e3a5f' : '#e6f3ff') : 'transparent',
                color: current === value ? '#1C6BA0' : (isDarkMode ? '#d1d5db' : '#374151'),
                borderRight: current === value ? '2px solid #1C6BA0' : 'none'
              }}
            >
              <span className="font-medium">{label}</span>
              {current === value && <span style={{ color: '#1C6BA0', fontWeight: 'bold' }}>✓</span>}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);

const CustomTooltip = ({ active, payload, isDarkMode }) => active && payload?.length ? (
  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} rounded-lg shadow-lg`}>
    <p className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{payload[0].payload.fullName}</p>
    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
      <p>{payload[0].payload.role} - {payload[0].payload.department}</p>
      <p className={payload[0].payload.isActive ? 'text-green-600' : 'text-red-600'}>{payload[0].payload.isActive ? 'Active' : 'Inactive'}</p>
    </div>
    <div className="mt-2 space-y-1">{payload.map((entry, i) => <p key={i} style={{ color: entry.color }} className="text-sm">{entry.name}: {entry.value} hours</p>)}</div>
  </div>
) : null;

const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

const TimeofRecord = () => {
  const { isDarkMode } = useTheme();
  const [search, setSearch] = useState('');
  const [dropdowns, setDropdowns] = useState({});
  const [filters, setFilters] = useState({ activeEmployee: 'all', employeeType: 'all' });
  const [chartType, setChartType] = useState('bar');
  const [showMeasures, setShowMeasures] = useState(false);
  const [selectedMeasures, setSelectedMeasures] = useState(['sickTime', 'unpaid']);
  const [width] = useWindowSize();

  const filtered = useMemo(() => data.filter(emp => {
    const searchMatch = !search || [emp.name, emp.department, emp.role].some(f => f.toLowerCase().includes(search.toLowerCase().trim()));
    const activeMatch = filters.activeEmployee === 'all' || (filters.activeEmployee === 'active' && emp.isActive) || (filters.activeEmployee === 'inactive' && !emp.isActive);
    const typeMatch = filters.employeeType === 'all' || (filters.employeeType === 'employee' && emp.role === 'Employee') || (filters.employeeType === 'manager' && emp.role === 'Manager') || (filters.employeeType === 'senior' && emp.role === 'Senior Developer');
    return searchMatch && activeMatch && typeMatch;
  }), [search, filters]);

  const chartData = filtered.map(emp => ({
    name: emp.name.split(' ')[0],
    fullName: emp.name,
    sickTime: emp.sickTime,
    unpaid: emp.unpaid,
    vacation: emp.vacation,
    total: emp.sickTime + emp.unpaid + emp.vacation,
    role: emp.role,
    department: emp.department,
    isActive: emp.isActive
  }));
  const pieData = measures.map(m => ({
    name: m.label,
    value: filtered.reduce((sum, emp) => sum + emp[m.id], 0),
    color: m.color
  })).filter(item => item.value > 0);
  const hasFilters = search || filters.activeEmployee !== 'all' || filters.employeeType !== 'all';
  const toggle = k => setDropdowns(p => ({ ...p, [k]: !p[k] }));
  const setFilter = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setDropdowns(p => ({ ...p, [k]: false })); };
  const clear = () => { setSearch(''); setFilters({ activeEmployee: 'all', employeeType: 'all' }); };

  // Responsive chart height and pie size
  const getChartHeight = () => {
    if (width < 640) return 260;
    if (width < 1024) return 340;
    return 520;
  };
  const getPieWidth = () => (width < 640 ? 220 : width < 1024 ? 320 : 700);
  const getPieRadius = () => (width < 640 ? 70 : width < 1024 ? 110 : 180);

  const renderChart = () => {
    const props = { data: chartData, margin: { top: 20, right: 30, left: 20, bottom: 60 } };
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';
    const textColor = isDarkMode ? '#d1d5db' : '#374151';
    const common = (
      <>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: textColor }} angle={-45} textAnchor="end" height={80} />
        <YAxis tick={{ fontSize: 12, fill: textColor }} />
        <Tooltip content={props => <CustomTooltip {...props} isDarkMode={isDarkMode} />} />
        <Legend />
      </>
    );
    const bars = [
      selectedMeasures.includes('sickTime') && <Bar key="sick" dataKey="sickTime" stackId={chartType === 'stacked' ? 'a' : undefined} fill="#2563eb" name="Sick Time Off" />,
      selectedMeasures.includes('unpaid') && <Bar key="unpaid" dataKey="unpaid" stackId={chartType === 'stacked' ? 'a' : undefined} fill="#f97316" name="Unpaid Leave" />,
      selectedMeasures.includes('vacation') && <Bar key="vacation" dataKey="vacation" stackId={chartType === 'stacked' ? 'a' : undefined} fill="#10b981" name="Vacation Days" />
    ];
    const lines = [
      selectedMeasures.includes('sickTime') && <Line key="sick" type="monotone" dataKey="sickTime" stroke="#2563eb" strokeWidth={2} name="Sick Time Off" />,
      selectedMeasures.includes('unpaid') && <Line key="unpaid" type="monotone" dataKey="unpaid" stroke="#f97316" strokeWidth={2} name="Unpaid Leave" />,
      selectedMeasures.includes('vacation') && <Line key="vacation" type="monotone" dataKey="vacation" stroke="#10b981" strokeWidth={2} name="Vacation Days" />
    ];
    const areas = [
      selectedMeasures.includes('sickTime') && <Area key="sick" type="monotone" dataKey="sickTime" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} name="Sick Time Off" />,
      selectedMeasures.includes('unpaid') && <Area key="unpaid" type="monotone" dataKey="unpaid" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.6} name="Unpaid Leave" />,
      selectedMeasures.includes('vacation') && <Area key="vacation" type="monotone" dataKey="vacation" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Vacation Days" />
    ];

    switch (chartType) {
      case 'bar':
      case 'stacked':
        return <BarChart {...props}>{common}{bars}</BarChart>;
      case 'line':
        return <LineChart {...props}>{common}{lines}</LineChart>;
      case 'area':
        return <AreaChart {...props}>{common}{areas}</AreaChart>;
      case 'pie':
        return (
          <PieChart width={getPieWidth()} height={getChartHeight()}>
            <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={getPieRadius()} fill="#8884d8" dataKey="value">
              {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip content={props => <CustomTooltip {...props} isDarkMode={isDarkMode} />} />
            <Legend />
          </PieChart>
        );
     
    }
  };

  // Responsive styles using Tailwind and custom media queries
  return (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col`}>
      <style>{`
        @media (max-width: 640px) {
          .responsive-header { flex-direction: column !important; gap: 0.5rem !important; }
          .responsive-search { width: 100% !important; margin-left: 0 !important; }
          .responsive-filters { flex-direction: column !important; gap: 0.5rem !important; }
          .responsive-chart { padding: 0.5rem !important; }
        }
        @media (max-width: 1024px) and (min-width: 641px) {
          .responsive-header { flex-direction: column !important; gap: 1rem !important; }
          .responsive-search { width: 100% !important; margin-left: 0 !important; }
          .responsive-filters { flex-direction: row !important; gap: 1rem !important; }
          .responsive-chart { padding: 1rem !important; }
        }
      `}</style>
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b flex-shrink-0 shadow-sm`}>
        <div className="flex responsive-header md:flex-row md:items-center md:justify-between px-2 md:px-6 py-4 gap-2 md:gap-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full">
            <div className="flex items-center mb-2 sm:mb-0">
              <button className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}>
                <Icon d="M15 19l-7-7 7-7" className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
              </button>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} ml-2`}>Time Off Record</h1>
            </div>
            <div className="flex responsive-filters flex-col sm:flex-row sm:items-center w-full sm:w-auto sm:ml-4 mt-2 sm:mt-0">
              <div className="relative responsive-search w-full sm:w-80 md:w-96">
                <input
                  type="text"
                  placeholder="Search employees, roles, departments..."
                  className={`pl-10 pr-10 py-2.5 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'} rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm font-medium`}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <div className={`absolute left-3 top-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </div>
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className={`absolute right-3 top-2.5 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} p-1 rounded`}
                  >
                    <Icon d="M6 18L18 6M6 6l12 12" />
                  </button>
                )}
              </div>
              <div className="flex flex-row items-center space-x-2 mt-2 sm:mt-0 sm:ml-4">
                <Dropdown
                  type="activeEmployee"
                  options={[
                    ['all', 'All Employees'],
                    ['active', 'Active Only'],
                    ['inactive', 'Inactive Only']
                  ]}
                  current={filters.activeEmployee}
                  onSelect={v => setFilter('activeEmployee', v)}
                  show={dropdowns.activeEmployee}
                  toggle={toggle}
                  setFilter={setFilter}
                  isDarkMode={isDarkMode}
                />
                <Dropdown
                  type="employeeType"
                  options={[
                    ['all', 'All Types'],
                    ['employee', 'Employee'],
                    ['manager', 'Manager'],
                    ['senior', 'Senior Developer']
                  ]}
                  current={filters.employeeType}
                  onSelect={v => setFilter('employeeType', v)}
                  show={dropdowns.employeeType}
                  toggle={toggle}
                  setFilter={setFilter}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasFilters && (
        <div className={`${isDarkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'} border-b px-2 md:px-6 py-3 flex-shrink-0`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center space-x-2">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>Showing {filtered.length} of {data.length} employees</span>
              {search && <span className={`${isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-700'} px-3 py-1 rounded-full text-xs font-medium mt-1 md:mt-0`}>Search: "{search}"</span>}
              {filters.activeEmployee !== 'all' && <span className={`${isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-700'} px-3 py-1 rounded-full text-xs font-medium mt-1 md:mt-0`}>Status: {getLabel(filters.activeEmployee, 'activeEmployee')}</span>}
              {filters.employeeType !== 'all' && <span className="px-3 py-1 rounded-full text-xs font-medium mt-1 md:mt-0" style={{ backgroundColor: isDarkMode ? '#1e3a5f' : '#e6f3ff', color: '#1C6BA0' }}>Type: {getLabel(filters.employeeType, 'employeeType')}</span>}
            </div>
            <button onClick={clear} className={`${isDarkMode ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'} text-sm font-medium hover:underline transition-colors mt-2 md:mt-0`}>Clear all filters</button>
          </div>
        </div>
      )}

      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b flex-shrink-0`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-2 md:px-6 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowMeasures(!showMeasures)}
                className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                style={{ backgroundColor: '#1C6BA0' }}
                onMouseEnter={e => e.target.style.backgroundColor = '#145a86'}
                onMouseLeave={e => e.target.style.backgroundColor = '#1C6BA0'}
              >
                <span>MEASURES</span><span style={{ color: '#a7d0e8' }}>▼</span>
              </button>
              {showMeasures && (
                <div className={`absolute top-full left-0 mt-2 w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} shadow-xl z-50`}>
                  <div className="p-4">
                    <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-3`}>Select Measures</h3>
                    {measures.map(m => (
                      <label key={m.id} className={`flex items-center space-x-3 py-2 cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded px-2`}>
                        <input type="checkbox" checked={selectedMeasures.includes(m.id)} onChange={e => setSelectedMeasures(e.target.checked ? [...selectedMeasures, m.id] : selectedMeasures.filter(x => x !== m.id))} className="rounded" />
                        <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: m.color }}></div>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{m.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {charts.map(c => (
                <button
                  key={c.id}
                  onClick={() => setChartType(c.id)}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: chartType === c.id ? '#1C6BA0' : 'transparent',
                    color: chartType === c.id ? 'white' : (isDarkMode ? '#9ca3af' : '#6b7280')
                  }}
                  onMouseEnter={e => { if (chartType !== c.id) e.target.style.backgroundColor = isDarkMode ? '#374151' : '#f3f4f6'; }}
                  onMouseLeave={e => { if (chartType !== c.id) e.target.style.backgroundColor = 'transparent'; }}
                  title={c.label}
                >
                  <Icon d={c.icon} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex-1 flex flex-col overflow-hidden`}>
        <div className={`responsive-chart ${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-2 md:px-8 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} flex-shrink-0`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className="font-medium">Showing {filtered.length} of {data.length} employees</span>
              {search && <span className="ml-2 text-blue-600">matching "{search}"</span>}
            </div>
            <div className="flex flex-wrap items-center space-x-4 mt-2 md:mt-0">
              {measures.filter(m => selectedMeasures.includes(m.id)).map(m => (
                <div key={m.id} className="flex items-center space-x-2">
                  <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: m.color }}></div>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className={`w-20 h-20 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'} mx-auto mb-4`} strokeWidth={1} />
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-2`}>No employees found</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>{search ? `No results for "${search}". ` : ''}Try adjusting your search terms or filters.</p>
              <button onClick={clear} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">Clear all filters</button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div style={{ width: '100%', height: getChartHeight() }}>
              <ResponsiveContainer width="100%" height="100%"> 
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      <div className={`${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'} border-t px-2 md:px-6 py-2 flex-shrink-0`}>
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="flex flex-wrap items-center space-x-2">
            <span>Chart Type: {charts.find(c => c.id === chartType)?.label}</span>
            <span>•</span>
            <span>Data Points: {filtered.length}</span>
            <span>•</span>
            <span>Measures: {selectedMeasures.length}</span>
          </div>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <span>Last Updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeofRecord;