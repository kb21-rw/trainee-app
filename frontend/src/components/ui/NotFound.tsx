import React from "react";

interface NotFoundProps {
  type: "User" | "Form" | "Applicant";
}

const NotFound: React.FC<NotFoundProps> = ({ type }) => {
  let message;
  switch (type) {
    case "User":
      message = "User Not Found";
      break;
    case "Form":
      message = "Form Not Found";
      break;
    case "Applicant":
      message = "Applicant Not Found on that Form";
      break;
    default:
      message = "Not Found";
  }

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-12 text-center shadow-xl space-y-10 w-1/4">
        <h1 className="bg-primary-dark text-white py-3.5 px-6 text-xl flex items-center justify-center font-bold">
          Ooops!
        </h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default NotFound;
