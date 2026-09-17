import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import LogoLink from "../LogoLink.jsx";

const ExamHeader = ({ darkMode, onDarkModeToggle }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 shadow-sm border-b px-6 py-3 ${
      darkMode
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200"
    }`}>
      <div className="flex items-center justify-between">
        <LogoLink className="h-8" alt="Exam Genius" />

        <button
          onClick={onDarkModeToggle}
          className={`p-2 rounded-full border ${
            darkMode 
              ? "border-gray-600 hover:bg-gray-700 text-white" 
              : "border-gray-300 hover:bg-gray-100 text-gray-700"
          }`}
        >
          {darkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default ExamHeader;