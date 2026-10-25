import { Link } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext.jsx";
import Card from "../../components/shared/Card.jsx";
import OpportunityCard from "../../components/shared/OpportunityCard.jsx";
import PageLayout from "../../components/shared/PageLayout.jsx";
import { MOCK_OPPORTUNITY_RESPONSE } from "../../data/mockOpportunities.js";
import { useSavedOpportunities } from "../../hooks/useSavedOpportunities.js";

const SavedOpportunities = () => {
  const { darkMode } = useTheme();
  const { savedIds, toggleSaved } = useSavedOpportunities();
  const opportunities = MOCK_OPPORTUNITY_RESPONSE.items.filter((opportunity) =>
    savedIds.has(opportunity.id),
  );
  const mutedText = darkMode ? "text-slate-300" : "text-slate-600";
  const headingText = darkMode ? "text-white" : "text-slate-900";
  const countLabel = `${opportunities.length} saved ${
    opportunities.length === 1 ? "opportunity" : "opportunities"
  }`;

  return (
    <PageLayout title="Saved" mainClass="px-3 pb-5 sm:px-6 lg:px-8 lg:pb-7">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-6">
          <h1 className={`text-2xl font-semibold ${headingText}`}>Saved</h1>
          <p className={`mt-1 text-sm ${mutedText}`}>{countLabel}</p>
        </header>

        {opportunities.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {opportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                isSaved
                onToggleSaved={toggleSaved}
              />
            ))}
          </div>
        ) : (
          <Card className="flex flex-col items-center px-5 py-12 text-center">
            <IoBookmarkOutline
              size={40}
              className={darkMode ? "text-slate-400" : "text-slate-500"}
              aria-hidden="true"
            />
            <h2 className={`mt-4 text-lg font-semibold ${headingText}`}>
              Nothing saved yet
            </h2>
            <p className={`mt-2 max-w-sm text-sm ${mutedText}`}>
              Bookmark opportunities you want to revisit and they’ll appear here.
            </p>
            <Link
              to="/student/discover"
              className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Browse opportunities
            </Link>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default SavedOpportunities;
