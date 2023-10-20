import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

type ErrorType = {
  message?: string
}

const Error = () => {
  const error = useRouteError() as ErrorType
  return (
    <div>
      <h1>Error</h1>
      <p>{error?.message}</p>
      <Link to="/">Back to home page</Link>
    </div>
  )
  
};

export default Error;
