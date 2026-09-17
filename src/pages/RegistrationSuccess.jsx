import { useNavigate } from "react-router-dom";
import LogoLink from "../components/LogoLink.jsx";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="absolute top-5 left-5">
        <LogoLink className="w-32 h-auto" alt="Exam Genius" />
      </div>

      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Registration Successful!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Your account has been created successfully. You can now sign in to access your dashboard.
        </p>
        
        <button
          onClick={() => navigate("/signin")}
          className="px-8 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2D6AC9] font-medium"
        >
          Sign In Now
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;