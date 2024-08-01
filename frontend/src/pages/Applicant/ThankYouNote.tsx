import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouNote: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-5xl font-bold text-blue-400 mb-8 font-thank-you">
          Thank you!
        </h1>
        <p className="text-primary-dark mb-3">
          Thanks for signing up to The Gym -{" "}
          <span className="font-bold ">
            Rwanda&#39;s most intensive platform.
          </span>
        </p>
          <p className="text-xl text-primary-dark mb-5">
            Check your email inbox, a confirmation email has been sent.
          </p>
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default ThankYouNote;
