import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminFlag = localStorage.getItem('isAdmin');
    if (adminFlag === 'true') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setIsChecking(false);
  }, []);

  if (isChecking) return null;

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
