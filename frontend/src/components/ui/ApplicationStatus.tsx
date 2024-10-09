import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface ApplicationStatusProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink: string;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  heading,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div>
      <div className="text-center flex items-center flex-col">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            {heading}
          </h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center border border-gray-300 rounded-lg p-6 shadow-lg space-y-4">
        <p className="text-center text-gray-500">{description}</p>

        <div>
          <Button>
            <Link to={buttonLink}>{buttonText}</Link>
          </Button>
        </div>

        <div className="text-gray-600 text-sm">
          Learn more about The Gym software developer trainee program{" "}
          <a
            href="https://www.the-gym.rw/"
            className="text-blue-600 underline"
          >
            here
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
