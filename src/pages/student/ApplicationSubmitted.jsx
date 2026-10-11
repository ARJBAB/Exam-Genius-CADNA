import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCheckmarkCircle, IoCopyOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext.jsx";
import PageLayout from "../../components/shared/PageLayout.jsx";

function ApplicationSubmitted() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const opportunity = location.state?.opportunity;
  const referenceId = location.state?.referenceId;

  useEffect(() => {
    if (!opportunity || !referenceId) {
      navigate("/student/discover", { replace: true });
    }
  }, [navigate, opportunity, referenceId]);

  const handleCopy = async () => {
    if (!referenceId) return;
    try {
      await navigator.clipboard.writeText(referenceId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  if (!opportunity || !referenceId) {
    return null;
  }

  const cardClass = darkMode ? "border-slate-700 bg-slate-900/60" : "border-slate-200 bg-white";
  const mutedText = darkMode ? "text-slate-300" : "text-slate-600";
  const headingText = darkMode ? "text-white" : "text-slate-900";

  return (
    <PageLayout title="Application Submitted" mainClass="px-4 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className={`rounded-3xl border p-6 sm:p-8 ${cardClass}`}>
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-100/40">
              <IoCheckmarkCircle size={52} />
            </div>
          </div>

          <div className="mt-6 text-center">
            <h1 className={`text-3xl font-semibold ${headingText}`}>Application Submitted!</h1>
            <p className={`mt-3 text-base ${mutedText}`}>
              Your application for <span className="font-semibold text-blue-600">{opportunity.title}</span> has been successfully submitted.
            </p>
          </div>

          <div className={`mt-8 rounded-2xl border p-4 ${darkMode ? "border-slate-600 bg-slate-800/70" : "border-slate-200 bg-slate-50"}`}>
            <p className={`text-xs uppercase tracking-[0.08em] ${mutedText}`}>Reference ID</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className={`text-lg font-semibold ${headingText}`}>{referenceId}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-lg border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-100"
                aria-label="Copy reference ID"
              >
                <IoCopyOutline size={18} />
              </button>
            </div>
            {copied && <p className="mt-2 text-sm text-emerald-500">Copied</p>}
          </div>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={() => navigate("/student")}
              className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
            <button
              type="button"
              onClick={() => navigate("/student/applications")}
              className={`w-full rounded-xl border px-4 py-3.5 text-sm font-semibold ${
                darkMode
                  ? "border-slate-600 text-slate-200 hover:bg-slate-800"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              View My Applications
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ApplicationSubmitted;
