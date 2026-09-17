import Sidebar from "./Sidebar";
import EmptyState from "./EmptyState";
import StatCard from "./StatCard";
import Header from "../../components/Layout/Header.jsx";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextDefinition.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import TimelineSection from "../../components/TimelineSection.jsx";

import { FiClock } from "react-icons/fi";
import { TbAlertTriangle } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { FaChartLine } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Safely get username
  const userName = user?.firstName || user?.name || "Instructor";
  const { darkMode, toggleDarkMode: toggleGlobalDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    myExams: 0,
    ongoingExams: 0,
    resultSummary: 0,
    malpracticeAlerts: 0
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://cadna-backend-htjq.onrender.com'}/api/instructor/dashboard`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData({
            myExams: data.myExams || 0,
            ongoingExams: data.ongoingExams || 0,
            resultSummary: data.resultSummary || 0,
            malpracticeAlerts: data.malpracticeAlerts || 0
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { title: "My Exams", value: dashboardData.myExams, icon: <TfiWrite />, color: "bg-[#EFF6FF]" },
    {
      title: "Ongoing Exams",
      value: dashboardData.ongoingExams,
      icon: <FiClock />,
      color: "bg-[#FFFBEB]",
    },
    {
      title: "Result Summary",
      value: dashboardData.resultSummary,
      icon: <FaChartLine />,
      color: "bg-[#F0FDF4]",
    },
    {
      title: "Malpractice Alert",
      value: dashboardData.malpracticeAlerts,
      icon: <TbAlertTriangle />,
      color: "bg-[#FFF5F5]",
    },
  ];

  // State management for Active vs Empty dashboard
  const hasActivity = Object.values(dashboardData).some(value => value > 0) || false;

  // FIXED: Now navigates to the correct route
  const handleCreateExam = (e) => {
    e.stopPropagation();
    navigate("/create-exam"); // CHANGED: Fixed route to match App.jsx
  };

  const toggleDarkMode = () => {
    toggleGlobalDarkMode();
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#f9fafb]"}`}>
      <Header
        onMenuToggle={() => setSidebarOpen(true)}
        title="Instructor Dashboard"
        darkMode={darkMode}
        onDarkModeToggle={toggleDarkMode}
      />

      <div className="flex pt-16 relative">
        {/* Sidebar Popup for Mobile & Tablet */}
        <div
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed inset-0 lg:static z-50
          flex lg:block
        `}
        >
          <div className="w-64 h-full relative">
            <Sidebar darkMode={darkMode} isMobile={isMobile} />

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <IoClose
                size={20}
                className={darkMode ? "text-white" : "text-gray-700"}
              />
            </button>
          </div>

          <div
            className="flex-1 lg:hidden bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 p-4 sm:p-6 overflow-y-auto w-full ${darkMode ? "bg-gray-900" : ""
            }`}
        >
          {/* Welcome Section */}
          <div className="mt-4 sm:mt-8 mb-4 sm:mb-6 flex items-start gap-3">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-[#B1CDFB]"
                }`}
            >
              <span className="text-xl sm:text-2xl">👋</span>
            </div>

            <div>
              <h2
                className={`text-lg sm:text-[24px] font-bold ${darkMode ? "text-white" : "text-[#0D0722]"
                  }`}
              >
                Hello, {userName}
              </h2>
              <p
                className={`text-xs sm:text-[14px] ${darkMode ? "text-gray-300" : "text-[#666666]"
                  }`}
              >
                Manage your assessments, analyze class performance
              </p>
            </div>
          </div>



          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} darkMode={darkMode} />
            ))}
          </div>

          {hasActivity ? (
            // Active Dashboard Content
            <>
              {/* Recent Activity Section */}
              <div className="mt-8 lg:mt-12">
                <h3
                  className={`font-Inter font-normal text-lg sm:text-[22px] ${darkMode ? "text-white" : "text-[#2E2E30]"
                    }`}
                >
                  Recent Activity
                </h3>
                {/* Add recent exams, submissions, etc. */}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 lg:mt-8">
                <div
                  onClick={handleCreateExam}
                  className={`w-full sm:w-[208px] h-auto sm:h-[210px] flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all duration-200 p-4 ${darkMode
                    ? "hover:bg-gray-800 hover:shadow-lg"
                    : "hover:bg-gray-50 hover:shadow-lg"
                    } hover:scale-[1.02]`}
                >
                  <img
                    src="/image 4.png"
                    alt="Create Exam"
                    className="w-16 h-16 sm:w-auto sm:h-auto mb-4"
                  />
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3
                      className={`font-bold font-sans text-base sm:text-[20px] ${darkMode ? "text-blue-400" : "text-[#3B82F6]"
                        }`}
                    >
                      Create New Exam
                    </h3>
                    <p
                      className={`text-xs sm:text-[14px] font-Inter font-normal ${darkMode ? "text-gray-300" : "text-[#666666]"
                        }`}
                    >
                      Start crafting your next assessment
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Empty Dashboard Content
            <>
              {/* Ready to start section */}
              <div className="mt-8 lg:mt-12">
                <h3
                  className={`font-Inter font-normal text-lg sm:text-[22px] ${darkMode ? "text-white" : "text-[#2E2E30]"
                    }`}
                >
                  Ready to start?
                </h3>
              </div>

              {/* Create Exam Section */}
              <div className="mt-6 lg:mt-8">
                <div
                  onClick={handleCreateExam}
                  className={`w-full sm:w-[208px] h-auto sm:h-[210px] flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all duration-200 p-4 ${darkMode
                    ? "hover:bg-gray-800 hover:shadow-lg"
                    : "hover:bg-gray-50 hover:shadow-lg"
                    } hover:scale-[1.02]`}
                >
                  <img
                    src="/image 4.png"
                    alt="Create Exam"
                    className="w-16 h-16 sm:w-auto sm:h-auto mb-4"
                  />
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3
                      className={`font-bold font-sans text-base sm:text-[20px] ${darkMode ? "text-blue-400" : "text-[#3B82F6]"
                        }`}
                    >
                      Create New Exam
                    </h3>
                    <p
                      className={`text-xs sm:text-[14px] font-Inter font-normal ${darkMode ? "text-gray-300" : "text-[#666666]"
                        }`}
                    >
                      Start crafting your next assessment
                    </p>
                  </div>
                </div>
              </div>

              {/* Empty State */}
              <div className="mt-6 sm:mt-8">
                <EmptyState darkMode={darkMode} />
              </div>
            </>
          )}

          <div className="mt-8 lg:mt-12">
            <TimelineSection />
          </div>
        </div>
      </div>
    </div>
  );
}