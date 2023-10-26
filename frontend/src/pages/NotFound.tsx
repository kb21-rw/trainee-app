import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button onClick={() => navigate(-1)}>Back</button>
      <img
        src="https://media.istockphoto.com/id/1302333331/photo/error-404-3d-rendering-page-concept.jpg?s=612x612&w=0&k=20&c=jWX7N2URkaB-DGpbcnoclXRFdwsG0C78EmWW_v_cZCE="
        alt=""
      />
    </div>
  );
};

export default NotFound;
