import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextDefinition.js";
import Loading from "./UI/Loading";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={`/signin?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Validate user role exists and handle invalid roles
    if (!user.role) {
      console.error('ProtectedRoute: User role missing', {
        timestamp: new Date().toISOString(),
        userId: user?.id || 'unknown',
        email: user?.email || 'unknown',
        requiredRole,
        currentPath: window.location.pathname
      });
      return <Navigate to={`/signin?redirect=${encodeURIComponent(location.pathname)}`} replace />;
    }
    
    const validRoles = ['admin', 'instructor', 'student'];
    if (!validRoles.includes(user.role)) {
      console.error('ProtectedRoute: Invalid user role', {
        timestamp: new Date().toISOString(),
        userId: user?.id || 'unknown',
        email: user?.email || 'unknown',
        invalidRole: user.role,
        requiredRole,
        validRoles,
        currentPath: window.location.pathname
      });
      return <Navigate to={`/signin?redirect=${encodeURIComponent(location.pathname)}`} replace />;
    }
    
    const redirectPath =
      user.role === "admin" ? "/admin" : user.role === "instructor" ? "/instructor" : "/student";

    console.warn('ProtectedRoute: Role mismatch, redirecting', {
      timestamp: new Date().toISOString(),
      userId: user?.id || 'unknown',
      userRole: user.role,
      requiredRole,
      currentPath: window.location.pathname,
      redirectPath
    });

    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;