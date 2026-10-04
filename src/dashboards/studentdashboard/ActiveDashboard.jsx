import { createElement, useContext, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoArrowForwardOutline,
  IoBookmarkOutline,
  IoBookOutline,
  IoBriefcaseOutline,
  IoEllipsisVertical,
  IoFlaskOutline,
  IoGiftOutline,
  IoPeopleOutline,
  IoRibbonOutline,
  IoShareSocialOutline,
  IoDocumentTextOutline,
  IoNotificationsOutline,
  IoSparklesOutline,
  IoSchoolOutline,
  IoBulbOutline,
} from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext.jsx";
import { AuthContext } from "../../context/AuthContextDefinition.js";
import { Card } from "../../components/shared";

// ─────────────────────────────────────────────
//  Extracted sub-components with React.memo
// ─────────────────────────────────────────────

// Mock category counts; replace with opportunity API data when available.
const TRENDING_CATEGORIES = [
  { label: "Scholarships", count: 24, icon: IoSchoolOutline, color: "bg-blue-50 text-blue-700", route: "/student/discover" },
  { label: "Exams", count: 12, icon: IoBookOutline, color: "bg-violet-50 text-violet-700", route: "/student/exams" },
  { label: "Jobs", count: 18, icon: IoBriefcaseOutline, color: "bg-emerald-50 text-emerald-700", route: "/student/discover" },
  { label: "Research", count: 9, icon: IoFlaskOutline, color: "bg-amber-50 text-amber-700", route: "/student/discover" },
  { label: "Internships", count: 15, icon: IoRibbonOutline, color: "bg-rose-50 text-rose-700", route: "/student/discover" },
  { label: "Community", count: 7, icon: IoPeopleOutline, color: "bg-cyan-50 text-cyan-700", route: "/student/community" },
];

// Mock API-shaped applications; replace with application-service data later.
const MOCK_CONTINUE_APPLICATIONS = [
  {
    id: "app-001",
    title: "Future Leaders Scholarship",
    institution: { name: "Cadna Education Foundation" },
    progress: { percentage: 65, completedSteps: 2, totalSteps: 3 },
    dueDate: "2026-11-15",
  },
  {
    id: "app-002",
    title: "Graduate Research Fellowship",
    institution: { name: "Westbridge University" },
    progress: { percentage: 40, completedSteps: 2, totalSteps: 5 },
    dueDate: "2026-12-01",
  },
];

// Mock API-shaped saved items; replace with saved-items service data later.
const MOCK_SAVED_ITEMS = [
  {
    id: "saved-001",
    title: "Global Scholars Award",
    organization: "Bright Futures Foundation",
    category: "Scholarship",
    savedAt: "2026-10-01",
  },
  {
    id: "saved-002",
    title: "Data Science Certification Exam",
    organization: "Exam Genius",
    category: "Exam",
    savedAt: "2026-09-28",
  },
  {
    id: "saved-003",
    title: "Undergraduate Research Assistant",
    organization: "Westbridge University",
    category: "Research",
    savedAt: "2026-09-25",
  },
  {
    id: "saved-004",
    title: "Summer Product Internship",
    organization: "Northstar Labs",
    category: "Internship",
    savedAt: "2026-09-20",
  },
];

// Static recommendation content; replace with personalized API results later.
const MOCK_PERSONALIZED_ITEMS = [
  { id: "rec-001", title: "Women in STEM Scholarship", organization: "Northstar Foundation", category: "Scholarship", icon: IoSchoolOutline },
  { id: "rec-002", title: "Frontend Developer Internship", organization: "Bright Labs", category: "Internship", icon: IoRibbonOutline },
  { id: "rec-003", title: "Research Methods Exam", organization: "Exam Genius", category: "Exam", icon: IoBookOutline },
  { id: "rec-004", title: "Community Mentor Program", organization: "Cadna Network", category: "Community", icon: IoPeopleOutline },
];

// Static example notifications; replace with notification-service data later.
const MOCK_NOTIFICATIONS = [
  { id: "notice-001", title: "Application reminder", message: "Finish your Future Leaders Scholarship application.", time: "2 hours ago", icon: IoDocumentTextOutline },
  { id: "notice-002", title: "New opportunity", message: "A new internship matching your interests is available.", time: "Yesterday", icon: IoSparklesOutline },
  { id: "notice-003", title: "Exam update", message: "Your upcoming exam schedule has been updated.", time: "2 days ago", icon: IoNotificationsOutline },
];

