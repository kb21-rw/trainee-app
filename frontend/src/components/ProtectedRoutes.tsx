import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getJWT } from "../utils/helper";

const ProtectedRoute = () => {
  const jwt:string = getJWT()
  const location = useLocation();
  const pathname = location.pathname;
  if (jwt) {
    return <Outlet />;
  } else {
    return <Navigate to={`/login?redirectTo=${pathname}`} replace />;
  }
};

export default ProtectedRoute;
