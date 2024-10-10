import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminMenu, applicantMenu, coachMenu } from "../../utils/data";
import { useGetProfileQuery } from "../../features/user/apiSlice";
import { getJWT } from "../../utils/helper";
import Cookies from "universal-cookie";
import { UserRole } from "../../utils/types";
import Footer from "../ui/Footer";

const Layout = () => {
  const jwt: string = getJWT();
  const cookies = new Cookies();
  const navigate = useNavigate();

  const { data } = useGetProfileQuery(jwt);
  const menu =
    (data?.role === UserRole.Admin && adminMenu) ||
    (data?.role === UserRole.Coach && coachMenu) ||
    (data?.role === UserRole.Applicant && applicantMenu) ||
    (data?.role === UserRole.Prospect && applicantMenu) ||
    [];

  return (
    <div className="h-screen flex flex-col justify-between font-lato px-1 md:px-16 py-4 max-w-[1920px] md:mx-auto overflow-x-hidden">
      <nav className="flex items-center justify-between gap-20 py-6 bg-white border-b-2 border-b-gray-200 shadow-b">
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
     <Footer/>
    </div>
  );
};

export default Layout;
