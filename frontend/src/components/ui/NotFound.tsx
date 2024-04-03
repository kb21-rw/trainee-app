import React from "react";

interface NotFoundProps {
  type: "User" | "Form";
}

const NotFound: React.FC<NotFoundProps> = ({ type }) => {
  const message = type === "User" ? "User Not Found" : "Form Not Found";

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-12 text-center shadow-xl space-y-4 w-1/4">
        <h1 className="mb-4 text-4xl font-bold">Ooops!</h1>
        <p className="text-gray-600">{message}</p>
        <div className="w-full flex items-center justify-center">
          <div className="bg-primary-dark text-white py-3.5 px-6 rounded-md font-medium text-base flex items-center justify-center">Try again</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
