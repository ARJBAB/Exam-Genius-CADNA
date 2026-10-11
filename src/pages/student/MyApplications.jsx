import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";
import PageLayout from "../../components/shared/PageLayout.jsx";

const MOCK_APPLICATIONS = [
  {
    title: "Google AI Scholarship 2026",
    organization: "Google",
    status: "Submitted",
    submittedDate: "Oct 10, 2026",
    referenceId: "AA-2026-3048172",
  },
  {
    title: "Women in STEM Scholarship",
    organization: "Northstar Foundation",
    status: "Reviewing",
    submittedDate: "Sep 28, 2026",
    referenceId: "AA-2026-9845102",
  },
  {
    title: "Junior Frontend Developer",
    organization: "Bright Labs",
    status: "Shortlisted",
    submittedDate: "Sep 18, 2026",
    referenceId: "AA-2026-6814359",
  },
];

function MyApplications() {
  const { darkMode } = useTheme();

  const pageClass = darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900";
  const cardClass = darkMode ? "border-slate-700 bg-slate-900/60" : "border-slate-200 bg-white";
  const mutedText = darkMode ? "text-slate-300" : "text-slate-600";
  const headingText = darkMode ? "text-white" : "text-slate-900";
  const statusClass = {
    Submitted: darkMode ? "bg-blue-500/15 text-blue-300" : "bg-blue-100 text-blue-700",
    Reviewing: darkMode ? "bg-amber-500/15 text-amber-300" : "bg-amber-100 text-amber-700",
    Shortlisted: darkMode ? "bg-emerald-500/15 text-emerald-300" : "bg-emerald-100 text-emerald-700",
  };

  return (
    <PageLayout title="My Applications" mainClass="px-4 pb-6 sm:px-6 lg:px-8">
      <div className={`mx-auto max-w-5xl ${pageClass}`}>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className={`text-2xl font-semibold ${headingText}`}>My Applications</h1>
            <p className={`mt-1 text-sm ${mutedText}`}>
              Track the opportunities you’ve applied for.
            </p>
          </div>
          <Link
            to="/student/discover"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Browse opportunities
          </Link>
        </div>

        <div className="space-y-4">
          {MOCK_APPLICATIONS.map((application) => (
            <div
              key={application.referenceId}
              className={`rounded-2xl border p-4 sm:p-5 ${cardClass}`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className={`text-lg font-semibold ${headingText}`}>{application.title}</h2>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusClass[application.status]}`}>
                      {application.status}
                    </span>
                  </div>
                  <p className={`mt-1 text-sm ${mutedText}`}>{application.organization}</p>
                </div>

                <div className="grid gap-3 text-sm sm:grid-cols-2 lg:min-w-[400px]">
                  <div>
                    <p className={`text-[11px] uppercase tracking-[0.08em] ${mutedText}`}>Submitted</p>
                    <p className={`mt-1 font-medium ${headingText}`}>{application.submittedDate}</p>
                  </div>
                  <div>
                    <p className={`text-[11px] uppercase tracking-[0.08em] ${mutedText}`}>Reference ID</p>
                    <p className={`mt-1 font-medium ${headingText}`}>{application.referenceId}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default MyApplications;
