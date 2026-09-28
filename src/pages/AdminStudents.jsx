import { useState } from "react";
import {
  IoEyeOutline,
  IoFilterOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { useTheme } from "../context/ThemeContext.jsx";
import PageLayout from "../components/shared/PageLayout.jsx";

// Replace this mock collection with the students GET response when that endpoint exists.
const MOCK_STUDENTS = [
  {
    id: "STU-1001",
    registrationDate: "2025-01-12",
    name: "Amara Okafor",
    email: "amara.okafor@example.com",
    status: "Active",
  },
  {
    id: "STU-1002",
    registrationDate: "2025-02-03",
    name: "Daniel Mensah",
    email: "daniel.mensah@example.com",
    status: "Active",
  },
  {
    id: "STU-1003",
    registrationDate: "2025-02-18",
    name: "Zainab Bello",
    email: "zainab.bello@example.com",
    status: "Disabled",
  },
  {
    id: "STU-1004",
    registrationDate: "2025-03-06",
    name: "Kofi Adjei",
    email: "kofi.adjei@example.com",
    status: "Active",
  },
  {
    id: "STU-1005",
    registrationDate: "2025-03-21",
    name: "Nneka Eze",
    email: "nneka.eze@example.com",
    status: "Disabled",
  },
  {
    id: "STU-1006",
    registrationDate: "2025-04-09",
    name: "Samuel Boateng",
    email: "samuel.boateng@example.com",
    status: "Active",
  },
];

const AdminStudents = () => {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();
  const filteredStudents = MOCK_STUDENTS.filter(
    ({ name, email }) =>
      name.toLowerCase().includes(normalizedSearch) ||
      email.toLowerCase().includes(normalizedSearch),
  );

  const surface = darkMode
    ? "border-slate-700 bg-slate-800 text-white"
    : "border-gray-200 bg-white text-gray-900";
  const mutedText = darkMode ? "text-slate-300" : "text-gray-600";

  return (
    <PageLayout
      title="Students"
      userRole="admin"
      mainClass="overflow-x-hidden px-0 pt-20"
    >
      <div
        className={`min-h-[calc(100vh-5rem)] min-w-0 px-4 py-6 sm:px-6 lg:px-8 ${
          darkMode ? "bg-slate-900" : "bg-gray-50"
        }`}
      >
        <div className="mx-auto min-w-0 max-w-7xl">
          <header className="mb-6">
            <h1
              className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Students
            </h1>
            <p className={`mt-1 text-sm ${mutedText}`}>
              Manage and oversee all student accounts, enrollment status, and
              access permissions.
            </p>
          </header>

          <div className="mb-4">
            <label className="sr-only" htmlFor="student-search">
              Search students
            </label>
            <div className="relative max-w-md">
              <IoSearchOutline
                aria-hidden="true"
                className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${mutedText}`}
                size={18}
              />
              <input
                id="student-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search..."
                className={`w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${surface} ${darkMode ? "placeholder:text-slate-400" : "placeholder:text-gray-400"}`}
              />
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => undefined}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                darkMode
                  ? "border-blue-400/50 bg-blue-400/10 text-blue-200 hover:bg-blue-400/15"
                  : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              <IoFilterOutline aria-hidden="true" size={16} />
              <span>All Filters</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs ${
                  darkMode ? "bg-blue-300/20" : "bg-blue-100"
                }`}
              >
                0
              </span>
            </button>
          </div>

          <div className={`min-w-0 overflow-hidden rounded-xl border ${surface}`}>
            <div className="w-full min-w-0 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead
                  className={
                    darkMode
                      ? "bg-slate-700/60 text-slate-200"
                      : "bg-gray-50 text-gray-600"
                  }
                >
                  <tr>
                    <th className="px-6 py-4 font-medium">Registration Date</th>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Email Address</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody
                  className={
                    darkMode
                      ? "divide-y divide-slate-700"
                      : "divide-y divide-gray-100"
                  }
                >
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className={`whitespace-nowrap px-6 py-5 ${mutedText}`}>
                        {new Date(`${student.registrationDate}T00:00:00`).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 font-medium">
                        {student.name}
                      </td>
                      <td className={`whitespace-nowrap px-6 py-5 ${mutedText}`}>
                        {student.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            student.status === "Active"
                              ? darkMode
                                ? "bg-emerald-400/10 text-emerald-300"
                                : "bg-emerald-50 text-emerald-700"
                              : darkMode
                                ? "bg-rose-400/10 text-rose-300"
                                : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 text-right">
                        <button
                          type="button"
                          aria-label={`View ${student.name}`}
                          title={`View ${student.name}`}
                          onClick={() => undefined}
                          className={`inline-flex rounded-md p-2 transition-colors ${
                            darkMode
                              ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <IoEyeOutline aria-hidden="true" size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className={`px-6 py-10 text-center ${mutedText}`}
                      >
                        No students match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminStudents;