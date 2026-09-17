import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

const LogoLink = ({ className = "h-8", src, alt = "Exam Genius" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useTheme();
  const logoSrc = src || (darkMode ? "/Logo icon white.png" : "/Logo icon.png");

  const handleLogoClick = () => {
    const currentPath = location.pathname;
    
    // Don't navigate during exam taking or review to avoid disrupting user
    if (currentPath.includes('/exam/') && (currentPath.includes('/taking') || currentPath.includes('/review'))) {
      return;
    }
    
    // For login/signup pages, go to landing page
    if (currentPath.includes('/signin') || currentPath.includes('/register') || currentPath.includes('/2fa')) {
      navigate('/');
      return;
    }
    
    // For logged in users, determine dashboard based on user role
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = userData.role || 'student';
    
    switch (userRole) {
      case 'instructor':
        navigate('/instructor');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/student');
        break;
    }
  };

  const isExamInProgress = location.pathname.includes('/exam/') && (location.pathname.includes('/taking') || location.pathname.includes('/review'));

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`${className} ${isExamInProgress ? '' : 'cursor-pointer hover:opacity-80 transition-opacity'}`}
      onClick={isExamInProgress ? undefined : handleLogoClick}
    />
  );
};

export default LogoLink;