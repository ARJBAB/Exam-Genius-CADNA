import { useNavigate } from "react-router-dom";
import {
  IoBookmark,
  IoBookmarkOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext.jsx";
import Card from "./Card.jsx";

const formatDeadline = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getOrganizationInitials = (organization) =>
  organization
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const OpportunityCard = ({ opportunity, isSaved, onToggleSaved }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const mutedText = darkMode ? "text-slate-300" : "text-gray-600";
  const headingText = darkMode ? "text-white" : "text-gray-900";

  return (
    <Card className="flex min-w-0 flex-col p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {opportunity.organization.logo ? (
            <img
              src={opportunity.organization.logo}
              alt=""
              className="h-10 w-10 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
              darkMode ? "bg-slate-700 text-blue-200" : "bg-blue-50 text-blue-700"
            }`}>
              {getOrganizationInitials(opportunity.organization.name)}
            </span>
          )}
          <span className={`truncate text-xs font-medium ${mutedText}`}>
            {opportunity.organization.name}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onToggleSaved(opportunity.id)}
          aria-label={isSaved ? "Remove saved opportunity" : "Save opportunity"}
          title={isSaved ? "Remove saved opportunity" : "Save opportunity"}
          className={`shrink-0 rounded-md p-1.5 ${
            darkMode ? "text-slate-300 hover:bg-slate-700" : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {isSaved ? (
            <IoBookmark size={18} aria-hidden="true" />
          ) : (
            <IoBookmarkOutline size={18} aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="mb-2 flex flex-wrap gap-1.5">
        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
          darkMode ? "bg-indigo-400/10 text-indigo-200" : "bg-indigo-50 text-indigo-700"
        }`}>
          {opportunity.category}
        </span>
        <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${
          opportunity.eligibility.isOpen
            ? darkMode
              ? "bg-emerald-400/10 text-emerald-300"
              : "bg-emerald-50 text-emerald-700"
            : darkMode
              ? "bg-amber-400/10 text-amber-200"
              : "bg-amber-50 text-amber-800"
        }`}>
          {opportunity.eligibility.label}
        </span>
      </div>

      <h2 className={`mb-2 line-clamp-2 min-h-10 text-sm font-semibold ${headingText}`}>
        {opportunity.title}
      </h2>
      <p className={`mb-3 text-sm font-semibold ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
        {opportunity.amount}
      </p>

      <ul className={`mb-4 space-y-1 text-xs ${mutedText}`}>
        {opportunity.requirements.slice(0, 2).map((requirement) => (
          <li key={requirement} className="truncate">
            <span className="mr-1.5 text-blue-500">•</span>
            {requirement}
          </li>
        ))}
      </ul>

      <div className={`mt-auto space-y-2 border-t pt-3 text-xs ${
        darkMode ? "border-slate-700 text-slate-300" : "border-gray-100 text-gray-600"
      }`}>
        <p className="flex items-center gap-1.5">
          <IoTimeOutline size={15} aria-hidden="true" />
          Deadline: {formatDeadline(opportunity.deadline)}
        </p>
        <p className="flex items-center gap-1.5">
          <IoPeopleOutline size={15} aria-hidden="true" />
          {opportunity.applicantCount} applicants
        </p>
        <p className="flex items-center gap-1.5">
          <IoLocationOutline size={15} aria-hidden="true" />
          {opportunity.location}
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate(`/student/discover/${opportunity.id}/apply`)}
        className="mt-4 w-full rounded-lg bg-[#0C4094] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#093575]"
      >
        Apply Now
      </button>
    </Card>
  );
};

export default OpportunityCard;
