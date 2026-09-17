import { useNavigate } from "react-router-dom";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useTheme } from "../../context/ThemeContext.jsx";
import LogoLink from "../../components/LogoLink.jsx";

const RegistrationComplete = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleContinue = () => {
    navigate("/signin");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? "bg-slate-900" : "bg-gray-100"}`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full border ${
            darkMode
              ? "border-slate-700 hover:bg-slate-800 text-white"
              : "border-gray-300 hover:bg-gray-100 text-gray-700"
          }`}
        >
          {darkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
        </button>
      </div>

      <div className={`rounded-lg shadow-sm w-full max-w-md p-8 ${darkMode ? "bg-slate-800" : "bg-white"}`}>
        {/* Logo */}
        <div className="mb-12">
          <LogoLink className="w-24 h-auto" alt="Exam Genius" />
        </div>

        {/* Success Message */}
        <div className="text-center">
          <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Registration Complete!
          </h2>
          <p className={`text-sm mb-8 ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
            Your account has been created successfully.
          </p>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-[#3B82F6] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2D6AC9] transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComplete;