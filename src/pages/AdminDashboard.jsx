import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CiEdit } from "react-icons/ci";
import { LuView } from "react-icons/lu";
import DataTable from "react-data-table-component";
import useUserStore from "../store/userStore";
import {
  getToken,
  getSessionUser,
  logOut as clearSession,
} from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, isLoggedIn, logOut, setUser } = useUserStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statsData = [
    {
      title: "Total Users",
      value: "12,584",
      change: "+12.5%",
      isPositive: true,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Total Bookings",
      value: "3,247",
      change: "+8.2%",
      isPositive: true,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Payments Clear",
      value: "$42,580",
      change: "+15.3%",
      isPositive: true,
      color: "bg-purple-500",
      textColor: "text-purple-600",
    },
    {
      title: "Pending Requests",
      value: "42",
      change: "-5.7%",
      isPositive: false,
      color: "bg-orange-500",
      textColor: "text-orange-600",
    },
  ];

  const pieData = [
    { name: "Active Users", value: 400 },
    { name: "New Users", value: 300 },
    { name: "Inactive Users", value: 200 },
    { name: "Suspended", value: 100 },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"];

  const lineData = [
    { name: "Jan", revenue: 4000, users: 2400 },
    { name: "Feb", revenue: 3000, users: 1398 },
    { name: "Mar", revenue: 2000, users: 9800 },
    { name: "Apr", revenue: 2780, users: 3908 },
    { name: "May", revenue: 1890, users: 4800 },
    { name: "Jun", revenue: 2390, users: 3800 },
    { name: "Jul", revenue: 3490, users: 4300 },
    { name: "Aug", revenue: 4200, users: 5200 },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-section")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logOut();
    clearSession();

    setTimeout(() => {
      window.location.reload();
      navigate("/", { replace: true });
    }, 100);
  };

  const bookingData = [
    {
      id: "BK001",
      startDate: "2025-10-01",
      endDate: "2025-10-03",
      startTime: "10:00 AM",
      endTime: "04:00 PM",
      airport: "JFK",
      status: "Completed",
    },
    {
      id: "BK002",
      startDate: "2025-10-05",
      endDate: "2025-10-06",
      startTime: "12:00 PM",
      endTime: "06:00 PM",
      airport: "LAX",
      status: "Inprogress",
    },
    {
      id: "BK003",
      startDate: "2025-10-08",
      endDate: "2025-10-10",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      airport: "SFO",
      status: "Cancelled",
    },
  ];

  const columns = [
    { name: "Booking ID", selector: (row) => row.id, sortable: true },
    { name: "Start Date", selector: (row) => row.startDate, sortable: true },
    { name: "End Date", selector: (row) => row.endDate, sortable: true },
    { name: "Start Time", selector: (row) => row.startTime, sortable: true },
    { name: "End Time", selector: (row) => row.endTime, sortable: true },
    { name: "Airport", selector: (row) => row.airport, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === "Completed"
              ? "bg-green-100 text-green-800"
              : row.status === "Inprogress"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button className="text-gray-600 hover:text-indigo-700" title="View">
            <LuView size={18} />
          </button>
          <button className="text-gray-600 hover:text-indigo-700" title="Edit">
            <CiEdit size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        border: "none",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        color: "#64748b",
        borderRadius: "8px 8px 0 0",
        padding: "0 8px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        "&:first-of-type": { paddingLeft: "24px", borderTopLeftRadius: "8px" },
        "&:last-of-type": { paddingRight: "24px", borderTopRightRadius: "8px" },
      },
    },
    rows: {
      style: {
        fontSize: "0.875rem",
        fontWeight: 400,
        color: "#334155",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f1f5f9",
        transition: "all 0.2s ease",
        "&:not(:last-of-type)": { borderBottom: "1px solid #f1f5f9" },
        "&:hover": {
          backgroundColor: "#f8fafc",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    cells: {
      style: { paddingLeft: "16px", paddingRight: "16px" },
    },
    pagination: {
      style: {
        borderTop: "none",
        backgroundColor: "#ffffff",
        padding: "16px 24px",
        borderRadius: "0 0 8px 8px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Brand */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#244c30] to-[#b7e06e] bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>

            {/* Right side - Profile */}
            <div className="profile-section relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#244c30] to-[#b7e06e] rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <span className="text-gray-700 font-medium hidden sm:block">
                  Admin
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 animate-in fade-in duration-200">
                  <div className="my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-12 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                  {stat.title}
                </h3>
                <div
                  className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <span
                  className={`text-sm font-medium ${
                    stat.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">From last month</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="flex items-center gap-4">
          {/* Pie Chart Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-[40%]">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              User Distribution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-[60%]">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Monthly Revenue & Users
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#3B82F6" }}
                    name="Revenue ($)"
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#10B981" }}
                    name="Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
      {/* All Bookings */}
      <section className="w-full px-4 sm:px-6 lg:px-12 pb-12">
        <h1 className="text-2xl font-semibold font-serif text-gray-700 mb-6">
          All Bookings
        </h1>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <DataTable
            columns={columns}
            data={bookingData}
            customStyles={customStyles}
            pagination
            highlightOnHover
            pointerOnHover
            responsive
            noDataComponent={
              <div className="py-8 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No bookings found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  No bookings available
                </p>
              </div>
            }
          />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
