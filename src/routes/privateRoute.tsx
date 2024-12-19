import PrivateLayout from '@/layouts/privateLayout';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface privateRouteProps {
  username: string,
  email: string
}

const PrivateRoute: React.FC<privateRouteProps> = (username,email) => {
  const user = {
    username,
    email
  }
  return user ? <PrivateLayout /> : <Navigate to="/login" />;
};
export default PrivateRoute;
