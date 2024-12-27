import PrivateLayout from '@/layouts/privateLayout';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface UserType {
  username: string;
  email: string;
}

interface PrivateRouteProps {
  user: UserType | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ user }) => {
  const token = localStorage.getItem("token");

  return user && token ? (
    <PrivateLayout />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
