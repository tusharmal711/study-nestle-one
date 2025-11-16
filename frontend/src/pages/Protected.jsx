import React from "react";
import { Navigate, Outlet } from 'react-router';

const Protected = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};


export default Protected;