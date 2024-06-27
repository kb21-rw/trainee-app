import React from "react";

const ApplicantHomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          Your application has been submitted successfully!
        </h1>
        <p className="text-lg text-gray-700">
          Thank you for applying. We will review your application and get back to you soon.
        </p>
      </div>
    </div>
  );
}

export default ApplicantHomePage;
