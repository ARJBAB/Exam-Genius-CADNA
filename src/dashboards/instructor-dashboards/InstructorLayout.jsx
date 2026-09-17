import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextDefinition.js";
import Sidebar from "./Sidebar";
import { GoMoon } from "react-icons/go";
import { PiBellThin } from "react-icons/pi";
import { LuUser } from "react-icons/lu";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import LogoLink from "../../components/LogoLink.jsx";

export default function InstructorLayout({
  children,
  title,
  darkMode: externalDarkMode,
  onDarkModeToggle,
}) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Use external dark mode if provided, otherwise manage locally
  const [localDarkMode, setLocalDarkMode] = useState(false);
  const darkMode =
    externalDarkMode !== undefined ? externalDarkMode : localDarkMode;

  const toggleDarkMode = (e) => {
    e?.stopPropagation();
    if (onDarkModeToggle) {
      onDarkModeToggle(!darkMode);
    } else {
      setLocalDarkMode(!darkMode);
    }

    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowUserMenu(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const handleUserProfile = (e) => {
    e.stopPropagation();
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // Safely get username
  const userName = user?.firstName || user?.name || "Instructor";

  return (
    <div
      className={`h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-[#f9fafb]"
      }`}
    >
      {/* Header */}
      <div
        className={`border-b ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } px-4 sm:px-6 py-4 flex items-center justify-between gap-4 relative`}
      >
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-24 flex-1 min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
          >
            <HiMenu
              size={24}
              className={darkMode ? "text-white" : "text-gray-700"}
            />
          </button>

          <LogoLink className="w-16 sm:w-20 lg:w-[120px] flex-shrink-0" alt="Logo" />

          <h1
            className={`font-Poppins text-lg sm:text-xl lg:text-[32px] font-bold ${
              darkMode ? "text-white" : "text-[#2E2E30]"
            } truncate`}
          >
            {title}
          </h1>
        </div>

        {/* Icons with Dropdowns */}
        <span className="flex gap-4 sm:gap-8 flex-shrink-0">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <GoMoon size={20} />
          </button>

          {/* Notifications with Dropdown */}
          <div className="relative">
            <button
              onClick={handleNotifications}
              className={`p-2 rounded-lg relative ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <PiBellThin size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  
              </span>
            </button>

            {showNotifications && (
              <div
                className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-50 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className="p-4">
                  <h3
                    className={`font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Notifications
                  </h3>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <p>No new notifications</p>
                    <p className="text-xs mt-2">
                      Student submissions will appear here
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu with Dropdown */}
          <div className="relative">
            <button
              onClick={handleUserProfile}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <LuUser size={20} />
            </button>

            {showUserMenu && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className="p-2">
                  <div
                    className={`px-3 py-2 text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Signed in as <strong>{userName}</strong>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      darkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </span>
      </div>

      <div className="flex flex-1 relative">
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
          className={`flex-1 p-4 sm:p-6 overflow-y-auto w-full ${
            darkMode ? "bg-gray-900" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
