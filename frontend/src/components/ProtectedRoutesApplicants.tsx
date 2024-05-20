import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRouteApplicants = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const location = useLocation();
  const pathname = location.pathname;
  if (jwt) {
    return <Outlet />;
  } else {
    return <Navigate to={`/applicant/signin?redirectTo=${pathname}`} replace />;
  }
};

export default ProtectedRouteApplicants;
