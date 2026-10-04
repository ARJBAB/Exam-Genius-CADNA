import { createElement, useMemo, useState } from "react";
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoBookmark,
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoCashOutline,
  IoFlaskOutline,
  IoGridOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoRibbonOutline,
  IoSearchOutline,
  IoSchoolOutline,
  IoTimeOutline,
  IoBookOutline,
} from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext.jsx";
import PageLayout from "../../components/shared/PageLayout.jsx";
import Card from "../../components/shared/Card.jsx";
import { MOCK_OPPORTUNITY_RESPONSE } from "../../data/mockOpportunities.js";

const CATEGORIES = [
  "All",
  "Scholarships",
  "Jobs",
  "Research",
  "Internships",
  "Exams",
  "Community",
  "Funding",
];

const CATEGORY_ICONS = {
  All: IoGridOutline,
  Scholarships: IoSchoolOutline,
  Jobs: IoBriefcaseOutline,
  Research: IoFlaskOutline,
  Internships: IoRibbonOutline,
  Exams: IoBookOutline,
  Community: IoPeopleOutline,
  Funding: IoCashOutline,
};

const EMPTY_FILTERS = {
  type: "",
  category: "All",
  location: "",
  studyOrExperience: "",
  deadline: "",
  organization: "",
};

const TRENDING_SEARCHES = [
  "STEM scholarships",
  "Remote internships",
  "Research assistant",
  "Graduate funding",
  "Entry-level jobs",
];

const PAGE_SIZE = MOCK_OPPORTUNITY_RESPONSE.pageSize;

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

