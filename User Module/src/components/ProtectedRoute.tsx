import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const ProtectedRoute = ({ children, isLoggedIn }: ProtectedRouteProps) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(!!token && isLoggedIn);
      setIsChecking(false);
    };

    checkAuth();
  }, [location.pathname]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 