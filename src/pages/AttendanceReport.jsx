import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Filter, Users, Calendar, TrendingUp, Clock, BarChart3, Download, Activity, PieChart as PieChartIcon, GitCompare, XCircle } from 'lucide-react'; // Added XCircle for modal close
import { useTheme } from '../contexts/ThemeContext';

const AttendanceReport = () => {
  const { isDarkMode } = useTheme();

  const [selectedMonth, setSelectedMonth] = useState('April 2025');
  const [selectedView, setSelectedView] = useState('daily');
  const [selectedMeasure, setSelectedMeasure] = useState('bar');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');


  const [employee1ToCompare, setEmployee1ToCompare] = useState('');
  const [employee2ToCompare, setEmployee2ToCompare] = useState('');
  const [showComparisonChart, setShowComparisonChart] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false); 


  const [modalSearchTerm1, setModalSearchTerm1] = useState('');
  const [modalSearchTerm2, setModalSearchTerm2] = useState('');


  const attendanceData = [
    { date: '01 Apr 2025', 'Abhijeet Devkar': 8.5, 'Aditya kadam': 7.2, 'Archana Vishnu Ghongle': 6.8, 'Arun Prakash': 9.1, 'Kapil patil': 8.0, 'Mayuri Fale': 7.5, 'Pratikta saumne': 6.2, 'Priti Marie': 8.3, 'Rohit': 7.8, 'Rutuja kamble': 9.0, 'Sahil Khot': 8.1, 'shubham patil': 6.5, 'siddhartha_patil': 7.3, 'vaishnavi Dhanawade': 8.4 },
    { date: '02 Apr 2025', 'Abhijeet Devkar': 7.8, 'Aditya kadam': 8.2, 'Archana Vishnu Ghongle': 9.1, 'Arun Prakash': 7.5, 'Kapil patil': 8.8, 'Mayuri Fale': 6.9, 'Pratikta saumne': 8.1, 'Priti Marie': 7.2, 'Rohit': 9.0, 'Rutuja kamble': 6.7, 'Sahil Khot': 7.6, 'shubham patil': 8.3, 'siddhartha_patil': 9.2, 'vaishnavi Dhanawade': 7.1 },
    { date: '03 Apr 2025', 'Abhijeet Devkar': 9.2, 'Aditya kadam': 6.8, 'Archana Vishnu Ghongle': 8.5, 'Arun Prakash': 7.9, 'Kapil patil': 9.1, 'Mayuri Fale': 8.2, 'Pratikta saumne': 7.4, 'Priti Marie': 6.6, 'Rohit': 8.7, 'Rutuja kamble': 7.3, 'Sahil Khot': 9.0, 'shubham patil': 7.8, 'siddhartha_patil': 8.1, 'vaishnavi Dhanawade': 6.9 },
    { date: '04 Apr 2025', 'Abhijeet Devkar': 6.5, 'Aditya kadam': 9.3, 'Archana Vishnu Ghongle': 7.7, 'Arun Prakash': 8.4, 'Kapil patil': 6.2, 'Mayuri Fale': 9.1, 'Pratikta saumne': 8.6, 'Priti Marie': 7.8, 'Rohit': 6.9, 'Rutuja kamble': 8.2, 'Sahil Khot': 6.4, 'shubham patil': 9.0, 'siddhartha_patil': 7.5, 'vaishnavi Dhanawade': 8.3 },
    { date: '05 Apr 2025', 'Abhijeet Devkar': 8.1, 'Aditya kadam': 7.6, 'Archana Vishnu Ghongle': 6.3, 'Arun Prakash': 9.2, 'Kapil patil': 8.7, 'Mayuri Fale': 7.9, 'Pratikta saumne': 9.1, 'Priti Marie': 8.5, 'Rohit': 7.2, 'Rutuja kamble': 6.8, 'Sahil Khot': 8.4, 'shubham patil': 7.7, 'siddhartha_patil': 6.1, 'vaishnavi Dhanawade': 9.0 },
    { date: '06 Apr 2025', 'Abhijeet Devkar': 7.3, 'Aditya kadam': 8.8, 'Archana Vishnu Ghongle': 9.0, 'Arun Prakash': 6.7, 'Kapil patil': 7.4, 'Mayuri Fale': 8.1, 'Pratikta saumne': 6.5, 'Priti Marie': 9.3, 'Rohit': 8.6, 'Rutuja kamble': 7.8, 'Sahil Khot': 9.1, 'shubham patil': 6.2, 'siddhartha_patil': 8.4, 'vaishnavi Dhanawade': 7.9 },
    { date: '07 Apr 2025', 'Abhijeet Devkar': 9.1, 'Aditya kadam': 6.4, 'Archana Vishnu Ghongle': 8.2, 'Arun Prakash': 7.6, 'Kapil patil': 9.0, 'Mayuri Fale': 6.8, 'Pratikta saumne': 7.1, 'Priti Marie': 8.7, 'Rohit': 9.2, 'Rutuja kamble': 8.3, 'Sahil Khot': 7.5, 'shubham patil': 8.9, 'siddhartha_patil': 9.1, 'vaishnavi Dhanawade': 6.3 }
  ];


  const employeeColors = {
    'Abhijeet Devkar': '#3b82f6',
    'Aditya kadam': '#f59e0b',
    'Archana Vishnu Ghongle': '#10b981',
    'Arun Prakash': '#ef4444',
    'Kapil patil': '#8b5cf6',
    'Mayuri Fale': '#f97316',
    'Pratikta saumne': '#ec4899',
    'Priti Marie': '#6b7280',
    'Rohit': '#84cc16',
    'Rutuja kamble': '#06b6d4',
    'Sahil Khot': '#6366f1',
    'shubham patil': '#f472b6',
    'siddhartha_patil': '#22c55e',
    'vaishnavi Dhanawade': '#fb7185'
  };

  const employees = Object.keys(employeeColors);


  const aggregateData = (data, groupBy, allEmployees) => {
    const aggregated = {};

    data.forEach(row => {
      let key;
      if (groupBy === 'week') {
        const dateParts = row.date.match(/(\d{2}) (\w{3}) (\d{4})/);
        const date = new Date(`${dateParts[2]} ${dateParts[1]}, ${dateParts[3]}`);
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const diff = date.getTime() - startOfYear.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        const weekNumber = Math.ceil(dayOfYear / 7);
        key = `Week ${weekNumber} ${date.getFullYear()}`;
      } else if (groupBy === 'month') {
        const dateParts = row.date.match(/(\d{2}) (\w{3}) (\d{4})/);
        const date = new Date(`${dateParts[2]} ${dateParts[1]}, ${dateParts[3]}`);
        key = `${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
      } else {
        key = row.date;
      }

      if (!aggregated[key]) {
        aggregated[key] = { [groupBy]: key };
        allEmployees.forEach(emp => {
          aggregated[key][emp] = 0;
        });
      }

      allEmployees.forEach(emp => {
        aggregated[key][emp] += (row[emp] || 0);
      });
    });

    return Object.values(aggregated);
  };

  const processedAttendanceData = useMemo(() => {
    let data = attendanceData;

    if (selectedView === 'daily' && filterDate) {
      data = data.filter(row => row.date === filterDate);
    }

    if (selectedView === 'weekly') {
      return aggregateData(data, 'week', employees);
    } else if (selectedView === 'monthly') {
      return aggregateData(data, 'month', employees);
    }
    return data;
  }, [attendanceData, selectedView, filterDate, employees]);

  const filteredEmployeesForTeamMembers = employees.filter((emp) => {
    return emp.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const compareEmployeesData = useMemo(() => {
    if (employee1ToCompare && employee2ToCompare) {
      const xAxisKey = selectedView === 'daily' ? 'date' : selectedView;
      return processedAttendanceData.map(day => {
        const newDay = { [xAxisKey]: day[xAxisKey] };
        if (day[employee1ToCompare] !== undefined) {
          newDay[employee1ToCompare] = day[employee1ToCompare];
        }
        if (day[employee2ToCompare] !== undefined) {
          newDay[employee2ToCompare] = day[employee2ToCompare];
        }
        return newDay;
      });
    }
    return [];
  }, [employee1ToCompare, employee2ToCompare, processedAttendanceData, selectedView]);

  const comparePieChartData = useMemo(() => {
    if (employee1ToCompare && employee2ToCompare) {
      const totalHoursEmp1 = processedAttendanceData.reduce((sum, day) => sum + (day[employee1ToCompare] || 0), 0);
      const totalHoursEmp2 = processedAttendanceData.reduce((sum, day) => sum + (day[employee2ToCompare] || 0), 0);
      return [
        { name: employee1ToCompare.split(' ')[0], value: Number(totalHoursEmp1.toFixed(1)), fullName: employee1ToCompare, color: employeeColors[employee1ToCompare] },
        { name: employee2ToCompare.split(' ')[0], value: Number(totalHoursEmp2.toFixed(1)), fullName: employee2ToCompare, color: employeeColors[employee2ToCompare] },
      ];
    }
    return [];
  }, [employee1ToCompare, employee2ToCompare, processedAttendanceData, employeeColors]);

  const totalHours = attendanceData.reduce((sum, day) => {
    return sum + employees.reduce((daySum, emp) => daySum + (day[emp] || 0), 0);
  }, 0);

  const avgHoursPerDay = totalHours / (attendanceData.length * employees.length);

  const pieChartData = filteredEmployeesForTeamMembers.map((employee) => {
    const totalEmployeeHours = processedAttendanceData.reduce((sum, day) => {
      return sum + (day[employee] || 0);
    }, 0);
    return {
      name: employee.split(' ')[0],
      value: Number(totalEmployeeHours.toFixed(1)),
      fullName: employee,
      color: employeeColors[employee]
    };
  }).sort((a, b) => b.value - a.value);

  const commonTooltipContentStyle = {
    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    color: isDarkMode ? '#f1f5f9' : '#0f172a',
    border: isDarkMode ? '1px solid #38bdf8' : '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(8px)',
  };

  const commonTooltipLabelStyle = {
    color: isDarkMode ? '#a78bfa' : '#475569',
    fontWeight: 'bold',
  };

  const renderChart = () => {
    const xAxisKey = selectedView === 'daily' ? 'date' : selectedView;

    if (showComparisonChart && employee1ToCompare && employee2ToCompare) {
      switch (selectedMeasure) {
        case 'line':
          return (
            <ResponsiveContainer width="100%" height="85%">
              <LineChart
                data={compareEmployeesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDarkMode ? "#334155" : "#e2e8f0"} 
                  strokeOpacity={0.5}
                />
                <XAxis 
                  dataKey={xAxisKey} 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={12}
                  stroke={isDarkMode ? "#94a3b8" : "#64748b"}
                  tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
                />
                <YAxis 
                  fontSize={12}
                  stroke={isDarkMode ? "#94a3b8" : "#64748b"}
                  tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
                  domain={[0, 10]}
                />
                <Tooltip 
                  contentStyle={commonTooltipContentStyle}
                  labelStyle={commonTooltipLabelStyle}
                  formatter={(value, name, props) => [
                    <span style={{ color: employeeColors[name], fontWeight: 'bold' }}>
                      {value} hours
                    </span>,
                    name
                  ]}
                />
                <Legend 
                  formatter={(value, entry) => (
                    <span style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}>
                      {value}
                    </span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey={employee1ToCompare}
                  stroke={employeeColors[employee1ToCompare]}
                  strokeWidth={2}
                  dot={{ fill: employeeColors[employee1ToCompare], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: employeeColors[employee1ToCompare], strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey={employee2ToCompare}
                  stroke={employeeColors[employee2ToCompare]}
                  strokeWidth={2}
                  dot={{ fill: employeeColors[employee2ToCompare], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: employeeColors[employee2ToCompare], strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          );
        case 'pie':
          return (
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={comparePieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  innerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {comparePieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={commonTooltipContentStyle}
                  labelStyle={commonTooltipLabelStyle}
                  formatter={(value, name, props) => [
                    <span style={{ color: props.payload.color || (isDarkMode ? '#f1f5f9' : '#0f172a'), fontWeight: 'bold' }}>
                      {value} hours
                    </span>,
                    props.payload.fullName
                  ]}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <span style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}>
                      {entry.payload.fullName}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          );
        default:
          return (
            <ResponsiveContainer width="100%" height="85%">
              <BarChart
                data={compareEmployeesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDarkMode ? "#334155" : "#e2e8f0"} 
                  strokeOpacity={0.5}
                />
                <XAxis 
                  dataKey={xAxisKey} 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={12}
                  stroke={isDarkMode ? "#94a3b8" : "#64748b"}
                  tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
                />
                <YAxis 
                  fontSize={12}
                  stroke={isDarkMode ? "#94a3b8" : "#64748b"}
                  tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
                  domain={[0, 10]}
                />
                <Tooltip 
                  contentStyle={commonTooltipContentStyle}
                  labelStyle={commonTooltipLabelStyle}
                  formatter={(value, name, props) => [
                    <span style={{ color: employeeColors[name], fontWeight: 'bold' }}>
                      {value} hours
                    </span>,
                    name
                  ]}
                />
                <Legend 
                  formatter={(value, entry) => (
                    <span style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}>
                      {value}
                    </span>
                  )}
                />
                <Bar dataKey={employee1ToCompare} fill={employeeColors[employee1ToCompare]} radius={[2, 2, 0, 0]} />
                <Bar dataKey={employee2ToCompare} fill={employeeColors[employee2ToCompare]} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          );
      }
    }

    switch (selectedMeasure) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="85%">
            <LineChart
              data={processedAttendanceData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDarkMode ? "#334155" : "#e2e8f0"} 
                strokeOpacity={0.5}
              />
              <XAxis 
                dataKey={xAxisKey} 
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
                stroke={isDarkMode ? "#94a3b8" : "#64748b"}
                tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
              />
              <YAxis 
                fontSize={12}
                stroke={isDarkMode ? "#94a3b8" : "#64748b"}
                tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
                domain={[0, 10]}
              />
              <Tooltip 
                contentStyle={commonTooltipContentStyle}
                labelStyle={commonTooltipLabelStyle}
                formatter={(value, name, props) => [
                  <span style={{ color: employeeColors[name], fontWeight: 'bold' }}>
                    {value} hours
                  </span>,
                  name
                ]}
              />
              {filteredEmployeesForTeamMembers.map((employee) => (
                <Line
                  key={employee}
                  type="monotone"
                  dataKey={employee}
                  stroke={employeeColors[employee]}
                  strokeWidth={2}
                  dot={{ fill: employeeColors[employee], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: employeeColors[employee], strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={commonTooltipContentStyle}
                labelStyle={commonTooltipLabelStyle}
                formatter={(value, name, props) => [
                  <span style={{ color: props.payload.color || (isDarkMode ? '#f1f5f9' : '#0f172a'), fontWeight: 'bold' }}>
                    {value} hours
                  </span>,
                  props.payload.fullName
                ]}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}>
                    {entry.payload.fullName}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return (
          <ResponsiveContainer width="100%" height="85%">
            <BarChart
              data={processedAttendanceData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDarkMode ? "#334155" : "#e2e8f0"} 
                strokeOpacity={0.5}
              />
              <XAxis 
                  dataKey={xAxisKey}
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
                stroke={isDarkMode ? "#94a3b8" : "#64748b"}
                tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
              />
              <YAxis 
                fontSize={12}
                stroke={isDarkMode ? "#94a3b8" : "#64748b"}
                tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
                domain={[0, 10]}
              />
              <Tooltip 
                contentStyle={commonTooltipContentStyle}
                labelStyle={commonTooltipLabelStyle}
                formatter={(value, name, props) => [
                  <span style={{ color: employeeColors[name], fontWeight: 'bold' }}>
                    {value} hours
                  </span>,
                  name
                ]}
              />
              {filteredEmployeesForTeamMembers.map((employee) => (
                <Bar
                  key={employee}
                  dataKey={employee}
                  fill={employeeColors[employee]}
                  radius={[2, 2, 0, 0]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  const getChartTitle = () => {
    if (showComparisonChart && employee1ToCompare && employee2ToCompare) {
      return `Comparison: ${employee1ToCompare.split(' ')[0]} vs ${employee2ToCompare.split(' ')[0]}`;
    }
    switch (selectedMeasure) {
      case 'line':
        return 'Daily Attendance Trends';
      case 'pie':
        return 'Total Hours Distribution';
      default:
        return 'Daily Attendance Overview';
    }
  };

  const getChartIcon = () => {
    if (showComparisonChart && employee1ToCompare && employee2ToCompare) {
      return <GitCompare className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />;
    }
    switch (selectedMeasure) {
      case 'line':
        return <Activity className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />;
      case 'pie':
        return <PieChartIcon className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />;
      default:
        return <BarChart3 className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />;
    }
  };

  const currentChartDataForExport = showComparisonChart && employee1ToCompare && employee2ToCompare
    ? (selectedMeasure === 'pie' ? comparePieChartData : compareEmployeesData)
    : processedAttendanceData;

  const currentChartEmployeesForExport = showComparisonChart && employee1ToCompare && employee2ToCompare
    ? [employee1ToCompare, employee2ToCompare]
    : employees;

  const exportData = () => {
    const exportRows = currentChartDataForExport.map(row => {
      if (showComparisonChart && selectedMeasure === 'pie') {
        return {
          'Employee Name': row.fullName,
          'Total Hours': row.value
        };
      } else {
        const processedRow = {};
        const xAxisKey = selectedView === 'daily' ? 'date' : selectedView;
        processedRow[xAxisKey.charAt(0).toUpperCase() + xAxisKey.slice(1)] = row[xAxisKey];
        currentChartEmployeesForExport.forEach(employee => {
          processedRow[employee] = row[employee] || 0;
        });
        return processedRow;
      }
    });

    const summaryData = {
      'Report Generated': new Date().toLocaleString(),
      'Total Employees': employees.length,
      'Days Tracked': attendanceData.length,
      'Average Hours per Day': avgHoursPerDay.toFixed(2),
      'Total Hours': Math.round(totalHours),
      'Selected Period': selectedMonth,
      'Chart Type': showComparisonChart ? `Employee Comparison (${selectedMeasure.charAt(0).toUpperCase() + selectedMeasure.slice(1)} Chart)` : (selectedMeasure.charAt(0).toUpperCase() + selectedMeasure.slice(1))
    };

    const csvContent = [
      'ATTENDANCE REPORT SUMMARY',
      '',
      ...Object.entries(summaryData).map(([key, value]) => `${key},${value}`),
      '',
      'DETAILED ATTENDANCE DATA',
      '',
      showComparisonChart && selectedMeasure === 'pie'
        ? ['Employee Name', 'Total Hours'].join(',')
        : Object.keys(exportRows[0]).join(','),
      ...exportRows.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_report_${selectedMonth.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEmployees1 = useMemo(() => {
    return employees.filter(emp => 
      emp.toLowerCase().includes(modalSearchTerm1.toLowerCase()) && emp !== employee2ToCompare
    );
  }, [employees, modalSearchTerm1, employee2ToCompare]);

  const filteredEmployees2 = useMemo(() => {
    return employees.filter(emp => 
      emp.toLowerCase().includes(modalSearchTerm2.toLowerCase()) && emp !== employee1ToCompare
    );
  }, [employees, modalSearchTerm2, employee1ToCompare]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-gray-100'
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
    }`}>
      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
        `}
      </style>
      <div className="w-full max-w-full px-2 sm:px-4 md:px-8 xl:px-16 mx-auto">
        {/* Header */}
        <div className="mb-4 pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-end gap-2 sm:gap-4 flex-wrap">
            <button 
              onClick={exportData}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 text-base font-semibold shadow ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
              }`}
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => {
                setShowComparisonModal(true);
                setModalSearchTerm1('');
                setModalSearchTerm2('');
                setEmployee1ToCompare('');
                setEmployee2ToCompare('');
              }}
              className={`px-6 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 text-base font-semibold shadow ${
                isDarkMode 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              Compare
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6 items-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setShowComparisonChart(false);
            }}
            className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 w-full sm:w-64 text-sm ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500'
                : 'bg-white border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          <input
            type="date"
            value={filterDate ? new Date(filterDate).toISOString().split('T')[0] : ''}
            onChange={e => {
              const dateParts = e.target.value.split('-');
              if (dateParts.length === 3) {
                const [year, month, day] = dateParts;
                const dateObj = new Date(year, month - 1, day);
                const options = { day: '2-digit', month: 'short', year: 'numeric' };
                const formattedDate = dateObj.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
                setFilterDate(formattedDate);
              } else {
                setFilterDate('');
              }
              setShowComparisonChart(false);
            }}
            className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 w-full sm:w-auto text-sm ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500'
                : 'bg-white border-gray-200 text-gray-900 focus:ring-purple-500 focus:border-purple-500'
            }`}
          />
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterDate('');
              setEmployee1ToCompare('');
              setEmployee2ToCompare('');
              setShowComparisonChart(false);
              setSelectedView('daily');
              setSelectedMeasure('bar');
            }}
            className={`px-4 py-2 rounded-xl transition-all duration-300 w-full sm:w-auto text-sm font-medium ${
              isDarkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-gray-100'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            Reset Filters
          </button>
          <div className="flex flex-col sm:flex-row flex-grow justify-end items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <BarChart3 className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <select 
                value={selectedView}
                onChange={(e) => {
                  setSelectedView(e.target.value);
                  setShowComparisonChart(false);
                }}
                className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-gray-100 focus:ring-green-500 focus:border-green-500'
                    : 'bg-white border-gray-200 text-gray-900 focus:ring-green-500 focus:border-green-500'
                }`}
              >
                <option value="daily">Daily View</option>
                <option value="weekly">Weekly View</option>
                <option value="monthly">Monthly View</option>
              </select>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              {getChartIcon()}
              <select 
                value={selectedMeasure}
                onChange={(e) => {
                  setSelectedMeasure(e.target.value);
                }}
                className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500'
                    : 'bg-white border-gray-200 text-gray-900 focus:ring-purple-500 focus:border-purple-500'
                }`}
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
              </select>
            </div>
          </div>
        </div>

        {/* Comparison Modal */}
        {showComparisonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-2 sm:p-4 md:p-6 animate-fade-in">
            <div className={`p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg relative transform transition-all duration-300 scale-95 opacity-0 animate-scale-in ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-gray-100 border border-slate-700' 
                : 'bg-gradient-to-br from-white to-gray-50 text-gray-900 border border-gray-200'
            }`}>
              <button
                onClick={() => setShowComparisonModal(false)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  isDarkMode ? 'text-gray-400 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <XCircle className="w-6 h-6" />
              </button>
              <h2 className={`text-2xl font-extrabold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Compare Employee Performance</h2>
              <div className="flex flex-col gap-6 mb-6">
                <div>
                  <label htmlFor="employee1Search" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Select Employee 1: 
                  </label>
                  <div className="relative"> {/* Added relative positioning for the clear button */}
                    <input
                      id="employee1Search"
                      type="text"
                      placeholder={employee1ToCompare ? employee1ToCompare : "Search for Employee 1..."}
                      value={modalSearchTerm1}
                      onChange={(e) => setModalSearchTerm1(e.target.value)}
                      className={`w-full px-4 py-2 pr-10 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                        employee1ToCompare
                          ? (isDarkMode ? 'bg-blue-900/30 text-gray-100' : 'bg-indigo-800 text-gray-900') // Updated selected state for light mode
                          : (isDarkMode ? 'bg-slate-700 border-slate-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900') // Default state
                      } focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {employee1ToCompare && (modalSearchTerm1 === '' || modalSearchTerm1 === employee1ToCompare) && (
                      <button
                        onClick={() => { setEmployee1ToCompare(''); setModalSearchTerm1(''); }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {modalSearchTerm1 && filteredEmployees1.length > 0 && (
                    <div className={`mt-2 max-h-40 overflow-y-auto rounded-xl shadow-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'}`}>
                      {filteredEmployees1.map(emp => (
                        <button
                          key={emp}
                          onClick={() => {
                            setEmployee1ToCompare(emp);
                            setModalSearchTerm1(''); // Clear search term so placeholder (selected name) is visible
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-200 hover:bg-slate-600' : 'text-gray-800 hover:bg-gray-100'}`}
                        >
                          {emp}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="employee2Search" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Select Employee 2: 
                  </label>
                  <div className="relative"> {/* Added relative positioning for the clear button */}
                    <input
                      id="employee2Search"
                      type="text"
                      placeholder={employee2ToCompare ? employee2ToCompare : "Search for Employee 2..."}
                      value={modalSearchTerm2}
                      onChange={(e) => setModalSearchTerm2(e.target.value)}
                      className={`w-full px-4 py-2 pr-10 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                        employee2ToCompare
                          ? (isDarkMode ? 'bg-blue-900/30 text-gray-100' : 'bg-indigo-800 text-gray-900') // Updated selected state for light mode
                          : (isDarkMode ? 'bg-slate-700 border-slate-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900') // Default state
                      } focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {employee2ToCompare && (modalSearchTerm2 === '' || modalSearchTerm2 === employee2ToCompare) && (
                      <button
                        onClick={() => { setEmployee2ToCompare(''); setModalSearchTerm2(''); }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {modalSearchTerm2 && filteredEmployees2.length > 0 && (
                    <div className={`mt-2 max-h-40 overflow-y-auto rounded-xl shadow-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'}`}>
                      {filteredEmployees2.map(emp => (
                        <button
                          key={emp}
                          onClick={() => {
                            setEmployee2ToCompare(emp);
                            setModalSearchTerm2(''); // Clear search term so placeholder (selected name) is visible
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-200 hover:bg-slate-600' : 'text-gray-800 hover:bg-gray-100'}`}
                        >
                          {emp}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  onClick={() => setShowComparisonModal(false)}
                  className={`px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? 'bg-slate-600 hover:bg-slate-500 text-white shadow-md hover:shadow-slate-500/25' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md hover:shadow-gray-300/25'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (employee1ToCompare && employee2ToCompare && employee1ToCompare !== employee2ToCompare) {
                      setShowComparisonChart(true);
                      setShowComparisonModal(false);
                      setSearchTerm('');
                      setFilterDate('');
                    } else {
                      console.log("Please select two different employees to compare.");
                    }
                  }}
                  className={`px-5 py-2 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/25' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/25'
                  }`}
                >
                  <GitCompare className="w-4 h-4" />
                  Show Comparison
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/20 hover:brightness-125 hover:border-blue-400' 
              : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg hover:border-blue-400'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-200'}`}>
                <Users className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <TrendingUp className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
            </div>
            <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Employees
            </h3>
            <p className="text-3xl font-bold text-blue-600">{employees.length}</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active workforce</p>
          </div>

          <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-500/20 hover:brightness-125 hover:border-green-400' 
              : 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:shadow-lg hover:border-green-400'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-green-500/20' : 'bg-green-200'}`}>
                <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <TrendingUp className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
            </div>
            <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Days Tracked
            </h3>
            <p className="text-3xl font-bold text-green-600">{attendanceData.length}</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>This period</p>
          </div>

          <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-orange-600/20 to-orange-700/20 border border-orange-500/20 hover:brightness-125 hover:border-orange-400' 
              : 'bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 hover:shadow-lg hover:border-orange-400'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-orange-500/20' : 'bg-orange-200'}`}>
                <Clock className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              <TrendingUp className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
            </div>
            <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Avg Hours/Day
            </h3>
            <p className="text-3xl font-bold text-orange-600">{avgHoursPerDay.toFixed(1)}</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Per employee</p>
          </div>

          <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/20 hover:brightness-125 hover:border-purple-400' 
              : 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-lg hover:border-purple-400'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-200'}`}>
                <BarChart3 className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <TrendingUp className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
            </div>
            <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Hours
            </h3>
            <p className="text-3xl font-bold text-purple-600">{Math.round(totalHours)}</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>This period</p>
          </div>
        </div>

        {/* Team Members Section */}
        <div className={`transition-all duration-300 ease-in-out ${searchTerm ? 'max-h-96 opacity-100 mb-4 sm:mb-6' : 'max-h-0 opacity-0 mb-0'} overflow-hidden`}>
          <div className={`p-4 sm:p-6 rounded-2xl backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-slate-800/50 border border-slate-700/50' 
              : 'bg-white/80 border border-gray-200/50'
          }`}>
            <h3 className={`text-lg font-semibold mb-3 sm:mb-4 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>Team Members</h3>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-4">
              {filteredEmployeesForTeamMembers.map((employee) => (
                <div key={employee} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-slate-700/30 hover:bg-slate-700/50' : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div 
                    className="w-4 h-4 rounded-full shadow-lg flex-shrink-0"
                    style={{ backgroundColor: employeeColors[employee] }}
                  ></div>
                  <span className={`text-sm font-medium truncate max-w-[100px] ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {employee.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className={`rounded-2xl backdrop-blur-sm p-2 sm:p-4 md:p-6 ${
          isDarkMode 
            ? 'bg-slate-800/50 border border-slate-700/50' 
            : 'bg-white/80 border border-gray-200/50'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4 flex-wrap gap-2 sm:gap-4">
            <h3 className={`text-base sm:text-lg md:text-xl font-semibold ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>{getChartTitle()}</h3>
            <div className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm flex items-center gap-1 sm:gap-2 ${
              isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              {getChartIcon()}
              {showComparisonChart ? 'Hours Worked' : (selectedMeasure === 'pie' ? 'Total Hours' : 'Hours Worked')}
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[320px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px]">
              {renderChart()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
