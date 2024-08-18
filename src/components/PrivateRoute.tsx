import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.data !== null);
  const location = useLocation();

  console.log('isAuthenticated:', isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} replace />;
};


export default PrivateRoute;
