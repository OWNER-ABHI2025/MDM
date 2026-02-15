import React, { useState, useEffect, useRef } from "react";
import { Search, Download, Filter, Users, Star, CalendarCheck, ChevronDown, Settings, X } from "lucide-react";

// Responsive utility: returns true if screen is <= 1024px (tablet and below)
const useIsTablet = () => {
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
    useEffect(() => {
        const onResize = () => setIsTablet(window.innerWidth <= 1024);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return isTablet;
};

const formatDateTimeTo12Hour = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    return date.toLocaleString('en-US', options);
};

const mockData = [
    { id: 1, name: "Sahil Khot", checkIn: "05/23/2025 02:30:00 PM", checkOut: "05/23/2025 11:30:00 PM", department: "Engineering", isFavorite: false, status: "onTime" },
    { id: 2, name: "Vaishnavi Dhanawade", checkIn: "05/23/2025 08:33:17 AM", checkOut: "05/23/2025 05:39:19 PM", department: "Marketing", isFavorite: true, status: "onTime" },
    { id: 3, name: "Vaishnavi Wali", checkIn: "05/23/2025 02:35:00 PM", checkOut: "05/23/2025 11:30:00 PM", department: "HR", isFavorite: false, status: "onTime" },
    { id: 4, name: "Vaishnavi Wali", checkIn: "05/23/2025 10:00:00 AM", checkOut: "05/23/2025 10:30:00 AM", department: "HR", isFavorite: false, status: "leave" },
    { id: 5, name: "Shubham Patil", checkIn: "05/23/2025 08:55:07 AM", checkOut: "05/23/2025 05:30:02 PM", department: "Engineering", isFavorite: true, status: "onTime" },
    { id: 6, name: "Rutuja Kamble", checkIn: "05/23/2025 02:45:00 PM", checkOut: "05/23/2025 11:31:57 PM", department: "Sales", isFavorite: false, status: "onTime" },
    { id: 7, name: "Archana Vishnu Ghongte", checkIn: "05/23/2025 02:30:00 PM", checkOut: "05/23/2025 11:30:00 PM", department: "Operations", isFavorite: false, status: "onTime" },
    { id: 8, name: "Varsha Kale", checkIn: "05/23/2025 09:10:29 AM", checkOut: "05/23/2025 05:31:57 PM", department: "Finance", isFavorite: true, status: "onTime" },
    { id: 9, name: "Maithili Parit", checkIn: "05/23/2025 08:50:15 AM", checkOut: "05/23/2025 05:30:21 PM", department: "Marketing", isFavorite: false, status: "onTime" },
    { id: 10, name: "Priti Mane", checkIn: "05/23/2025 08:58:23 AM", checkOut: "05/23/2025 05:30:09 PM", department: "HR", isFavorite: false, status: "onTime" },
    { id: 11, name: "Siddhartha Patil", checkIn: "05/23/2025 10:24:22 AM", checkOut: "", department: "Engineering", isFavorite: false, status: "onTime" },
    { id: 12, name: "Aditya Kadam", checkIn: "05/23/2025 08:40:13 AM", checkOut: "05/23/2025 05:22:22 PM", department: "Sales", isFavorite: true, status: "onTime" },
];

const calculateAttendanceDetails = (item, officialStartTime, checkInGracePeriodMinutes) => {
    let calculatedStatus = item.status;
    let calculatedWorkHours = "00:00";
    const checkInDate = new Date(item.checkIn);
    const checkOutDate = item.checkOut ? new Date(item.checkOut) : null;
    if (checkInDate && checkOutDate && !isNaN(checkInDate) && !isNaN(checkOutDate)) {
        const diffMs = checkOutDate.getTime() - checkInDate.getTime();
        const totalMinutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        calculatedWorkHours = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
    if (item.status === "leave") {
        return { status: "leave", workHours: calculatedWorkHours };
    }
    if (!item.checkOut) {
        calculatedStatus = "late";
    } else {
        const [officialHours, officialMinutes] = officialStartTime.split(':').map(Number);
        const officialStartTimeInMinutes = officialHours * 60 + officialMinutes;
        const latestOnTimeCheckInInMinutes = officialStartTimeInMinutes + checkInGracePeriodMinutes;
        const checkInTimeInMinutes = checkInDate.getHours() * 60 + checkInDate.getMinutes();
        if (checkInTimeInMinutes > latestOnTimeCheckInInMinutes) {
            calculatedStatus = "late";
        } else {
            calculatedStatus = "onTime";
        }
    }
    return { status: calculatedStatus, workHours: calculatedWorkHours };
};

const Attendance = () => {
    const [data, setData] = useState(mockData);
    const [processedData, setProcessedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [groupBy, setGroupBy] = useState("none");
    const [showGroupBy, setShowGroupBy] = useState(false);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [showAttendanceRules, setShowAttendanceRules] = useState(false);
    const [officialStartTime, setOfficialStartTime] = useState("14:30");
    const [checkInGracePeriodMinutes, setCheckInGracePeriodMinutes] = useState(10);

    const perPage = 8;

    const filterRef = useRef(null);
    const filterButtonRef = useRef(null);
    const groupByRef = useRef(null);
    const groupByButtonRef = useRef(null);
    const attendanceRulesRef = useRef(null);
    const attendanceRulesButtonRef = useRef(null);

    const isTablet = useIsTablet();

    useEffect(() => {
        const newProcessedData = data.map(item => {
            const { status, workHours } = calculateAttendanceDetails(
                item,
                officialStartTime,
                checkInGracePeriodMinutes
            );
            return { ...item, status, workHours };
        });
        setProcessedData(newProcessedData);
    }, [data, officialStartTime, checkInGracePeriodMinutes]);
    const departments = [...new Set(processedData.map(item => item.department))];
    const statuses = [...new Set(processedData.map(item => item.status))];

    const getFilteredData = () => {
        let filtered = processedData.filter((row) => {
            const matchesSearch = row.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "all" || row.status === statusFilter;
            const matchesDepartment = departmentFilter === "all" || row.department === departmentFilter;
            const matchesFavorites = !showFavoritesOnly || row.isFavorite;
            return matchesSearch && matchesStatus && matchesDepartment && matchesFavorites;
        });
        return filtered;
    };

    const filtered = getFilteredData();
    const getGroupedData = () => {
        if (groupBy === "none") {
            return { "All Records": filtered };
        }
        const grouped = {};
        filtered.forEach(item => {
            const key = item[groupBy] || "Unassigned";
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(item);
        });
        return grouped;
    };

    const groupedData = getGroupedData();
    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / perPage);

    const flattenedForPagination = filtered.slice((page - 1) * perPage, page * perPage);
    const startRecord = totalRecords > 0 ? (page - 1) * perPage + 1 : 0;
    const endRecord = Math.min(page * perPage, totalRecords);

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRows(flattenedForPagination.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id, checked) => {
        if (checked) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        }
    };

    const toggleFavorite = (id) => {
        setData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
    };

    const clearFilters = () => {
        setStatusFilter("all");
        setDepartmentFilter("all");
        setShowFavoritesOnly(false);
        setSearchTerm("");
    };

    const isAllSelected = flattenedForPagination.length > 0 &&
        flattenedForPagination.every(row => selectedRows.includes(row.id));

    const isIndeterminate = selectedRows.length > 0 &&
        !flattenedForPagination.every(row => selectedRows.includes(row.id));

    const getStatusBadge = (status) => {
        const colors = {
            onTime: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            late: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            leave: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        };
        return colors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    };

    const handleExportCsv = () => {
        const headers = ["ID", "Employee Name", "Department", "Check In", "Check Out", "Work Hours", "Status", "Favorite"];
        const csvRows = filtered.map(row => [
            row.id,
            `"${row.name.replace(/"/g, '""')}"`,
            `"${row.department.replace(/"/g, '""')}"`,
            `"${formatDateTimeTo12Hour(row.checkIn).replace(/"/g, '""')}"`,
            `"${formatDateTimeTo12Hour(row.checkOut).replace(/"/g, '""')}"`,
            `"${row.workHours.replace(/"/g, '""')}"`,
            `"${row.status.replace(/"/g, '""')}"`,
            row.isFavorite ? "Yes" : "No"
        ].join(','));
        const csvContent = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'attendance_data.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("Your browser does not support downloading files directly.");
        }
    };

    useEffect(() => {
        setPage(1);
    }, [searchTerm, statusFilter, departmentFilter, showFavoritesOnly, groupBy, officialStartTime, checkInGracePeriodMinutes]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target) &&
                filterButtonRef.current && !filterButtonRef.current.contains(event.target)) {
                setShowFilters(false);
            }
            if (groupByRef.current && !groupByRef.current.contains(event.target) &&
                groupByButtonRef.current && !groupByButtonRef.current.contains(event.target)) {
                setShowGroupBy(false);
            }
            if (attendanceRulesRef.current && !attendanceRulesRef.current.contains(event.target) &&
                attendanceRulesButtonRef.current && !attendanceRulesButtonRef.current.contains(event.target)) {
                setShowAttendanceRules(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Responsive table: show cards on mobile/tablet, table on desktop
    const renderTable = (dataToRender, title = null) => (
        <div className="mb-6">
            {title && (
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600 rounded-t-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{title} ({dataToRender.length})</h3>
                </div>
            )}
            <div className="overflow-x-auto">
                {/* Table for desktop only */}
                <table className="w-full min-w-[700px] hidden lg:table">
                    {!title && (
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                                <th className="w-12 p-4">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    />
                                </th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-300">Employee</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-300">Check In</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-300">Check Out</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-300">Status</th>
                                <th className="text-right p-4 text-sm font-medium text-gray-600 dark:text-gray-300">Work Hours</th>
                                <th className="text-center p-4 text-sm font-medium text-gray-600 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                    )}
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {dataToRender.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            dataToRender.map((row) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                >
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(row.id)}
                                            onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {row.name}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {row.department}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-gray-600 dark:text-gray-300">
                                            {formatDateTimeTo12Hour(row.checkIn)}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-gray-600 dark:text-gray-300">
                                            {row.checkOut ? formatDateTimeTo12Hour(row.checkOut) : "Not checked out"}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(row.status)}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {row.workHours}
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => toggleFavorite(row.id)}
                                            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                                                row.isFavorite ? 'text-yellow-500' : 'text-gray-400'
                                            }`}
                                        >
                                            <Star className={`h-4 w-4 ${row.isFavorite ? 'fill-current' : ''}`} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {/* Card view for mobile/tablet */}
                <div className="block lg:hidden">
                    {dataToRender.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No records found.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {dataToRender.map((row) => (
                                <div
                                    key={row.id}
                                    className="rounded-lg shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 flex flex-col justify-between"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">{row.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{row.department}</div>
                                        </div>
                                        <button
                                            onClick={() => toggleFavorite(row.id)}
                                            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                                                row.isFavorite ? 'text-yellow-500' : 'text-gray-400'
                                            }`}
                                        >
                                            <Star className={`h-4 w-4 ${row.isFavorite ? 'fill-current' : ''}`} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-1 text-xs">
                                        <div>
                                            <span className="font-medium">Check In:</span> {formatDateTimeTo12Hour(row.checkIn)}
                                        </div>
                                        <div>
                                            <span className="font-medium">Check Out:</span> {row.checkOut ? formatDateTimeTo12Hour(row.checkOut) : "Not checked out"}
                                        </div>
                                        <div>
                                            <span className="font-medium">Work Hours:</span> {row.workHours}
                                        </div>
                                        <div>
                                            <span className="font-medium">Status:</span>{" "}
                                            <span className={`inline-flex px-2 py-1 text-[10px] font-semibold rounded-full ${getStatusBadge(row.status)}`}>
                                                {row.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // Responsive tweaks for padding and layout
    return (
        <div>
            <style>
                {`
                @media (max-width: 1024px) {
                    .attendance-main { padding: 0.5rem !important; }
                    .attendance-card { margin-bottom: 1rem !important; }
                }
                @media (max-width: 768px) {
                    .attendance-main { padding: 0.25rem !important; }
                    .attendance-card { margin-bottom: 0.5rem !important; }
                }
                /* Fix for filter popover on tablet/mobile */
                .filter-popover-mobile {
                    position: fixed !important;
                    left: 50% !important;
                    top: 80px !important;
                    transform: translateX(-50%) !important;
                    z-index: 9999 !important;
                    width: 90vw !important;
                    max-width: 400px !important;
                    min-width: 250px !important;
                }
                `}
            </style>
            <div className="min-h-screen bg-white/70 dark:bg-gray-900 transition-colors duration-300 font-sans">
                <div className="attendance-main p-2 sm:p-4 md:p-6">
                    <div className="max-w-full mx-auto bg-white/80 dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 backdrop-blur-md">
                        <div className="border-b border-gray-200 dark:border-gray-700 p-2 sm:p-4">
                            <div className={`flex flex-col ${isTablet ? "" : "lg:flex-row lg:items-center"} justify-between gap-2 sm:gap-4`}>
                                <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 flex-wrap min-w-0`}>
                                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                                        <CalendarCheck className="h-6 w-6 text-blue-500 flex-shrink-0" />
                                        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white truncate">Attendances</h1>
                                    </div>
                                    <div className="relative w-full sm:w-64 mt-2 sm:mt-0">
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search employees..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap mt-2 lg:mt-0">
                                    <div className="relative">
                                        <button
                                            ref={filterButtonRef}
                                            onClick={(e) => { e.stopPropagation(); setShowFilters(!showFilters); }}
                                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                                        >
                                            <Filter className="h-4 w-4" />
                                            Filters
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                        {showFilters && (
                                            <div
                                                ref={filterRef}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 ${
                                                    isTablet
                                                        ? "filter-popover-mobile"
                                                        : "absolute right-0 mt-2 w-64 z-10"
                                                }`}
                                            >
                                                <div className="p-4 space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Status
                                                        </label>
                                                        <select
                                                            value={statusFilter}
                                                            onChange={(e) => setStatusFilter(e.target.value)}
                                                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="all">All Status</option>
                                                            {statuses.map(status => (
                                                                <option key={status} value={status}>{status}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Department
                                                        </label>
                                                        <select
                                                            value={departmentFilter}
                                                            onChange={(e) => setDepartmentFilter(e.target.value)}
                                                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="all">All Departments</option>
                                                            {departments.map(dept => (
                                                                <option key={dept} value={dept}>{dept}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <button
                                                            onClick={clearFilters}
                                                            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                                        >
                                                            Clear Filters
                                                        </button>
                                                        <button
                                                            onClick={() => setShowFilters(false)}
                                                            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <button
                                            ref={groupByButtonRef}
                                            onClick={(e) => { e.stopPropagation(); setShowGroupBy(!showGroupBy); }}
                                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                                        >
                                            <Users className="h-4 w-4" />
                                            Group By
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                        {showGroupBy && (
                                            <div
                                                ref={groupByRef}
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                                            >
                                                <div className="p-2">
                                                    {['none', 'department', 'status'].map(option => (
                                                        <button
                                                            key={option}
                                                            onClick={() => {
                                                                setGroupBy(option);
                                                                setShowGroupBy(false);
                                                            }}
                                                            className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                                groupBy === option ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                                                            } transition-colors`}
                                                        >
                                                            {option === 'none' ? 'No Grouping' : option.charAt(0).toUpperCase() + option.slice(1)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                            showFavoritesOnly ? 'bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-300' : 'text-gray-700 dark:text-gray-200'
                                        } transition-colors`}
                                    >
                                        <Star className={`h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                                        Favorites
                                    </button>
                                    <div className="relative">
                                        <button
                                            ref={attendanceRulesButtonRef}
                                            onClick={(e) => { e.stopPropagation(); setShowAttendanceRules(!showAttendanceRules); }}
                                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                                        >
                                            <Settings className="h-4 w-4" />
                                            Attendance Rules
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                        {showAttendanceRules && (
                                            <div
                                                ref={attendanceRulesRef}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 ${
                                                    isTablet
                                                        ? "filter-popover-mobile"
                                                        : "absolute right-0 mt-2 w-72 z-10"
                                                }`}
                                            >
                                                <div className="p-4 space-y-4">
                                                    <h4 className="text-base font-semibold text-gray-800 dark:text-white">Attendance Rules</h4>
                                                    <div>
                                                        <label htmlFor="officialStartTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Official Start Time (HH:MM)
                                                        </label>
                                                        <input
                                                            type="time"
                                                            id="officialStartTime"
                                                            value={officialStartTime}
                                                            onChange={(e) => setOfficialStartTime(e.target.value)}
                                                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="checkInGracePeriodMinutes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Check-in Grace Period (minutes)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            id="checkInGracePeriodMinutes"
                                                            value={checkInGracePeriodMinutes}
                                                            onChange={(e) => setCheckInGracePeriodMinutes(Number(e.target.value))}
                                                            min="0"
                                                            step="1"
                                                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={() => setShowAttendanceRules(false)}
                                                            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ...rest of the component remains unchanged... */}
                        <div className="flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 gap-2 sm:gap-0">
                            <div className="flex items-center gap-2 sm:gap-4 flex-wrap mb-2 sm:mb-0 w-full sm:w-auto">
                                <button className="bg-sky-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors shadow-md w-full sm:w-auto">
                                    NEW
                                </button>
                                <button
                                    onClick={handleExportCsv}
                                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors w-full sm:w-auto"
                                >
                                    <Download className="h-4 w-4" />
                                    Export
                                </button>
                                {(statusFilter !== "all" || departmentFilter !== "all" || showFavoritesOnly || searchTerm || groupBy !== "none") && (
                                    <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Filters applied:</span>
                                        {searchTerm && (
                                            <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs dark:bg-blue-900 dark:text-blue-200">
                                                Search: "{searchTerm}"
                                                <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                                            </span>
                                        )}
                                        {statusFilter !== "all" && (
                                            <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs dark:bg-blue-900 dark:text-blue-200">
                                                Status: {statusFilter}
                                                <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter("all")} />
                                            </span>
                                        )}
                                        {departmentFilter !== "all" && (
                                            <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs dark:bg-blue-900 dark:text-blue-200">
                                                Department: {departmentFilter}
                                                <X className="h-3 w-3 cursor-pointer" onClick={() => setDepartmentFilter("all")} />
                                            </span>
                                        )}
                                        {showFavoritesOnly && (
                                            <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs dark:bg-yellow-900 dark:text-yellow-200">
                                                Favorites Only
                                                <X className="h-3 w-3 cursor-pointer" onClick={() => setShowFavoritesOnly(false)} />
                                            </span>
                                        )}
                                        {groupBy !== "none" && (
                                            <span className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs dark:bg-purple-900 dark:text-purple-200">
                                                Grouped by: {groupBy}
                                                <X className="h-3 w-3 cursor-pointer" onClick={() => setGroupBy("none")} />
                                            </span>
                                        )}
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-1"
                                        >
                                            <X className="h-3 w-3" /> Clear All
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 w-full sm:w-auto text-left sm:text-right">
                                {totalRecords > 0 ? (
                                    <>
                                        Showing {startRecord}-{endRecord} of {totalRecords} records
                                    </>
                                ) : (
                                    "No records to display"
                                )}
                            </div>
                        </div>
                        <div className="p-2 sm:p-4">
                            {groupBy === "none" ? (
                                <div className="overflow-x-auto">
                                    {renderTable(flattenedForPagination)}
                                </div>
                            ) : (
                                Object.keys(groupedData).map(groupName => (
                                    <div key={groupName} className="overflow-x-auto">
                                        {renderTable(groupedData[groupName], groupName)}
                                    </div>
                                ))
                            )}
                        </div>
                        {groupBy === "none" && totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4 border-t border-gray-200 dark:border-gray-700 gap-2 sm:gap-0">
                                <button
                                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-gray-700 dark:text-gray-200 w-full sm:w-auto text-center">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;