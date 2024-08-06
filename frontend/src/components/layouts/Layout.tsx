import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminMenu, applicantMenu, coachMenu } from "../../utils/data";
import { useGetProfileQuery } from "../../features/user/apiSlice";
import { getJWT } from "../../utils/helper";
import Cookies from "universal-cookie";

const Layout = () => {
  const jwt: string = getJWT();
  const cookies = new Cookies();
  const navigate = useNavigate();

  const { data } = useGetProfileQuery(jwt);
  const menu =
    (data?.role === "Admin" && adminMenu) ||
    (data?.role === "Coach" && coachMenu) ||
    (data?.role === "Applicant" && applicantMenu) ||
    (data?.role === "Prospect" && applicantMenu) ||
    [];
  return (
    <div className="flex flex-col font-lato px-16 py-4 max-w-[1920px] mx-auto overflow-x-hidden">
      <nav className="flex items-center justify-between gap-20 py-6 border-b-2 border-b-gray-200 shadow-b">
        <div className="flex items-center gap-10">
          {menu.map((element, index) => (
            <NavLink
              key={index}
              to={element.link}
              className={({ isActive }) =>
                `whitespace-nowrap text-xl font-medium ${
                  isActive ? "text-primary-dark" : "text-secondary-dark"
                }`
              }
              end={element.link === "/"}
            >
              {element.title}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-10">
          {
            <NavLink
              to="/profile-settings"
              className={({ isActive }) =>
                `whitespace-nowrap text-xl font-medium ${
                  isActive ? "text-primary-dark" : "text-secondary-dark"
                }`
              }
            >
              {data?.name}
            </NavLink>
          }
          <button
            className="text-xl font-medium text-secondary-dark"
            onClick={() => {
              cookies.remove("jwt");
              navigate("/login");
            }}
          >
            logout
          </button>
        </div>
      </nav>
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="container w-screen fixed bottom-0 py-4 flex justify-between items-center">
        <div>
          <p>
            &copy;<span className="font-bold">The GYM</span>{" "}
            {new Date().getFullYear()} <span></span>, All rights reserved
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <Link to="#" className="hover:text-primary-dark">Privacy Policy</Link>
          <Link to="#" className="hover:text-primary-dark">Terms and Conditions</Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