const QUICK_ACTIONS = [
  { label: "Scan Document", icon: IoDocumentTextOutline },
  { label: "Share Opportunity", icon: IoShareSocialOutline },
  { label: "Refer & Earn", icon: IoGiftOutline },
  { label: "Explore Interest", icon: IoBulbOutline },
];

const WELCOME_IMAGE = "/welcome.png";

// ─────────────────────────────────────────────
// Helpers — defined outside component so they
// are not recreated on every render
// ─────────────────────────────────────────────
const formatDate = (dateString) => {
  if (!dateString) return "Not scheduled";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
};

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
const ActiveDashboard = memo(() => {
  const { darkMode } = useTheme();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [actionToast, setActionToast] = useState("");

  useEffect(() => {
    if (!actionToast) return undefined;
    const timeoutId = window.setTimeout(() => setActionToast(""), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [actionToast]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} px-4 sm:px-6 lg:px-8 py-6`}>
      <div className="mx-auto grid w-full max-w-[1024px] grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]">
      <div className="w-full min-w-0">

      {/* Greeting */}
      <div
        className="relative mb-8 h-[201px] w-full max-w-[667px] overflow-hidden rounded-[10px] bg-[#3B82F6] px-6 py-8 shadow-sm sm:px-8 sm:py-10"
      >
        <img
          src={WELCOME_IMAGE}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-auto object-contain sm:block"
        />
        <div className="relative z-10 w-full">
          <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
            Welcome back, {user?.firstName || "Student"}!
          </h1>
          <p className="mb-4 w-[331px] max-w-full text-sm text-white/90">
            Discover and apply to the best scholarships, jobs, internships, and
            more, all in one place.
          </p>
          <button
            type="button"
            onClick={() => navigate("/student/discover")}
            className="flex w-[163px] max-w-full flex-nowrap items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#0C4094] px-4 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-[#093575]"
          >
            <span>Explore Opportunities</span>
            <IoArrowForwardOutline size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mock category cards; counts will come from opportunity data later. */}
      <section className="mb-8" aria-labelledby="trending-opportunities-heading">
        <h2
          id="trending-opportunities-heading"
          className={`mb-4 text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Trending Opportunities
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TRENDING_CATEGORIES.map(({ label, count, icon, color, route }) => (
            <button
              key={label}
              type="button"
              onClick={() => navigate(route)}
              className={`flex min-h-28 flex-col items-start rounded-xl p-4 text-left transition-transform hover:-translate-y-0.5 ${darkMode ? "bg-slate-800 text-gray-100 hover:bg-slate-700" : color}`}
            >
              {createElement(icon, { size: 22, "aria-hidden": true })}
              <span className="mt-3 font-semibold">{label}</span>
              <span className={`mt-1 text-xs ${darkMode ? "text-gray-300" : "opacity-75"}`}>
                {count} opportunities
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8" aria-labelledby="continue-applications-heading">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2
            id="continue-applications-heading"
            className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Continue Applications
          </h2>
          <button
            type="button"
            onClick={() => navigate("/student/applications")}
            className={`flex shrink-0 items-center gap-1 text-sm font-medium ${
              darkMode ? "text-blue-300 hover:text-blue-200" : "text-blue-700 hover:text-blue-800"
            }`}
          >
            View all
            <IoArrowForwardOutline size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {MOCK_CONTINUE_APPLICATIONS.map((application) => (
            <div key={application.id} className="space-y-3">
              <Card className="p-4">
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div>
                    <p className={`mb-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {application.institution.name}
                    </p>
                    <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {application.title}
                    </h3>
                  </div>
                  <IoEllipsisVertical
                    size={18}
                    className={`shrink-0 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    {application.progress.completedSteps} of {application.progress.totalSteps} steps
                  </span>
                  <span className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                    {application.progress.percentage}%
                  </span>
                </div>
                <div className={`mb-3 h-2 rounded-full ${darkMode ? "bg-slate-700" : "bg-gray-100"}`}>
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${application.progress.percentage}%` }}
                  />
                </div>
                <p className={`mb-4 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Due {formatDate(application.dueDate)}
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/student/applications")}
                  className="rounded-md bg-[#0C4094] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#093575]"
                >
                  Continue
                </button>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8" aria-labelledby="saved-for-later-heading">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2
            id="saved-for-later-heading"
            className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Saved for Later
          </h2>
          <button
            type="button"
            onClick={() => navigate("/student/saved")}
            className={`flex shrink-0 items-center gap-1 text-sm font-medium ${
              darkMode ? "text-blue-300 hover:text-blue-200" : "text-blue-700 hover:text-blue-800"
            }`}
          >
            View all
            <IoArrowForwardOutline size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {MOCK_SAVED_ITEMS.map((item) => (
            <Card key={item.id} className="min-w-0 p-3">
              <div className="mb-2 flex items-start justify-between gap-1">
                <div className={`rounded-lg p-2 ${
                  darkMode ? "bg-slate-700 text-blue-300" : "bg-blue-50 text-blue-700"
                }`}>
                  <IoBookmarkOutline size={18} aria-hidden="true" />
                </div>
                <span className={`rounded-full px-1.5 py-1 text-[10px] ${
                  darkMode ? "bg-slate-700 text-gray-300" : "bg-gray-100 text-gray-600"
                }`}>
                  {item.category}
                </span>
              </div>
              <h3 className={`mb-1 break-words text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {item.title}
              </h3>
              <p className={`mb-3 break-words text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {item.organization}
              </p>
              <div className="flex flex-col items-start gap-1">
                <span className={`text-[10px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                  Saved {new Date(item.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <button
                  type="button"
                  onClick={() => navigate("/student/saved")}
                  className={`text-xs font-medium ${
                    darkMode ? "text-blue-300 hover:text-blue-200" : "text-blue-700 hover:text-blue-800"
                  }`}
                >
                  View
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      </div>
      <aside className="w-full space-y-6 xl:sticky xl:top-24">
        <section aria-labelledby="personalized-heading">
          <h2
            id="personalized-heading"
            className={`mb-4 text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Personalized for you
          </h2>
          <Card className="p-4">
            <div className="grid grid-cols-4 gap-1">
              {MOCK_PERSONALIZED_ITEMS.map(({ icon, ...item }) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate("/student/discover")}
                  className={`flex min-w-0 flex-col items-center gap-2 rounded-lg p-1 text-center transition-colors ${
                    darkMode ? "text-gray-200 hover:bg-slate-700" : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                    darkMode
                      ? "border-slate-700 bg-slate-900 text-blue-300"
                      : "border-[#d7dbee] bg-[#E9EBF8] text-blue-700"
                  }`}>
                    {createElement(icon, { size: 20, "aria-hidden": true })}
                  </span>
                  <span className={`line-clamp-2 text-xs font-semibold leading-4 ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}>
                    {item.title}
                  </span>
                  <span className={`line-clamp-1 text-[10px] ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {item.organization}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </section>

        <section aria-labelledby="quick-actions-heading">
          <Card className="p-4">
            <h2
              id="quick-actions-heading"
              className={`mb-4 text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Quick Actions
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {QUICK_ACTIONS.map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActionToast(`${label} — coming soon`)}
                  className={`flex min-w-0 flex-col items-center gap-2 rounded-lg p-1 text-center transition-colors ${
                    darkMode ? "hover:bg-slate-700" : "hover:bg-gray-50"
                  }`}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                    darkMode
                      ? "border-slate-600 text-blue-300"
                      : "border-gray-300 text-blue-700"
                  }`}>
                    {createElement(icon, { size: 20, "aria-hidden": true })}
                  </span>
                  <span className={`text-xs leading-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                    {label.split(" ").map((word) => (
                      <span key={word} className="block">{word}</span>
                    ))}
                  </span>
                </button>
              ))}
            </div>
            {actionToast && (
              <p
                role="status"
                className={`mt-3 rounded-md px-3 py-2 text-xs ${
                  darkMode ? "bg-slate-700 text-gray-100" : "bg-blue-50 text-blue-800"
                }`}
              >
                {actionToast}
              </p>
            )}
          </Card>
        </section>

        <section aria-labelledby="notifications-heading">
          <h2
            id="notifications-heading"
            className={`mb-4 text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Notifications
          </h2>
          <Card className="p-4">
            <ul className="space-y-4">
              {MOCK_NOTIFICATIONS.map(({ icon, ...notification }) => (
                <li
                  key={notification.id}
                  className={`border-b pb-3 last:border-b-0 last:pb-0 ${
                    darkMode ? "border-slate-700" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {createElement(icon, {
                      size: 18,
                      className: `mt-0.5 shrink-0 ${darkMode ? "text-blue-300" : "text-blue-700"}`,
                      "aria-hidden": true,
                    })}
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                        {notification.title}
                      </p>
                      <p className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {notification.message}
                      </p>
                      <p className={`mt-2 text-[10px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </aside>
      </div>
    </div>
  );
});

ActiveDashboard.displayName = "ActiveDashboard";

export default ActiveDashboard;
