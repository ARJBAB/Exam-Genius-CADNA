import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  IoNotificationsOutline,
  IoPersonOutline,
  IoMenuOutline,
  IoSearchOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextDefinition.js";
import LogoLink from "../LogoLink.jsx";

const Header = ({
  onMenuToggle,
  title,
  showSearch = false,
  darkMode,
  onDarkModeToggle,
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);

  const userName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.name ||
    "User";
  const userInitials = userName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  const userRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 shadow-sm border-b px-3 sm:px-4 lg:px-6 py-3 ${
      darkMode 
        ? "bg-gray-800 border-gray-700" 
        : "bg-white border-gray-200"
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center min-w-0 flex-1">
          <button
            onClick={onMenuToggle}
            className={`lg:hidden p-2 rounded-md flex-shrink-0 mr-3 ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <IoMenuOutline size={20} />
          </button>
          <div className="hidden lg:flex items-center">
            <LogoLink className="h-8 flex-shrink-0" alt="Exam Genius" />
          </div>
          {showSearch ? (
            <div className="min-w-0 flex-1 lg:ml-40">
              <div className="relative w-full max-w-[652px]">
                <IoSearchOutline
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  aria-label="Search opportunities, keywords, or organizations"
                  placeholder="Search opportunities, keywords, or organizations..."
                  className={`w-full rounded-md border py-2 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    darkMode
                      ? "border-slate-800 bg-slate-900 text-white placeholder:text-gray-300"
                      : "border-[#d7dbee] bg-[#E9EBF8] text-gray-900"
                  }`}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="lg:hidden">
                <h1 className={`text-lg font-Poppins font-semibold ${
                  darkMode ? "text-white" : "text-[#302711]"
                }`}>
                  {title || "Dashboard"}
                </h1>
              </div>
              <div className="hidden lg:block" style={{ paddingLeft: "10rem" }}>
                <h1 className={`text-lg font-Poppins font-semibold ${
                  darkMode ? "text-white" : "text-[#302711]"
                }`}>
                  {title || "Dashboard"}
                </h1>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <button className={`p-2 rounded-full border relative ${
            darkMode 
              ? "border-gray-600 hover:bg-gray-700 text-white" 
              : "border-gray-300 hover:bg-gray-100 text-gray-700"
          }`}>
            <IoNotificationsOutline size={20} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1 -translate-y-1">
              0
            </span>
          </button>

          {onDarkModeToggle && (
            <button
              onClick={onDarkModeToggle}
              className={`p-2 rounded-full border ${
                darkMode 
                  ? "border-gray-600 hover:bg-gray-700 text-white" 
                  : "border-gray-300 hover:bg-gray-100 text-gray-700"
              }`}
            >
              {darkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
            </button>
          )}

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowProfile((open) => !open)}
              aria-expanded={showProfile}
              aria-haspopup="menu"
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors sm:gap-3 sm:px-3 ${
                darkMode 
                  ? "hover:bg-gray-700 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {user?.avatarUrl && !avatarLoadFailed ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  onError={() => setAvatarLoadFailed(true)}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  darkMode ? "bg-slate-700 text-blue-200" : "bg-blue-100 text-blue-700"
                }`}>
                  {userInitials || <IoPersonOutline size={18} aria-hidden="true" />}
                </span>
              )}
              <span className="min-w-0">
                <span className="block max-w-20 truncate text-xs font-semibold sm:max-w-36 sm:text-sm">
                  {userName}
                </span>
                {userRole && (
                  <span className={`block text-[10px] sm:text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {userRole}
                  </span>
                )}
              </span>
              <IoChevronDownOutline
                size={16}
                className={`shrink-0 transition-transform ${showProfile ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {showProfile && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg border z-50 ${
                darkMode 
                  ? "bg-gray-800 border-gray-700" 
                  : "bg-white border-gray-200"
              }`}>
                <div className="py-1" role="menu">
                  <button
                    type="button"
                    onClick={handleLogout}
                    role="menuitem"
                    className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;