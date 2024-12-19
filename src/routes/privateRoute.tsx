import PrivateLayout from '@/layouts/privateLayout';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface UserType {
  username: string,
  email: string
}
interface privateRouteProps {
  user: UserType|null
}

const PrivateRoute: React.FC<privateRouteProps> = ({user}) => {

  return user ? <PrivateLayout /> : <Navigate to="/login" />;
};
export default PrivateRoute;
