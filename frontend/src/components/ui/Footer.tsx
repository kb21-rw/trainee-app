import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-4 bg-white flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
      <div className="text-center sm:text-left">
        <p>
          &copy;<span className="font-bold">The GYM</span>{" "}
          {new Date().getFullYear()}, All rights reserved
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
        <Link to="#" className="hover:text-primary-dark">
          Privacy Policy
        </Link>
        <Link to="#" className="hover:text-primary-dark">
          Terms and Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
