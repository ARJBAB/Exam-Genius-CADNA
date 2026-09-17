import { useState, useContext } from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import { AuthContext } from "../../context/AuthContextDefinition.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import TimelineSection from "../../components/TimelineSection.jsx";
import { IoPeopleOutline, IoDocumentTextOutline, IoStatsChartOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const ActivityItem = ({ activity }) => {
  const getActivityColor = (type) => {
    const colors = {
      exam: 'bg-blue-500',
      user: 'bg-green-500', 
      completion: 'bg-yellow-500',
      result: 'bg-purple-500'
    };
    return colors[type] || 'bg-gray-500';
  };
  
  return (
    <div className="flex items-center space-x-4">
      <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
        <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useTheme();
  
  const stats = [
    { label: "Total Students", value: "1,247", icon: IoPeopleOutline, color: "bg-blue-500" },
    { label: "Active Exams", value: "23", icon: IoDocumentTextOutline, color: "bg-green-500" },
    { label: "Completed Today", value: "156", icon: IoCheckmarkCircleOutline, color: "bg-yellow-500" },
    { label: "Success Rate", value: "87%", icon: IoStatsChartOutline, color: "bg-purple-500" }
  ];

  const recentActivity = [
    { action: "New exam created", user: "Dr. Smith", time: "2 hours ago", type: "exam" },
    { action: "Student registered", user: "Jane Doe", time: "3 hours ago", type: "user" },
    { action: "Exam completed", user: "John Smith", time: "4 hours ago", type: "completion" },
    { action: "Results published", user: "Math Dept", time: "5 hours ago", type: "result" }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        title="Dashboard"
        darkMode={darkMode}
        onDarkModeToggle={toggleDarkMode}
      />
      <Sidebar isOpen={sidebarOpen} userRole="admin" onClose={() => setSidebarOpen(false)} darkMode={darkMode} />
      
      <main className="lg:ml-64 p-4 sm:p-6 pt-24">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl xs:text-2xl sm:text-3xl font-Poppins font-bold text-gray-900 mb-2 leading-tight">
              Hello, {user?.firstName || user?.name || "Admin"}!
            </h1>
            <p className="text-gray-600 text-sm xs:text-base">Monitor and manage your examination platform</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
                <div className="flex items-center">
                  <div className={`${stat.color} p-2 sm:p-3 rounded-lg`}>
                    <stat.icon className="text-white" size={20} />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.label}</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 sm:p-6 border-b">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {recentActivity.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 sm:p-6 border-b">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  <button 
                    type="button"
                    onClick={() => console.log('Create exam')}
                    className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900">Create New Exam</h3>
                    <p className="text-sm text-gray-500">Set up a new examination</p>
                  </button>
                  <button 
                    type="button"
                    onClick={() => console.log('Manage students')}
                    className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900">Manage Students</h3>
                    <p className="text-sm text-gray-500">View and manage student accounts</p>
                  </button>
                  <button 
                    type="button"
                    onClick={() => console.log('View analytics')}
                    className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900">View Analytics</h3>
                    <p className="text-sm text-gray-500">Check performance metrics</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <TimelineSection />
          </div>
        </main>
    </div>
  );
};

export default AdminDashboard;