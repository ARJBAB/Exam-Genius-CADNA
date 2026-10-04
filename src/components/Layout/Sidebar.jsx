import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoCompassOutline,
  IoDocumentTextOutline,
  IoSettingsOutline,
  IoBookmarkOutline,
  IoAddCircleOutline,
  IoPersonOutline,
  IoHelpCircleOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoCardOutline,
  IoRibbonOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextDefinition.js";

const Sidebar = ({ isOpen, userRole = "student", onClose, darkMode }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const dm =
    darkMode ??
    (() => {
      try {
        return (
          JSON.parse(localStorage.getItem("userPrefs") || "{}").darkMode ??
          false
        );
      } catch {
        return false;
      }
    })();
  const studentLightMode = userRole === "student" && !dm;

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const studentLinks = [
    { to: "/student", icon: IoHomeOutline, label: "Dashboard" },
    { to: "/student/discover", icon: IoCompassOutline, label: "Discover" },
    { to: "/student/applications", icon: IoDocumentTextOutline, label: "Applications" },
    { to: "/student/saved", icon: IoBookmarkOutline, label: "Saved" },
    { to: "/student/community", icon: IoPeopleOutline, label: "Community" },
    { to: "/student/post", icon: IoAddCircleOutline, label: "Post" },
    { divider: true },
    { to: "/student/edit-profile", icon: IoPersonOutline, label: "Profile" },
    { to: "/student/settings", icon: IoSettingsOutline, label: "Settings" },
    { to: "/student/ContactSupport", icon: IoHelpCircleOutline, label: "Help & Support" },
  ];

  const adminLinks = [
    { to: "/admin", icon: IoHomeOutline, label: "Dashboard" },
    {
      icon: IoPeopleOutline,
      label: "User Management",
      children: [
        { to: "/admin/students", label: "Students" },
        { to: "/admin/instructors", label: "Instructors" },
      ],
    },
    {
      icon: IoShieldCheckmarkOutline,
      label: "Admin Management",
      children: [
        { to: "/admin/management/users", label: "Users" },
        { to: "/admin/management/roles", label: "Roles" },
      ],
    },
    {
      to: "/admin/proctoring",
      icon: IoEyeOutline,
      label: "AI - Proctoring Reports",
    },
    {
      icon: IoCardOutline,
      label: "Payments & Subscription",
      children: [{ to: "/admin/payments", label: "Overview" }],
    },
    {
      to: "/admin/certification",
      icon: IoRibbonOutline,
      label: "Certification & Verification",
    },
    { to: "/admin/settings", icon: IoSettingsOutline, label: "Settings" },
  ];

  const links = userRole === "admin" ? adminLinks : studentLinks;

  const isChildActive = (children) =>
    children.some(
      (child) =>
        location.pathname === child.to ||
        location.pathname.startsWith(child.to),
    );

  const [openDropdowns, setOpenDropdowns] = useState(() => {
    const initial = new Set();
    links.forEach((item) => {
      if (item.children && isChildActive(item.children)) {
        initial.add(item.label);
      }
    });
    return initial;
  });

  const toggleDropdown = (label) => {
    setOpenDropdowns((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  // Mobile open background: dark or light
  const mobileOpenBg = studentLightMode
    ? "bg-[#E9EBF8] border-[#d7dbee]"
    : dm
      ? "bg-slate-900 border-slate-800"
      : "lg:bg-blue-500 lg:border-blue-600";
  const mobileTextBase = dm ? "text-gray-200" : "text-gray-700";
  const mobileHover = dm
    ? "hover:bg-slate-800 hover:text-white"
    : "hover:bg-gray-100 hover:text-gray-900";
  const mobileActive = dm
    ? "bg-indigo-600 text-white"
    : "bg-blue-100 text-blue-600";

  // Desktop background: navy in dark mode, blue in light mode
  const desktopBg = studentLightMode
    ? "lg:bg-[#E9EBF8] lg:border-[#d7dbee]"
    : dm
      ? "lg:bg-slate-900 lg:border-slate-800"
      : "lg:bg-blue-500 lg:border-blue-600";
  const desktopHover = dm
    ? "hover:bg-slate-800 hover:text-white"
    : studentLightMode
      ? "hover:bg-[#dce0f3] hover:text-gray-900"
      : "hover:bg-black hover:bg-opacity-20 hover:text-white";
  const desktopActive = dm
    ? "bg-indigo-600 text-white"
    : studentLightMode
      ? "bg-[#dce0f3] text-blue-700"
      : "bg-black bg-opacity-30 text-white";

  const closeOnMobile = () => window.innerWidth < 1024 && onClose && onClose();

  const linkClassName = (active) =>
    `flex items-center space-x-3 px-6 py-3 transition-colors ${
      active
        ? isOpen
          ? mobileActive
          : desktopActive
        : isOpen
          ? `${mobileTextBase} ${mobileHover}`
          : `${studentLightMode ? "text-gray-700" : "text-white text-opacity-80"} ${desktopHover}`
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 bottom-0 left-0 z-50
          shadow-lg border-r
          transition-transform duration-300 ease-in-out
          w-60
          ${
            isOpen
              ? `translate-x-0 ${mobileOpenBg}`
              : `-translate-x-full lg:translate-x-0 ${desktopBg}`
          }
        `}
      >
        <nav className="space-y-2 flex-1 overflow-y-auto h-full flex flex-col pt-4">
          <div className="flex-1">
            {links.map((item) => {
              if (item.divider) {
                return (
                  <hr
                    key="student-navigation-divider"
                    className={`my-3 border-t ${
                      dm ? "border-slate-700" : "border-[#cbd0e6]"
                    }`}
                  />
                );
              }

              if (item.children) {
                const Icon = item.icon;
                const expanded = openDropdowns.has(item.label);
                const active = isChildActive(item.children);
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      className={`w-full ${linkClassName(active)} justify-between`}
                    >
                      <span className="flex items-center space-x-3">
                        <Icon size={20} />
                        <span className="text-base font-medium">{item.label}</span>
                      </span>
                      <IoChevronDownOutline
                        size={16}
                        className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {expanded && (
                      <div className="space-y-1">
                        {item.label === "User Management" && (
                          <fieldset className="space-y-1">
                            <legend className="sr-only">User Management</legend>
                            {item.children.map((child) => {
                              const childActive =
                                location.pathname === child.to ||
                                location.pathname.startsWith(child.to);
                              return (
                                <label
                                  key={child.to}
                                  className={`flex items-center space-x-3 pl-14 pr-6 py-2 text-base transition-colors cursor-pointer ${
                                    childActive
                                      ? isOpen
                                        ? mobileActive
                                        : desktopActive
                                      : isOpen
                                        ? `${mobileTextBase} ${mobileHover}`
                                        : `text-white text-opacity-80 ${desktopHover}`
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="user-management"
                                    value={child.to}
                                    checked={childActive}
                                    onChange={() => {
                                      navigate(child.to);
                                      closeOnMobile();
                                    }}
                                    className="h-2 w-2 shrink-0 accent-blue-600"
                                  />
                                  <span>{child.label}</span>
                                </label>
                              );
                            })}
                          </fieldset>
                        )}
                        {item.children.map((child) => {
                          if (item.label === "User Management") return null;
                          const childActive =
                            location.pathname === child.to ||
                            location.pathname.startsWith(child.to);
                          return (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              onClick={closeOnMobile}
                              className={`block pl-14 pr-6 py-2 text-base transition-colors ${
                                childActive
                                  ? isOpen
                                    ? mobileActive
                                    : desktopActive
                                  : isOpen
                                    ? `${mobileTextBase} ${mobileHover}`
                                    : `text-white text-opacity-80 ${desktopHover}`
                              }`}
                            >
                              {child.label}
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const { to, icon: Icon, label } = item;
              const isActive =
                location.pathname === to ||
                (to !== `/${userRole}` && location.pathname.startsWith(to));
              return (
                <NavLink
                  key={to}
                  to={to}
                  onClick={closeOnMobile}
                  className={linkClassName(isActive)}
                >
                  <Icon size={20} />
                  <span className="text-base font-medium">{label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Logout at bottom */}
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-3 px-6 py-3 transition-colors mt-auto ${
              isOpen
                ? `${mobileTextBase} ${mobileHover}`
                : `${studentLightMode ? "text-gray-700" : "text-white text-opacity-80"} ${desktopHover}`
            }`}
          >
            <IoLogOutOutline size={20} />
            <span className="text-base font-medium">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
