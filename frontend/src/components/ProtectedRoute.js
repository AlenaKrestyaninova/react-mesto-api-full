import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ loggedIn }) => {
  return loggedIn ? <Outlet /> : <Navigate to="./sign-in" />
};

export default ProtectedRoute;