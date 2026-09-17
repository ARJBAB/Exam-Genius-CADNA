import { useNavigate } from 'react-router-dom';
import { FaUser, FaChalkboardTeacher } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext.jsx';
import LogoLink from '../../components/LogoLink.jsx';

const RoleSelector = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleRoleSelect = (role) => {
    localStorage.setItem('accountType', role);
    navigate('/register/account');
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-white"}`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 w-full border-b px-6 py-4 flex items-center justify-between ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
      }`}>
        <LogoLink className="h-12 sm:h-16" alt="Exam Genius" />
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

      {/* Back Button Section */}
      <div className="w-full px-6 py-4 mt-20">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 transition-colors ${
            darkMode ? "text-slate-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 py-8">
        {/* Title Section */}
        <div className="text-center mb-12 max-w-md">
          <h1 className={`text-3xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Select Account Type
          </h1>
          <p className={darkMode ? "text-slate-300" : "text-gray-600"}>
            Select your role to continue with registration
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div
            onClick={() => handleRoleSelect('student')}
            className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-200 hover:border-[#2563EB] hover:shadow-xl group ${
              darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                <FaUser className="w-10 h-10 text-[#2563EB]" />
              </div>

              <div>
                <h3 className={`text-2xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Student
                </h3>
                <p className={`text-base mb-6 ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                  Take assigned exams, track personal scores, and view your detailed performance results.
                </p>
              </div>

              <button className="w-full py-3 px-6 border-2 border-[#2563EB] text-[#2563EB] rounded-xl font-semibold hover:bg-[#2563EB] hover:text-white transition-colors">
                Select Student
              </button>
            </div>
          </div>

          <div
            onClick={() => handleRoleSelect('instructor')}
            className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-200 hover:border-[#2563EB] hover:shadow-xl group ${
              darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                <FaChalkboardTeacher className="w-10 h-10 text-[#2563EB]" />
              </div>

              <div>
                <h3 className={`text-2xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Instructor
                </h3>
                <p className={`text-base mb-6 ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                  Create, manage and assign exams. Review integrity reports and analyze performance.
                </p>
              </div>

              <button className="w-full py-3 px-6 border-2 border-[#2563EB] text-[#2563EB] rounded-xl font-semibold hover:bg-[#2563EB] hover:text-white transition-colors">
                Select Instructor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;