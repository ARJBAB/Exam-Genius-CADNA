import { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IoBriefcaseOutline,
  IoCalendarOutline,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext.jsx";
import { AuthContext } from "../../context/AuthContextDefinition.js";
import PageLayout from "../../components/shared/PageLayout.jsx";
import { MOCK_OPPORTUNITY_RESPONSE } from "../../data/mockOpportunities.js";
import { isValidEmail, isValidName, isValidPhone } from "../../utils/validation.js";

const academicPrograms = [
  "Computer Science",
  "Business Administration",
  "Engineering",
  "Health Sciences",
  "Education",
  "Law",
  "Psychology",
  "Social Sciences",
  "Agriculture",
  "Arts and Design",
  "Other",
];

const studyLevels = [
  "Undergraduate",
  "Masters",
  "PhD",
  "Diploma",
  "Certificate",
  "Any study level",
];

const formatDeadline = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getOpportunityById = (opportunityId) =>
  MOCK_OPPORTUNITY_RESPONSE.items.find((opportunity) => opportunity.id === opportunityId);

const buildInitialForm = (user) => ({
  fullName: [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "",
  email: user?.email || "",
  phone: user?.phoneNumber || user?.phone || "",
  institution: "",
  program: "",
  studyLevel: "",
  resume: null,
});

const createMockReferenceId = () => {
  const year = new Date().getFullYear();
  const sequence = Math.floor(1000000 + Math.random() * 9000000);
  return `AA-${year}-${sequence}`;
};

const isValidDocumentFile = (file) => {
  if (!file) return false;
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const extension = file.name.split(".").pop()?.toLowerCase();
  const hasAllowedExtension = ["pdf", "doc", "docx"].includes(extension);
  return (allowedTypes.includes(file.type) || hasAllowedExtension) && file.size <= 5 * 1024 * 1024;
};

function ApplicationForm() {
  const { user } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { opportunityId } = useParams();
  const opportunity = useMemo(() => getOpportunityById(opportunityId), [opportunityId]);
  const [formData, setFormData] = useState(() => buildInitialForm(user));
  const [errors, setErrors] = useState({});

  const fieldClass = `w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors ${
    darkMode
      ? "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
      : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
  }`;

  const sectionClass = darkMode ? "border-slate-700 bg-slate-900/60" : "border-slate-200 bg-white";
  const mutedText = darkMode ? "text-slate-300" : "text-slate-600";
  const headingText = darkMode ? "text-white" : "text-slate-900";

  if (!opportunity) {
    return (
      <PageLayout title="Application Form" mainClass="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          This opportunity could not be found.
        </div>
      </PageLayout>
    );
  }

  const handleChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      setFormData((current) => ({ ...current, resume: null }));
      setErrors((current) => ({ ...current, resume: "" }));
      return;
    }

    if (!isValidDocumentFile(file)) {
      setErrors((current) => ({
        ...current,
        resume: "Please upload a PDF, DOC, or DOCX file up to 5 MB.",
      }));
      event.target.value = "";
      return;
    }

    setFormData((current) => ({ ...current, resume: file }));
    setErrors((current) => ({ ...current, resume: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim() || !isValidName(formData.fullName)) {
      nextErrors.fullName = "Full name is required.";
    }
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.phone.trim() || !isValidPhone(formData.phone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!formData.institution.trim()) {
      nextErrors.institution = "Institution is required.";
    }
    if (!formData.program.trim()) {
      nextErrors.program = "Program of study is required.";
    }
    if (!formData.studyLevel.trim()) {
      nextErrors.studyLevel = "Level of study is required.";
    }
    if (!formData.resume) {
      nextErrors.resume = "Please upload a resume or CV.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const referenceId = createMockReferenceId();
    navigate(`/student/discover/${opportunity.id}/apply/submitted`, {
      state: { opportunity, referenceId },
    });
  };

  const detailItems = [
    { label: "Location", value: opportunity.location, icon: IoLocationOutline },
    { label: "Type", value: opportunity.type, icon: IoBriefcaseOutline },
    {
      label: "Duration",
      value: opportunity.category === "Jobs" ? "Full-time" : opportunity.category === "Research" ? "Project-based" : "Academic cycle",
      icon: IoTimeOutline,
    },
    {
      label: "Open to",
      value: opportunity.eligibility?.label || opportunity.studyLevel,
      icon: IoPeopleOutline,
    },
    {
      label: "Application Deadline",
      value: formatDeadline(opportunity.deadline),
      icon: IoCalendarOutline,
    },
  ];

  return (
    <PageLayout title="Application Form" mainClass="px-4 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className={`text-2xl font-semibold ${headingText}`}>Application Form</h1>
          <p className={`mt-2 text-base ${mutedText}`}>{opportunity.title}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-medium text-blue-600">
              {opportunity.type}
            </span>
            <span className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
              {opportunity.amount}
            </span>
            <span className="rounded-full bg-slate-500/10 px-2.5 py-1 text-xs font-medium text-slate-600">
              Deadline: {formatDeadline(opportunity.deadline)}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_360px]">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <section className={`rounded-2xl border p-5 ${sectionClass}`}>
              <h2 className={`mb-4 text-lg font-semibold ${headingText}`}>Personal Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block md:col-span-2">
                  <span className={`mb-2 block text-sm font-medium ${mutedText}`}>Full Name</span>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(event) => handleChange("fullName", event.target.value)}
                    className={`${fieldClass} ${errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    placeholder="Enter full name"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                </label>

                <label className="block">
                  <span className={`mb-2 block text-sm font-medium ${mutedText}`}>Email Address</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    className={`${fieldClass} ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    placeholder="name@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </label>

                <label className="block">
                  <span className={`mb-2 block text-sm font-medium ${mutedText}`}>Phone number</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => handleChange("phone", event.target.value)}
                    className={`${fieldClass} ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    placeholder="+1 234 567 890"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </label>
              </div>
            </section>

            <section className={`rounded-2xl border p-5 ${sectionClass}`}>
              <h2 className={`mb-4 text-lg font-semibold ${headingText}`}>Academic Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block md:col-span-2">
                  <span className={`mb-2 block text-sm font-medium ${mutedText}`}>Institution</span>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(event) => handleChange("institution", event.target.value)}
                    className={`${fieldClass} ${errors.institution ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    placeholder="Enter institution name"
                  />
                  {errors.institution && <p className="mt-1 text-sm text-red-500">{errors.institution}</p>}
                </label>

                <label className="block">
                  <span className={`mb-2 block text-sm font-medium ${mutedText}`}>Program of Study</span>
                  <select
                    value={formData.program}
                    onChange={(event) => handleChange("program", event.target.value)}
                    className={`${fieldClass} ${errors.program ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  >
                    <option value="">Select program</option>
                    {academicPrograms.map((program) => (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>
                  {errors.program && <p className="mt-1 text-sm text-red-500">{errors.program}</p>}
                </label>

                <label className="block">
                  <span className={`mb-2 block text-sm font-medium ${mutedText}`}>Level of Study</span>
                  <select
                    value={formData.studyLevel}
                    onChange={(event) => handleChange("studyLevel", event.target.value)}
                    className={`${fieldClass} ${errors.studyLevel ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  >
                    <option value="">Select level</option>
                    {studyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.studyLevel && <p className="mt-1 text-sm text-red-500">{errors.studyLevel}</p>}
                </label>
              </div>
            </section>

            <section className={`rounded-2xl border p-5 ${sectionClass}`}>
              <h2 className={`mb-4 text-lg font-semibold ${headingText}`}>Supporting Documents</h2>
              <label className="block">
                <span className={`mb-2 block text-sm font-medium ${mutedText}`}>CV/Resume</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className={`flex w-full cursor-pointer items-center justify-center rounded-xl border border-dashed px-4 py-4 text-sm font-medium transition-colors ${
                    darkMode
                      ? "border-slate-600 bg-slate-800 text-slate-200 hover:border-blue-400 hover:text-blue-300"
                      : "border-slate-300 bg-slate-50 text-slate-700 hover:border-blue-400 hover:text-blue-700"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <IoDocumentTextOutline size={18} />
                    {formData.resume ? "Replace file" : "Upload CV/Resume"}
                  </span>
                </label>
              </label>

              {formData.resume && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700">
                  <IoCheckmarkCircle size={16} />
                  <span className="max-w-[220px] truncate">{formData.resume.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((current) => ({ ...current, resume: null }));
                      setErrors((current) => ({ ...current, resume: "" }));
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    aria-label="Remove resume"
                  >
                    ×
                  </button>
                </div>
              )}

              {errors.resume && <p className="mt-1 text-sm text-red-500">{errors.resume}</p>}
            </section>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/student/discover")}
                className={`rounded-xl border px-5 py-3 text-sm font-semibold ${
                  darkMode
                    ? "border-slate-600 text-slate-200 hover:bg-slate-800"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </form>

          <aside className={`rounded-2xl border p-5 ${sectionClass}`}>
            <h2 className={`mb-4 text-lg font-semibold ${headingText}`}>Opportunity Details</h2>
            <div className="space-y-4">
              {detailItems.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-blue-600/10 p-2 text-blue-600">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className={`text-xs uppercase tracking-[0.08em] ${mutedText}`}>{label}</p>
                    <p className={`mt-1 text-sm font-medium ${headingText}`}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}

export default ApplicationForm;
