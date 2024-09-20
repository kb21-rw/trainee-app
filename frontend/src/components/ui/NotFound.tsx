import React from "react";

interface NotFoundProps {
  type: "User" | "Form";
}

const NotFound: React.FC<NotFoundProps> = ({ type }) => {
  const message = type === "User" ? "No user found" : "No form found";

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-12 text-center shadow-xl space-y-10 w-1/4">
        <h1 className="bg-primary-dark text-white py-3.5 px-6 text-xl flex items-center justify-center font-bold">Ooops!</h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default NotFound;
