import { NavLink, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { TfiWrite } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContextDefinition";

export default function Sidebar({ darkMode = false, isMobile = false }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <RxDashboard />, link: "/instructor" },
    {
      name: "Create Exam",
      icon: <TfiWrite />,
      link: "/create-exam",
    },
  ];

  // Enhanced logout handler with confirmation
  const handleLogout = () => {
    logout();
    navigate("/signin");
    setShowLogoutConfirm(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div
      className={`w-64 h-full flex flex-col ${
        isMobile
          ? darkMode
            ? "bg-slate-900 text-white"
            : "bg-white text-blue-600"
          : darkMode
          ? "bg-slate-900 text-white"
          : "bg-[#3B82F6] text-white"
      }`}
    >
      {/* Navigation Menu */}
      <nav className="flex-1 px-4 pt-6 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.link}
            onClick={() => {
              // Close mobile sidebar when item is clicked (for better UX)
              if (isMobile) {
                // You might want to pass a callback to close sidebar
                console.log("Close mobile sidebar");
              }
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 ${
                isActive
                  ? isMobile
                    ? darkMode
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-blue-100 text-blue-600 shadow-md"
                    : darkMode
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white/25 shadow-lg"
                  : isMobile
                  ? darkMode
                    ? "hover:bg-slate-800 hover:shadow-md"
                    : "hover:bg-blue-50 hover:shadow-md"
                  : darkMode
                  ? "hover:bg-slate-800 hover:shadow-md"
                  : "hover:bg-white/10 hover:shadow-md"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleLogoutClick}
          className={`flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-all duration-200 w-full ${
            isMobile
              ? darkMode
                ? "hover:bg-slate-800 text-white hover:shadow-md"
                : "hover:bg-blue-50 text-blue-600 hover:shadow-md"
              : darkMode
              ? "hover:bg-slate-800 text-white hover:shadow-md"
              : "hover:bg-white/10 text-white hover:shadow-md"
          }`}
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg shadow-xl max-w-sm w-full mx-4 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Confirm Logout
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelLogout}
                className={`px-4 py-2 rounded-md transition-colors ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
