import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";
import LogoLink from "../../components/LogoLink.jsx";

const CreatingAccount = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    // Simulate account creation process
    const timer = setTimeout(() => {
      navigate("/registration/complete");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? "bg-slate-900" : "bg-gray-100"}`}>
      <div className={`rounded-lg shadow-sm w-full max-w-md p-8 ${darkMode ? "bg-slate-800" : "bg-white"}`}>
        {/* Logo */}
        <div className="mb-12">
          <LogoLink className="w-24 h-auto" alt="Exam Genius" />
        </div>

        {/* Loading Animation */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>

          {/* Status Text */}
          <h2 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Creating your account…
          </h2>
          <p className={`text-sm ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
            Please wait while we set things up
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatingAccount;