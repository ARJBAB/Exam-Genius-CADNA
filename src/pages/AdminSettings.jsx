import { useContext } from "react";
import { AuthContext } from "../context/AuthContextDefinition.js";
import { useTheme } from "../context/ThemeContext.jsx";
import { PageLayout, Card } from "../components/shared";

const AdminSettings = () => {
  const { user } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useTheme();

  const displayName = user?.firstName || user?.name || "Admin";
  const email = user?.email || "—";

  return (
    <PageLayout title="Settings" userRole="admin">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Profile
          </h2>
          <div className="space-y-3">
            <div>
              <p className={`text-xs mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Name</p>
              <p className={darkMode ? "text-gray-200" : "text-gray-800"}>{displayName}</p>
            </div>
            <div>
              <p className={`text-xs mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Email</p>
              <p className={darkMode ? "text-gray-200" : "text-gray-800"}>{email}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Display Preferences
          </h2>
          <div
            className={`flex rounded-lg border overflow-hidden w-fit ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            {[
              ["Light Mode", false],
              ["Dark Mode", true],
            ].map(([label, val]) => (
              <button
                key={label}
                type="button"
                onClick={() => setDarkMode(val)}
                className={`px-6 py-2 text-sm font-medium transition-colors ${
                  darkMode === val
                    ? "bg-blue-600 text-white"
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AdminSettings;
