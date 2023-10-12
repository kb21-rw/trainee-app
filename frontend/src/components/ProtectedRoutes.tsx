import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoute = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const location = useLocation();
  const pathname = location.pathname;
  if (jwt) {
    return <Outlet />;
  } else {
    return <Navigate to={`/login?redirectTo=${pathname}`} replace />;
  }
};

export default ProtectedRoute;
