import React from "react";
import Button from "./Button";

interface NotFoundProps {
  type: "User" | "Form";
}

const NotFound: React.FC<NotFoundProps> = ({ type }) => {
  const message = type === "User" ? "User Not Found" : "Form Not Found";

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-12 text-center shadow-xl space-y-4">
        <h1 className="mb-4 text-4xl font-bold">{message}</h1>
        <p className="text-gray-600">Could not find {type}</p>
        <div className="w-full flex items-center justify-center">
          <Button variant="small">Try again</Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
