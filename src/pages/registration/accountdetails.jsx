import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail, CiLock } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useTheme } from "../../context/ThemeContext.jsx";
import LogoLink from "../../components/LogoLink.jsx";

const AccountDetails = () => {
  const [formData, setFormData] = useState(() => {
    const existingData = JSON.parse(localStorage.getItem('registrationData') || '{}');
    return {
      email: existingData.email || "",
      password: existingData.password || "",
      confirmPassword: "",
      userType: existingData.role || localStorage.getItem('accountType') || "student"
    };
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email || typeof formData.email !== 'string') {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    
    // Password validation
    if (!formData.password || typeof formData.password !== 'string') {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    // Confirm password validation
    if (formData.confirmPassword && formData.password && formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!validateForm()) return;
      
      setLoading(true);
      
      // Validate and sanitize data before storing
      if (!formData.email || !formData.password || !formData.userType) {
        throw new Error('All fields are required');
      }
      
      const registrationData = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.userType
      };
      
      localStorage.setItem('registrationData', JSON.stringify(registrationData));
      
      setTimeout(() => {
        setLoading(false);
        navigate("/register/personal");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-6 ${darkMode ? "bg-slate-900" : "bg-white"}`}>
      <div className="absolute top-4 left-4">
        <LogoLink className="w-16 sm:w-20 md:w-24 h-auto" alt="Exam Genius" />
      </div>

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

      <div className="w-full max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-3xl mt-20 sm:mt-24">
        <div className="text-center mb-6 lg:mb-8">
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-Poppins font-bold mb-2 ${darkMode ? "text-white" : "text-[#302711]"}`}>
            Create New Account
          </h1>
          <p className={`text-sm lg:text-base mb-6 lg:mb-8 ${darkMode ? "text-slate-300" : "text-gray-600"}`}>Join the future of AI-powered assessment.</p>

          {/* Mobile Progress Bar */}
          <div className="block sm:hidden mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm ${darkMode ? "text-slate-300" : "text-gray-600"}`}>Step 1 of 3</span>
            </div>
            <div className={`w-full rounded-full h-2 ${darkMode ? "bg-slate-700" : "bg-gray-200"}`}>
              <div className="bg-[#3B82F6] h-2 rounded-full" style={{width: '33.33%'}}></div>
            </div>
          </div>

          {/* Desktop Progress Steps */}
          <div className="hidden sm:flex justify-center items-center space-x-8 lg:space-x-12 mb-6 lg:mb-8">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#3B82F6] text-white rounded-full flex items-center justify-center font-semibold mb-2 text-sm lg:text-base">
                1
              </div>
              <span className="text-sm lg:text-base font-medium text-[#3B82F6]">Account Details</span>
            </div>
            <div className={`w-16 lg:w-20 h-0.5 ${darkMode ? "bg-slate-700" : "bg-gray-300"}`}></div>
            <div className="flex flex-col items-center cursor-not-allowed opacity-50">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-semibold mb-2 text-sm lg:text-base ${
                darkMode ? "bg-slate-700 text-slate-400" : "bg-gray-300 text-gray-500"
              }`}>
                2
              </div>
              <span className={`text-sm lg:text-base ${darkMode ? "text-slate-400" : "text-gray-500"}`}>Personal Info</span>
            </div>
            <div className={`w-16 lg:w-20 h-0.5 ${darkMode ? "bg-slate-700" : "bg-gray-300"}`}></div>
            <div className="flex flex-col items-center cursor-not-allowed opacity-50">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-semibold mb-2 text-sm lg:text-base ${
                darkMode ? "bg-slate-700 text-slate-400" : "bg-gray-300 text-gray-500"
              }`}>
                3
              </div>
              <span className={`text-sm lg:text-base ${darkMode ? "text-slate-400" : "text-gray-500"}`}>Security</span>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 ${darkMode ? "bg-slate-800" : "bg-[#D9F5FF]"}`}>
          <h2 className={`text-lg sm:text-xl lg:text-3xl font-semibold mb-6 lg:mb-10 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>Account Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-8">
            {error && (
              <div className={`p-4 border rounded-lg ${darkMode ? "bg-red-950/40 border-red-800" : "bg-red-50 border-red-200"}`}>
                <p className={`text-sm ${darkMode ? "text-red-400" : "text-red-600"}`}>{error}</p>
              </div>
            )}
            


            {/* Email Address */}
            <div className="relative">
              <label className={`block text-sm lg:text-lg font-medium mb-3 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Email Address
              </label>
              <div className={`absolute left-4 top-11 sm:top-12 lg:top-16 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                <CiMail size={20} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full h-12 lg:h-16 pl-12 pr-4 text-sm lg:text-base border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-[#3B82F6]' : 'bg-white border-gray-300 focus:ring-[#3B82F6]'
                }`}
                placeholder="Enter your email"
                required
              />
              {errors.email && <p className="text-red-500 text-sm lg:text-base mt-2">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <label className={`block text-sm lg:text-lg font-medium mb-3 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Password
              </label>
              <div className={`absolute left-4 top-11 sm:top-12 lg:top-16 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                <CiLock size={20} />
              </div>
              <div
                className={`absolute right-4 top-11 sm:top-12 lg:top-16 cursor-pointer ${darkMode ? "text-slate-400" : "text-gray-500"}`}
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full h-12 lg:h-16 pl-12 pr-12 text-sm lg:text-base border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-[#3B82F6]' : 'bg-white border-gray-300 focus:ring-[#3B82F6]'
                }`}
                placeholder="Enter your password"
                required
              />
              {errors.password && <p className="text-red-500 text-sm lg:text-base mt-2">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className={`block text-sm lg:text-lg font-medium mb-3 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Confirm Password
              </label>
              <div className={`absolute left-4 top-11 sm:top-12 lg:top-16 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                <CiLock size={20} />
              </div>
              <div
                className={`absolute right-4 top-11 sm:top-12 lg:top-16 cursor-pointer ${darkMode ? "text-slate-400" : "text-gray-500"}`}
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full h-12 lg:h-16 pl-12 pr-12 text-sm lg:text-base border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-[#3B82F6]' : 'bg-white border-gray-300 focus:ring-[#3B82F6]'
                }`}
                placeholder="Confirm your password"
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm lg:text-base mt-2">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Agreement */}
            <div className={`flex items-start space-x-4 p-4 lg:p-6 border rounded-lg ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`}>
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 lg:w-5 lg:h-5 text-[#3B82F6] border-gray-300 rounded focus:ring-[#3B82F6]"
              />
              <p className={`text-sm lg:text-base ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                I agree to the Terms of Service and Privacy Policy
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 sm:px-12 lg:px-20 py-3 lg:py-5 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2D6AC9] disabled:opacity-50 font-medium text-sm lg:text-lg transition-colors"
              >
                {loading ? "Processing..." : "Next"}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6 lg:mt-8">
          <p className={`text-sm lg:text-base ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
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
      </div>
    </div>
  );
};

export default AccountDetails;