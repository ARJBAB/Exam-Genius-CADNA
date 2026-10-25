import {
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoBookOutline,
  IoBriefcaseOutline,
  IoCashOutline,
  IoGiftOutline,
  IoPeopleOutline,
  IoRibbonOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext.jsx";
import Card from "../../components/shared/Card.jsx";
import PageLayout from "../../components/shared/PageLayout.jsx";

const SHOW_SAMPLE_DATA = true;

// Sample API response until a wallet endpoint exists.
const SAMPLE_WALLET_RESPONSE = {
  availableToWithdraw: 42500,
  onTheWay: 75000,
  thisMonth: 12500,
  monthOverMonthChange: 14.2,
  sources: [
    { id: "scholarships", label: "Scholarships", amount: 49423, caption: "Award funding" },
    { id: "referrals", label: "Referrals", amount: 12652, caption: "Successful referrals" },
    { id: "internships", label: "Internship stipends", amount: 34003, caption: "Work placements" },
    { id: "partners", label: "Partner incentives", amount: 18781, caption: "Partner programs" },
    { id: "assessments", label: "Assessment rewards", amount: 13641, caption: "Completed assessments" },
  ],
};

const SOURCE_ICONS = {
  scholarships: IoRibbonOutline,
  referrals: IoPeopleOutline,
  internships: IoBriefcaseOutline,
  partners: IoGiftOutline,
  assessments: IoBookOutline,
};

const SOURCE_COLORS = {
  scholarships: "bg-blue-600",
  referrals: "bg-cyan-500",
  internships: "bg-teal-500",
  partners: "bg-amber-400",
  assessments: "bg-violet-500",
};

const formatNaira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const Wallet = () => {
  const { darkMode } = useTheme();
  const wallet = SAMPLE_WALLET_RESPONSE;
  const totalEarned = wallet.sources.reduce((total, source) => total + source.amount, 0);
  const mutedText = darkMode ? "text-slate-300" : "text-slate-600";
  const headingText = darkMode ? "text-white" : "text-slate-900";
  const sectionClass = darkMode
    ? "border-slate-700 bg-slate-900/60"
    : "border-slate-200 bg-white";

  const showComingSoon = (action) => {
    window.alert(`${action} is coming soon.`);
  };

  const summaryCards = [
    {
      title: "Available to withdraw",
      amount: wallet.availableToWithdraw,
      icon: IoCashOutline,
      className: "bg-blue-700 text-white",
      action: "Withdraw Funds",
      actionClass: "bg-white text-blue-700 hover:bg-blue-50",
    },
    {
      title: "On the way to you",
      amount: wallet.onTheWay,
      icon: IoArrowDownOutline,
      className: darkMode
        ? "bg-sky-950 text-sky-100 border border-sky-800"
        : "bg-sky-100 text-sky-950",
      caption: "Pending payments",
    },
    {
      title: "Total earned",
      amount: totalEarned,
      icon: IoTrendingUpOutline,
      className: darkMode
        ? "bg-teal-950 text-teal-100 border border-teal-800"
        : "bg-teal-100 text-teal-950",
      caption: "Across all sources",
    },
    {
      title: "This month",
      amount: wallet.thisMonth,
      icon: IoArrowUpOutline,
      className: darkMode
        ? "bg-amber-950 text-amber-100 border border-amber-800"
        : "bg-amber-100 text-amber-950",
      caption: `${wallet.monthOverMonthChange}% from last month`,
      action: "View insights",
    },
  ];

  return (
    <PageLayout title="Wallet" mainClass="px-3 pb-5 sm:px-6 lg:px-8 lg:pb-7">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className={`text-2xl font-semibold ${headingText}`}>Wallet Overview</h1>
              {SHOW_SAMPLE_DATA && (
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  darkMode ? "bg-slate-700 text-slate-200" : "bg-slate-200 text-slate-700"
                }`}>
                  Sample data
                </span>
              )}
            </div>
            <p className={`mt-1 text-sm ${mutedText}`}>
              Track your earnings, funding and transactions in one place.
            </p>
          </div>
          <button
            type="button"
            onClick={() => showComingSoon("Download Statement")}
            className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
              darkMode
                ? "border-slate-600 text-slate-100 hover:bg-slate-800"
                : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <IoArrowDownOutline size={18} aria-hidden="true" />
            Download Statement
          </button>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Wallet summary">
          {summaryCards.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`flex min-h-48 flex-col rounded-2xl p-5 ${item.className}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium opacity-80">{item.title}</p>
                    <p className="mt-3 text-2xl font-bold">{formatNaira.format(item.amount)}</p>
                  </div>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <div className="mt-auto pt-4">
                  {item.action === "Withdraw Funds" ? (
                    <button
                      type="button"
                      onClick={() => showComingSoon(item.action)}
                      className={`min-h-10 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${item.actionClass}`}
                    >
                      {item.action}
                    </button>
                  ) : item.action ? (
                    <button
                      type="button"
                      onClick={() => showComingSoon(item.action)}
                      className="text-sm font-semibold underline underline-offset-2"
                    >
                      {item.action}
                    </button>
                  ) : (
                    <p className="text-sm opacity-75">{item.caption}</p>
                  )}
                  {item.action === "View insights" && (
                    <p className="mt-1 text-xs opacity-75">{item.caption}</p>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        <section className={`rounded-2xl border p-4 sm:p-6 ${sectionClass}`}>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className={`text-lg font-semibold sm:text-xl ${headingText}`}>
                Where your {formatNaira.format(totalEarned)} came from
              </h2>
              <p className={`mt-1 text-sm ${mutedText}`}>All time, since March 2026</p>
            </div>
            <button
              type="button"
              onClick={() => showComingSoon("See every payment")}
              className="self-start text-sm font-semibold text-blue-600 hover:text-blue-700 sm:self-auto"
            >
              See every payment
            </button>
          </div>

          <div
            className="mb-6 flex h-4 w-full overflow-hidden rounded-full bg-slate-200"
            role="img"
            aria-label="Earnings by source"
          >
            {wallet.sources.map((source) => (
              <span
                key={source.id}
                className={SOURCE_COLORS[source.id]}
                style={{ width: `${(source.amount / totalEarned) * 100}%` }}
                title={`${source.label}: ${formatNaira.format(source.amount)}`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {wallet.sources.map((source) => {
              const Icon = SOURCE_ICONS[source.id];
              return (
                <Card
                  key={source.id}
                  className={`min-w-0 p-4 ${darkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50"}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${SOURCE_COLORS[source.id]}`}>
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <h3 className={`min-w-0 text-sm font-semibold ${headingText}`}>
                      {source.label}
                    </h3>
                  </div>
                  <p className={`mt-4 text-lg font-bold ${headingText}`}>
                    {formatNaira.format(source.amount)}
                  </p>
                  <p className={`mt-1 text-xs ${mutedText}`}>{source.caption}</p>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Wallet;