const Discover = () => {
  const { darkMode } = useTheme();
  const opportunities = MOCK_OPPORTUNITY_RESPONSE.items;
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  const [activeFilters, setActiveFilters] = useState(EMPTY_FILTERS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [savedIds, setSavedIds] = useState(() => new Set());
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const filterOptions = useMemo(
    () => ({
      type: [...new Set(opportunities.map((item) => item.type))].sort(),
      location: [...new Set(opportunities.map((item) => item.location))].sort(),
      studyOrExperience: [
        ...new Set(
          opportunities.flatMap((item) => [
            item.studyLevel,
            item.experienceLevel,
          ]),
        ),
      ].sort(),
      organization: [
        ...new Set(opportunities.map((item) => item.organization.name)),
      ].sort(),
    }),
    [opportunities],
  );

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        CATEGORIES.map((category) => [
          category,
          category === "All"
            ? opportunities.length
            : opportunities.filter((item) => item.category === category).length,
        ]),
      ),
    [opportunities],
  );

  const filteredOpportunities = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return opportunities.filter((item) => {
      if (
        activeFilters.category !== "All" &&
        item.category !== activeFilters.category
      ) {
        return false;
      }
      if (activeFilters.type && item.type !== activeFilters.type) return false;
      if (
        activeFilters.location &&
        item.location !== activeFilters.location
      ) {
        return false;
      }
      if (
        activeFilters.studyOrExperience &&
        item.studyLevel !== activeFilters.studyOrExperience &&
        item.experienceLevel !== activeFilters.studyOrExperience
      ) {
        return false;
      }
      if (
        activeFilters.organization &&
        item.organization.name !== activeFilters.organization
      ) {
        return false;
      }
      if (activeFilters.deadline) {
        const daysRemaining = Math.ceil(
          (new Date(`${item.deadline}T00:00:00`).getTime() -
            new Date().setHours(0, 0, 0, 0)) /
            86400000,
        );
        if (daysRemaining < 0 || daysRemaining > Number(activeFilters.deadline)) {
          return false;
        }
      }
      if (normalizedSearch) {
        const searchableText = [
          item.title,
          item.organization.name,
          item.category,
          item.type,
          item.location,
          ...item.requirements,
        ]
          .join(" ")
          .toLowerCase();
        const searchTerms = normalizedSearch.split(/\s+/);
        if (!searchTerms.every((term) => searchableText.includes(term))) return false;
      }
      return true;
    });
  }, [activeFilters, opportunities, search]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredOpportunities.length / PAGE_SIZE),
  );
  const visibleOpportunities = filteredOpportunities.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const firstVisible = filteredOpportunities.length ? (page - 1) * PAGE_SIZE + 1 : 0;
  const lastVisible = Math.min(page * PAGE_SIZE, filteredOpportunities.length);

  const setDraftFilter = (key, value) => {
    setDraftFilters((current) => ({ ...current, [key]: value }));
  };

  const applyFilters = (event) => {
    event.preventDefault();
    setActiveFilters(draftFilters);
    setPage(1);
  };

  const resetFilters = () => {
    setDraftFilters(EMPTY_FILTERS);
    setActiveFilters(EMPTY_FILTERS);
    setSearch("");
    setPage(1);
  };

  const chooseCategory = (category) => {
    setDraftFilters((current) => ({ ...current, category }));
    setActiveFilters((current) => ({ ...current, category }));
    setPage(1);
  };

  const toggleSaved = (id) => {
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const mutedText = darkMode ? "text-slate-300" : "text-gray-600";
  const headingText = darkMode ? "text-white" : "text-gray-900";
  const fieldClass = `w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
    darkMode
      ? "border-slate-600 bg-slate-800 text-white"
      : "border-gray-200 bg-white text-gray-900"
  }`;

  const renderSelect = (label, key, options, placeholder) => (
    <label className="block">
      <span className={`mb-1.5 block text-xs font-medium ${mutedText}`}>
        {label}
      </span>
      <select
        value={draftFilters[key]}
        onChange={(event) => setDraftFilter(key, event.target.value)}
        className={fieldClass}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <PageLayout title="Discover" mainClass="px-3 pb-5 sm:px-6 lg:px-8 lg:pb-7">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-6">
          <h1 className={`text-2xl font-semibold ${headingText}`}>
            Discover opportunities
          </h1>
          <p className={`mt-1 text-sm ${mutedText}`}>
            Find scholarships, work, research, and experiences for your next step.
          </p>
        </header>

        <div className="mb-5 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const selected = activeFilters.category === category;
            const categoryIcon = CATEGORY_ICONS[category];
            return (
              <button
                key={category}
                type="button"
                onClick={() => chooseCategory(category)}
                aria-pressed={selected}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                  selected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : darkMode
                      ? "border-slate-700 bg-slate-800 text-slate-200 hover:border-blue-400"
                      : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {createElement(categoryIcon, { size: 15, "aria-hidden": true })}
                {category}
                <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] ${
                  darkMode
                    ? "bg-slate-900 text-slate-200"
                    : "bg-[#E9EBF8] text-gray-700"
                }`}>
                  {categoryCounts[category]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section className="min-w-0" aria-label="Opportunity listings">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className={`text-sm ${mutedText}`}>
                Showing <span className={`font-semibold ${headingText}`}>{filteredOpportunities.length}</span> opportunities
              </p>
              <label className="relative block w-full sm:max-w-sm">
                <span className="sr-only">Search opportunities</span>
                <IoSearchOutline
                  size={18}
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${mutedText}`}
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search opportunities..."
                  className={`${fieldClass} pl-10`}
                />
              </label>
            </div>

            {visibleOpportunities.length ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {visibleOpportunities.map((opportunity) => (
                  <Card
                    key={opportunity.id}
                    className="flex min-w-0 flex-col p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
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
                        onClick={() => toggleSaved(opportunity.id)}
                        aria-label={savedIds.has(opportunity.id) ? "Remove saved opportunity" : "Save opportunity"}
                        title={savedIds.has(opportunity.id) ? "Remove saved opportunity" : "Save opportunity"}
                        className={`shrink-0 rounded-md p-1.5 ${
                          darkMode ? "text-slate-300 hover:bg-slate-700" : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {savedIds.has(opportunity.id) ? (
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
                      onClick={() => setSelectedOpportunity(opportunity)}
                      className="mt-4 w-full rounded-lg bg-[#0C4094] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#093575]"
                    >
                      View details
                    </button>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className={`font-medium ${headingText}`}>No matching opportunities</p>
                <p className={`mt-1 text-sm ${mutedText}`}>
                  Try another category or adjust your filters.
                </p>
              </Card>
            )}

            <nav
              aria-label="Opportunity pages"
              className={`mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between ${
                darkMode ? "border-slate-700" : "border-gray-200"
              }`}
            >
              <p className={`text-xs ${mutedText}`}>
                Showing {firstVisible}–{lastVisible} of {filteredOpportunities.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                  className={`inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 ${
                    darkMode ? "border-slate-700 text-slate-200 hover:bg-slate-800" : "border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <IoArrowBackOutline size={16} aria-hidden="true" />
                  Previous
                </button>
                <span className={`px-2 text-sm ${mutedText}`}>
                  Page {page} of {pageCount}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                  disabled={page === pageCount}
                  className={`inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 ${
                    darkMode ? "border-slate-700 text-slate-200 hover:bg-slate-800" : "border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Next
                  <IoArrowForwardOutline size={16} aria-hidden="true" />
                </button>
              </div>
            </nav>
          </section>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <Card className="p-4 sm:p-5">
              <h2 className={`mb-4 text-base font-semibold ${headingText}`}>
                Filters
              </h2>
              <form onSubmit={applyFilters} className="space-y-4">
                {renderSelect("Opportunity Type", "type", filterOptions.type, "All types")}
                {renderSelect(
                  "Category",
                  "category",
                  CATEGORIES.filter((category) => category !== "All"),
                  "All categories",
                )}
                {renderSelect("Location", "location", filterOptions.location, "Any location")}
                {renderSelect(
                  "Study Level / Experience",
                  "studyOrExperience",
                  filterOptions.studyOrExperience,
                  "Any level",
                )}
                {renderSelect(
                  "Deadline",
                  "deadline",
                  [
                    { label: "Within 7 days", value: "7" },
                    { label: "Within 30 days", value: "30" },
                    { label: "Within 90 days", value: "90" },
                  ],
                  "Any deadline",
                )}
                {renderSelect(
                  "Organization",
                  "organization",
                  filterOptions.organization,
                  "Any organization",
                )}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Apply Filters
                  </button>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium ${
                      darkMode ? "border-slate-600 text-slate-200 hover:bg-slate-700" : "border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </Card>

            <Card className="p-4 sm:p-5">
              <h2 className={`mb-3 text-base font-semibold ${headingText}`}>
                Trending Searches
              </h2>
              <ul className="space-y-1">
                {TRENDING_SEARCHES.map((term, index) => (
                  <li key={term}>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch(term);
                        setPage(1);
                      }}
                      className={`w-full rounded-md px-2 py-2 text-left text-sm ${
                        darkMode ? "text-slate-300 hover:bg-slate-700 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-blue-700"
                      }`}
                    >
                      <span className={`mr-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
                        darkMode
                          ? "bg-slate-900 text-slate-200"
                          : "bg-[#E9EBF8] text-gray-700"
                      }`}>
                        {index + 1}
                      </span>
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
      </div>

      {selectedOpportunity && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedOpportunity(null);
          }}
        >
          <Card className="w-full max-w-lg p-5 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className={`text-sm ${mutedText}`}>
                  {selectedOpportunity.organization.name}
                </p>
                <h2 className={`mt-1 text-xl font-semibold ${headingText}`}>
                  {selectedOpportunity.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                aria-label="Close opportunity details"
                className={`rounded-md px-2 py-1 text-xl ${mutedText}`}
              >
                ×
              </button>
            </div>
            <p className={`mb-3 text-sm font-medium ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
              {selectedOpportunity.amount}
            </p>
            <p className={`mb-4 text-sm ${mutedText}`}>
              {selectedOpportunity.eligibility.label}
            </p>
            <h3 className={`mb-2 text-sm font-semibold ${headingText}`}>
              Requirements
            </h3>
            <ul className={`mb-5 list-inside list-disc space-y-1 text-sm ${mutedText}`}>
              {selectedOpportunity.requirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
            <p className={`text-sm ${mutedText}`}>
              Deadline: {formatDeadline(selectedOpportunity.deadline)}
            </p>
          </Card>
        </div>
      )}
    </PageLayout>
  );
};

export default Discover;
