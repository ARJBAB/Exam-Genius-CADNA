import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoShieldCheckmarkOutline, IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextDefinition.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import LogoLink from "../../components/LogoLink.jsx";

const SecurityAndFinalize = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms and Conditions to continue");
      return;
    }
    
    setLoading(true);
    
    try {
      const registrationData = JSON.parse(localStorage.getItem('registrationData') || '{}');
      
      // Validate required fields are present
      const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'password', 'role'];
      const missingFields = requiredFields.filter(field => !registrationData[field]);
      
      if (missingFields.length > 0) {
        setError(`Missing required information: ${missingFields.join(', ')}. Please complete all registration steps.`);
        setLoading(false);
        return;
      }
      
      const userData = {
        ...registrationData,
        phone: registrationData.phoneNumber
      };
      delete userData.phoneNumber;
      
      const result = await register(userData);
      
      if (result.success) {
        localStorage.removeItem('registrationData');
        navigate("/registration/creating");
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-3 sm:px-4 lg:px-8 py-6 sm:py-10 ${darkMode ? "bg-slate-900" : "bg-white"}`}>
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
        <LogoLink className="w-20 xs:w-24 sm:w-32 h-auto" alt="Exam Genius" />
      </div>

      <div className="absolute top-3 right-3 sm:top-5 sm:right-5">
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

      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl mt-16 xs:mt-20 sm:mt-24">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className={`text-xl xs:text-2xl sm:text-3xl font-Poppins font-bold mb-2 leading-tight ${darkMode ? "text-white" : "text-[#302711]"}`}>
            Create New Account
          </h1>
          <p className={`text-sm xs:text-base mb-4 sm:mb-6 ${darkMode ? "text-slate-300" : "text-gray-600"}`}>Join the future of AI-powered assessment.</p>

          {/* Mobile Progress Bar */}
          <div className="block sm:hidden mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm ${darkMode ? "text-slate-300" : "text-gray-600"}`}>Step 3 of 3</span>
            </div>
            <div className={`w-full rounded-full h-2 ${darkMode ? "bg-slate-700" : "bg-gray-200"}`}>
              <div className="bg-[#3B82F6] h-2 rounded-full" style={{width: '100%'}}></div>
            </div>
          </div>

          {/* Desktop Progress Steps */}
          <div className="hidden sm:flex justify-center items-center space-x-8 mb-6 sm:mb-8">
            <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/register/account')}>
              <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold mb-2 text-sm hover:bg-green-600 transition-colors">
                ✓
              </div>
              <span className="text-sm text-green-600 hover:text-green-700 transition-colors">Account Details</span>
            </div>
            <div className="w-16 h-0.5 bg-green-500"></div>
            <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/register/personal')}>
              <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold mb-2 text-sm hover:bg-green-600 transition-colors">
                ✓
              </div>
              <span className="text-sm text-green-600 hover:text-green-700 transition-colors">Personal Info</span>
            </div>
            <div className="w-16 h-0.5 bg-green-500"></div>
            <div className="flex flex-col items-center cursor-pointer">
              <div className="w-10 h-10 bg-[#3B82F6] text-white rounded-full flex items-center justify-center font-semibold mb-2 text-sm">
                3
              </div>
              <span className="text-sm font-medium text-[#3B82F6]">Security</span>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl sm:rounded-[30px] p-4 xs:p-6 sm:p-8 ${darkMode ? "bg-slate-800" : "bg-[#D9F5FF]"}`}>
          <h2 className={`text-lg xs:text-xl font-semibold mb-4 sm:mb-6 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>Security & Finalize</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Error Message */}
            {error && (
              <div className={`p-3 border rounded-lg ${darkMode ? "bg-red-950/40 border-red-800" : "bg-red-50 border-red-200"}`}>
                <p className={`text-xs xs:text-sm ${darkMode ? "text-red-400" : "text-red-600"}`}>{error}</p>
              </div>
            )}
            
            {/* Terms and Conditions */}
            <div className={`flex items-start space-x-3 p-3 xs:p-4 border rounded-lg ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-[#3B82F6] border-gray-300 rounded focus:ring-[#3B82F6] flex-shrink-0"
                required
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <IoDocumentTextOutline className="text-[#3B82F6] flex-shrink-0" size={18} />
                  <label className={`font-medium text-sm xs:text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Agree to Terms and Conditions
                  </label>
                </div>
                <p className={`text-xs xs:text-sm ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                  I agree to the{" "}
                  <a href="#" className="text-[#3B82F6] hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-[#3B82F6] hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full xs:w-auto px-6 xs:px-8 sm:px-12 py-2.5 xs:py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2D6AC9] disabled:opacity-50 font-medium text-sm xs:text-base transition-colors"
              >
                {loading ? "Creating Account..." : "Create My Account"}
              </button>
            </div>

            <div className="text-center">
              <p className={`text-xs xs:text-sm ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="text-[#3B82F6] font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecurityAndFinalize;