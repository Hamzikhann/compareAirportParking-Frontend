import { useState, useEffect } from "react";
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
  logOut as clearSession,
} from "../services/AuthService";
import ApiServices from "../services/ApiServices";

const AdminDashboard = () => {
  const { logOut } = useUserStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState(null);
  const [lineData, setLineData] = useState([]);
  const [loadingLine, setLoadingLine] = useState(true);
  const [errorLine, setErrorLine] = useState(null);
  const [filter, setFilter] = useState('monthly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await ApiServices.postRequest({
          path: "booking/list",
          payload: {}
        });
        if (response?.data?.data?.allBookings) {
          const bookings = response.data.data.allBookings.map((booking) => ({
            id: booking.id,
            startDate: booking.startDate,
            endDate: booking.endDate,
            startTime: booking.startTime || "N/A",
            endTime: booking.endTime || "N/A",
            airport: booking.airport,
            status: booking.status
          }));
          setBookingData(bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDashboardData = async () => {
      try {
        setLoadingStats(true);
        setErrorStats(null);
        const response = await ApiServices.postRequest({
          path: "dashboard",
          payload: {}
        });
        if (response?.data?.success && response.data.data) {
          const { stats, userDistribution } = response.data.data;

          const formattedStats = [
            {
              title: "Total Users",
              value: stats.totalUsers.toString(),
              change: `${stats.changes.totalUsers >= 0 ? '+' : ''}${stats.changes.totalUsers}%`,
              isPositive: stats.changes.totalUsers >= 0,
              color: "bg-blue-500",
              textColor: "text-blue-600",
            },
            {
              title: "Total Bookings",
              value: stats.totalBookings.toString(),
              change: `${stats.changes.totalBookings >= 0 ? '+' : ''}${stats.changes.totalBookings}%`,
              isPositive: stats.changes.totalBookings >= 0,
              color: "bg-green-500",
              textColor: "text-green-600",
            },
            {
              title: "Total Payments",
              value: `$${stats.totalPayments}`,
              change: `${stats.changes.totalPayments >= 0 ? '+' : ''}${stats.changes.totalPayments}%`,
              isPositive: stats.changes.totalPayments >= 0,
              color: "bg-purple-500",
              textColor: "text-purple-600",
            },
            {
              title: "Pending Requests",
              value: stats.pendingRequests.toString(),
              change: `${stats.changes.pendingRequests >= 0 ? '+' : ''}${stats.changes.pendingRequests}%`,
              isPositive: stats.changes.pendingRequests >= 0,
              color: "bg-orange-500",
              textColor: "text-orange-600",
            },
          ];

          // Format pie data for user distribution
          const formattedPieData = [
            { name: "Active Users", value: userDistribution.active },
            { name: "New Users", value: userDistribution.new },
            { name: "Inactive Users", value: userDistribution.inactive },
          ];

          setStatsData(formattedStats);
          setPieData(formattedPieData);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setErrorStats("Failed to load dashboard data");
      } finally {
        setLoadingStats(false);
      }
    };

   

    fetchBookings();
    fetchDashboardData();
  }, []);

  useEffect(() => {
     const fetchMonthlyData = async (selectedFilter) => {
      try {
        setLoadingLine(true);
        setErrorLine(null);
        const response = await ApiServices.getRequest(`dashboard/monthly-data?filter=${selectedFilter}`);
        if (response?.data?.success && response.data.data) {
          setLineData(response.data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching monthly data:", error);
        setErrorLine("Failed to load monthly data");
      } finally {
        setLoadingLine(false);
      }
    };
    fetchMonthlyData(filter);
  }, [filter]);


  const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"];

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleLogout = () => {
    logOut();
    clearSession();

    setTimeout(() => {
      window.location.reload();
      navigate("/", { replace: true });
    }, 100);
  };

  const handleViewBooking = async (booking) => {
    setLoadingDetails(true);
    setIsModalOpen(true);
    try {
      const response = await ApiServices.postRequest({
        path: "booking/detail",
        payload: { bookingId: booking.id }
      });
      if (response?.data?.data) {
        console.log("Booking Details:", response.data.data);
        setSelectedBooking(response.data.data);
      } else {
        console.error("Failed to fetch booking details");
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };



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
          <button
            className="text-gray-600 hover:text-indigo-700"
            title="View"
            onClick={() => handleViewBooking(row)}
          >
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {loadingStats ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6 animate-pulse"
              >
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="h-3 lg:h-4 bg-gray-200 rounded w-20 lg:w-24"></div>
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="h-6 lg:h-8 bg-gray-200 rounded w-12 lg:w-16"></div>
                  <div className="h-3 lg:h-4 bg-gray-200 rounded w-8 lg:w-12"></div>
                </div>
                <div className="h-2 lg:h-3 bg-gray-200 rounded w-16 lg:w-20 mt-2"></div>
              </div>
            ))
          ) : errorStats ? (
            <div className="col-span-full bg-red-50 border border-red-200 rounded-xl p-4 lg:p-6">
              <p className="text-red-600 text-center">{errorStats}</p>
            </div>
          ) : (
            statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <h3 className="text-gray-500 text-xs lg:text-sm font-medium uppercase tracking-wide">
                    {stat.title}
                  </h3>
                  <div
                    className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg ${stat.color} flex items-center justify-center`}
                  >
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-white"
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
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <span
                    className={`text-xs lg:text-sm font-medium ${
                      stat.isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">From last month</p>
              </div>
            ))
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {/* Pie Chart Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">
              User Distribution
            </h2>
            <div className="h-64 sm:h-72 lg:h-80">
              {loadingStats ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : errorStats ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-red-600">{errorStats}</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={60}
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
              )}
            </div>
          </div>

          {/* Line Chart Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 lg:mb-6 gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Revenue & Users
              </h2>
              <div className="flex gap-2">
                {['weekly', 'monthly'].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      filter === filterOption
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 sm:h-72 lg:h-80">
              {loadingLine ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : errorLine ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-red-600">{errorLine}</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-semibold text-gray-800 mb-2">{`${label}`}</p>
                              <div className="space-y-1">
                                <p className="text-blue-600">
                                  Current Year Revenue: <span className="font-bold">${data.currentRevenue || 0}</span>
                                </p>
                                <p className="text-blue-400">
                                  Previous Year Revenue: <span className="font-bold">${data.previousRevenue || 0}</span>
                                </p>
                                <p className="text-green-600">
                                  Current Year Users: <span className="font-bold">{data.currentUsers || 0}</span>
                                </p>
                                <p className="text-green-400">
                                  Previous Year Users: <span className="font-bold">{data.previousUsers || 0}</span>
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="currentRevenue"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#3B82F6" }}
                      name="Current Year Revenue ($)"
                    />
                    <Line
                      type="monotone"
                      dataKey="previousRevenue"
                      stroke="#93C5FD"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#93C5FD", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: "#93C5FD" }}
                      name="Previous Year Revenue ($)"
                    />
                    <Line
                      type="monotone"
                      dataKey="currentUsers"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#10B981" }}
                      name="Current Year Users"
                    />
                    <Line
                      type="monotone"
                      dataKey="previousUsers"
                      stroke="#6EE7B7"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#6EE7B7", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: "#6EE7B7" }}
                      name="Previous Year Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
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
          {loading ? (
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Loading bookings...</p>
            </div>
          ) : (
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
          )}
        </div>
      </section>

      {/* Booking Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl shadow-2xl max-w-7xl w-full max-h-[98vh] sm:max-h-[95vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#244c30] to-[#b7e06e] p-4 sm:p-6 relative">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Booking Details</h2>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-[#244c30] bg-opacity-50 rounded-full flex items-center justify-center transition-all duration-200 group"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(98vh-80px)] sm:max-h-[calc(95vh-120px)]">
              {loadingDetails ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#244c30] border-t-transparent"></div>
                  <p className="mt-4 text-lg text-gray-600 font-medium">Loading booking details...</p>
                </div>
              ) : selectedBooking ? (
                <div className="space-y-6 lg:space-y-8">
                  {/* Booking Information */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#244c30] to-[#b7e06e] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 11h6" />
                        </svg>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Booking Information</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Booking ID</span>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.id}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Start Date</span>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.startDate}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">End Date</span>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.endDate}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Start Time</span>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.startTime || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">End Time</span>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.endTime || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Airport</span>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.airport}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
                        <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Status</span>
                        <div className="mt-1">
                          <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                            selectedBooking.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : selectedBooking.status === "Inprogress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {selectedBooking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Registration Information */}
                  {selectedBooking.registrations && selectedBooking.registrations.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#244c30] to-[#b7e06e] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Passenger Information</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Name</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{`${selectedBooking.registrations[0].firstName} ${selectedBooking.registrations[0].lastName}`}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Email</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.registrations[0].email}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Phone</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.registrations[0].phoneNo}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Outbound Terminal</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.registrations[0].outboundTerminal}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Outbound Flight</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.registrations[0].outboundFlightNo}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Inbound Terminal</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.registrations[0].inboundTerminal}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 sm:col-span-2">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Inbound Flight</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.registrations[0].inboundFlightNo}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Vehicle Information */}
                  {selectedBooking.vehicles && selectedBooking.vehicles.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#244c30] to-[#b7e06e] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Vehicle Information</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Registration</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.vehicles[0].vehicleRegistration}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Manufacturer</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.vehicles[0].vehicleManufacturer}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Model</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.vehicles[0].vehicleModel}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Color</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.vehicles[0].vehicleColour}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Passengers</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.vehicles[0].numberofPassengers}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Type</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.vehicles[0].type}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Package Information */}
                  {selectedBooking.package && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#244c30] to-[#b7e06e] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Package Information</h3>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                            <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Package Name</span>
                            <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.package.title}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                            <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Price</span>
                            <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.package.price}</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Description</span>
                          <p className="text-sm sm:text-base text-gray-900 mt-1">{selectedBooking.package.description}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Features</span>
                          <ul className="mt-2 space-y-1">
                            {JSON.parse(selectedBooking.package.bulletPoints || '[]').map((point, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#244c30] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm sm:text-base text-gray-900">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Booking Assignment */}
                  {selectedBooking.bookingAssignments && selectedBooking.bookingAssignments.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#244c30] to-[#b7e06e] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Assignment Information</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Assigned Employee</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.bookingAssignments[0].employee?.firstName} {selectedBooking.bookingAssignments[0].employee?.lastName}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Assignment Status</span>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{selectedBooking.bookingAssignments[0].status}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold text-gray-900 mb-2">Failed to load booking details</p>
                  <p className="text-gray-600">Please try again or contact support if the problem persists.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
