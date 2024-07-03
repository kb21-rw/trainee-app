import React from "react";
import SuccessCheckMarkIcon from "../../assets/SuccessCheckMarkIcon";

const ApplicantHomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-primary-dark">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <SuccessCheckMarkIcon />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Your application has been submitted successfully!
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Thank you for applying. We will review your application and get back to you soon.
        </p>
        <div className="flex justify-center">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 bg-primary-dark hover:bg-blue-600 text-white font-semibold rounded-md transition-colors duration-300"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApplicantHomePage;
