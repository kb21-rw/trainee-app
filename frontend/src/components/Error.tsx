import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

type ErrorType = {
  message?: string
}

const Error = () => {
  const error = useRouteError() as ErrorType
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl">Error 🫤</h1>
      <p className="m-3 text-xl">{error?.message}</p>
      <Link to="/" className="m-3 underline">Back to home page</Link>
    </div>
  )
  
};

export default Error;
