import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructorLayout from "./InstructorLayout";
import { FiArrowLeft, FiUpload, FiX, FiEye, FiCheck } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function CreateExamPage() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const [showImportModal, setShowImportModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [importedQuestion, setImportedQuestion] = useState(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const [examData, setExamData] = useState({
    title: "",
    description:
      "1-4, Please include all necessary instructions here, save warnings, deliver requests, and any specific gadget grants for usations.",
    language: "",
    subject: "",
    passingThreshold: "",
    examDate: "03/04/2022",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (field, value) => {
    setExamData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Updated question data with new subjects
  const questionBank = [
    { id: 1, title: "CSS208 - Advanced Web Development", subject: "CSS208" },
    { id: 2, title: "FNB401 - Financial Banking Systems", subject: "FNB401" },
    { id: 3, title: "CALCULUS - Differential Equations", subject: "CALCULUS" },
  ];

  const handleOpenImportModal = () => {
    setShowImportModal(true);
    setSelectedQuestion("");
  };

  const handleCloseImportModal = () => {
    setShowImportModal(false);
    setImporting(false);
    setSelectedQuestion("");
  };

  const handleImportQuestion = () => {
    if (!selectedQuestion) {
      alert("Please select a question first");
      return;
    }

    setImporting(true);

    // Simulate import process
    setTimeout(() => {
      const imported = questionBank.find((q) => q.title === selectedQuestion);
      setImportedQuestion(imported);
      setImportSuccess(true);
      setImporting(false);
      setShowImportModal(false);
    }, 2000);
  };

  const handleRemoveImportedQuestion = () => {
    setImportedQuestion(null);
    setImportSuccess(false);
  };

  const handleViewQuestion = () => {
    if (importedQuestion) {
      alert(`Viewing: ${importedQuestion.title}`);
    }
  };

  const handleProceedToSettings = () => {
    if (importSuccess) {
      navigate("/exam-settings");
    }
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
            {/* FIXED BACK BUTTON - Changed from -1 to "/dashboard" */}
            <button
              onClick={() => navigate("/instructor")}
              className={`p-2 rounded-lg border transition-colors ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FiArrowLeft className="text-lg" />
            </button>

            <div>
              <h1
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Create New Exam
              </h1>
              <p
                className={`mt-1 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Import questions from your question bank to include in this exam
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Exam Title Section */}
          <div
            className={`p-6 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Exam Title
            </h2>

            <input
              type="text"
              value={examData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter exam title"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Exam Description Section */}
          <div
            className={`p-6 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Exam Description
            </h2>

            <textarea
              value={examData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Form Fields Grid */}
          <div
            className={`p-6 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exam Language */}
              <div>
                <label
                  className={`block text-sm font-medium mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Exam Language
                </label>
                <select
                  value={examData.language}
                  onChange={(e) =>
                    handleInputChange("language", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Select Language</option>
                  <option value="english">English</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label
                  className={`block text-sm font-medium mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Subject
                </label>
                <select
                  value={examData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Select Subject</option>
                  <option value="css208">CSS208</option>
                  <option value="fnb401">FNB401</option>
                  <option value="calculus">CALCULUS</option>
                </select>
              </div>

              {/* Passing Threshold */}
              <div>
                <label
                  className={`block text-sm font-medium mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Passing Threshold
                </label>
                <input
                  type="number"
                  value={examData.passingThreshold}
                  onChange={(e) =>
                    handleInputChange("passingThreshold", e.target.value)
                  }
                  placeholder="e.g., 70"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              {/* Exam Date */}
              <div>
                <label
                  className={`block text-sm font-medium mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Exam Date
                </label>
                <input
                  type="text"
                  value={examData.examDate}
                  onChange={(e) =>
                    handleInputChange("examDate", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              {/* Exam Start Time */}
              <div>
                <label
                  className={`block text-sm font-medium mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Exam Start Time
                </label>
                <input
                  type="time"
                  value={examData.startTime}
                  onChange={(e) =>
                    handleInputChange("startTime", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              {/* Exam End Time */}
              <div>
                <label
                  className={`block text-sm font-medium mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Exam End Time
                </label>
                <input
                  type="time"
                  value={examData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div
            className={`p-6 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Questions
            </h2>

            {/* Import From Question Bank */}
            <div className="mb-6">
              <h3
                className={`font-medium mb-3 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Import From Question Bank
              </h3>

              {/* Subject tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm border font-medium ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-300"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  CSS208
                </span>
                <span
                  className={`px-4 py-2 rounded-full text-sm border font-medium ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-300"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  FNB401
                </span>
                <span
                  className={`px-4 py-2 rounded-full text-sm border font-medium ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-300"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  CALCULUS
                </span>
              </div>

              {/* Imported Question Success State */}
              {importSuccess && importedQuestion && (
                <div
                  className={`p-4 rounded-lg mb-4 border ${
                    darkMode
                      ? "bg-green-900/20 border-green-800"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1 rounded-full ${
                          darkMode ? "bg-green-800" : "bg-green-100"
                        }`}
                      >
                        <FiCheck
                          className={`text-lg ${
                            darkMode ? "text-green-300" : "text-green-600"
                          }`}
                        />
                      </div>
                      <div>
                        <span
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {importedQuestion.subject}
                        </span>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {importedQuestion.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleViewQuestion}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode
                            ? "text-blue-400 hover:bg-blue-900/30"
                            : "text-blue-600 hover:bg-blue-100"
                        }`}
                        title="View question"
                      >
                        <FiEye className="text-lg" />
                      </button>
                      <button
                        onClick={handleRemoveImportedQuestion}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode
                            ? "text-red-400 hover:bg-red-900/30"
                            : "text-red-600 hover:bg-red-100"
                        }`}
                        title="Remove question"
                      >
                        <FiX className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Empty space for question list */}
            <div
              className={`min-h-[200px] rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-8 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-500"
              }`}
            >
              <button
                type="button"
                onClick={handleOpenImportModal}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg border transition-all duration-200 mb-4 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-300 hover:bg-gray-500 hover:shadow-lg"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-lg"
                }`}
              >
                <FiUpload className="text-lg" />
                Import Questions
              </button>

              <p className="text-center text-sm">
                Click to import questions from your question bank
              </p>
            </div>
          </div>

          {/* Proceed to Exam Settings Button */}
          <button
            type="button"
            onClick={handleProceedToSettings}
            className={`w-full py-4 rounded-lg text-center transition-all duration-200 font-semibold text-lg ${
              importSuccess
                ? darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                : darkMode
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!importSuccess}
          >
            {importSuccess
              ? "Proceed to Exam Settings"
              : "Import Questions to Proceed"}
          </button>
        </div>
      </div>

      {/* Import Questions Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`rounded-lg shadow-xl max-w-md w-full mx-auto ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`flex items-center justify-between p-6 border-b ${
                darkMode ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Import Questions
              </h3>
              <button
                onClick={handleCloseImportModal}
                className={`transition-colors ${
                  darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                disabled={importing}
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {importing ? (
                <div className="text-center py-8">
                  <div className="flex justify-center items-center mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <p
                    className={`font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Importing question please wait...
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    This may take a few seconds
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      Select Title
                    </label>
                    <select
                      value={selectedQuestion}
                      onChange={(e) => setSelectedQuestion(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">Select a question...</option>
                      {questionBank.map((question) => (
                        <option key={question.id} value={question.title}>
                          {question.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-300"
                        : "bg-gray-50 border-gray-200 text-gray-600"
                    }`}
                  >
                    <p className="text-sm">
                      Select a question from your question bank to import into
                      this exam.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {!importing && (
              <div
                className={`flex justify-end space-x-3 p-6 border-t ${
                  darkMode ? "border-gray-600" : "border-gray-200"
                }`}
              >
                <button
                  onClick={handleCloseImportModal}
                  className={`px-6 py-2 transition-colors font-medium ${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportQuestion}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  disabled={!selectedQuestion}
                >
                  Import
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </InstructorLayout>
  );
}
