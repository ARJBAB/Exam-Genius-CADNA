import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructorLayout from "./InstructorLayout";
import { FiArrowLeft } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function ExamSettingsPage() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    shuffleQuestions: false,
    shuffleOptions: false,
    aiProctoring: false,
    allowResume: false,
    automaticGrading: true,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePublishExam = () => {
    alert("Exam published successfully!");
    // Here you would typically save the settings and navigate to another page
  };

  const handleBack = () => {
    navigate("/create-exam");
  };

  return (
    <InstructorLayout
      title="EXAMS"
      darkMode={darkMode}
      onDarkModeToggle={setDarkMode}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FiArrowLeft className="text-lg" />
              <span>Back</span>
            </button>

            <div>
              <h1
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Exam Settings
              </h1>
              <p
                className={`mt-1 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Configure your exam settings and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Settings Options */}
        <div className="space-y-6">
          {/* Shuffle Questions */}
          <div
            className={`p-6 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Shuffle Questions
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Randomize the order of questions for each student.
                </p>
              </div>
              <button
                onClick={() => handleToggle("shuffleQuestions")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.shuffleQuestions
                    ? "bg-blue-600"
                    : darkMode
                    ? "bg-gray-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.shuffleQuestions
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Shuffle Options */}
          <div
            className={`p-6 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Shuffle Options
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Randomize the order of options within each question.
                </p>
              </div>
              <button
                onClick={() => handleToggle("shuffleOptions")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.shuffleOptions
                    ? "bg-blue-600"
                    : darkMode
                    ? "bg-gray-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.shuffleOptions ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Enable AI Proctoring */}
          <div
            className={`p-6 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Enable AI Proctoring
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Enable AI-powered proctoring to monitor student behavior
                  during the exam.
                </p>
              </div>
              <button
                onClick={() => handleToggle("aiProctoring")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.aiProctoring
                    ? "bg-blue-600"
                    : darkMode
                    ? "bg-gray-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.aiProctoring ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Allow Resume After Disconnect */}
          <div
            className={`p-6 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Allow Resume After Disconnect
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Allow students to resume the exam if they get disconnected.
                </p>
              </div>
              <button
                onClick={() => handleToggle("allowResume")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.allowResume
                    ? "bg-blue-600"
                    : darkMode
                    ? "bg-gray-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.allowResume ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Grading Method */}
          <div
            className={`p-6 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Grading Method
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Choose between automatic grading or manual grading by
                  instructors.
                </p>
              </div>
              <button
                onClick={() => handleToggle("automaticGrading")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.automaticGrading
                    ? "bg-blue-600"
                    : darkMode
                    ? "bg-gray-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.automaticGrading
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="mt-3">
              <span
                className={`text-sm font-medium ${
                  settings.automaticGrading
                    ? "text-blue-600"
                    : darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                {settings.automaticGrading
                  ? "Automatic Grading"
                  : "Manual Grading"}
              </span>
            </div>
          </div>
        </div>

        {/* Publish Exam Button */}
        <div className="mt-8">
          <button
            onClick={handlePublishExam}
            className={`w-full py-4 rounded-lg text-center transition-all duration-200 font-semibold text-lg ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
            }`}
          >
            Publish Exam
          </button>
        </div>
      </div>
    </InstructorLayout>
  );
}
