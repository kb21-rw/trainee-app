import React from "react";

interface ApplicationStatusProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  heading,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <>
      <div className="text-center flex items-center flex-col">
        <h1 className="text-2xl font-medium text-gray-600 mb-8 text-center">
          {heading}
        </h1>
      </div>
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center border border-gray-300 rounded-lg p-6 shadow-lg space-y-4">
        <p className="text-center text-gray-500">{description}</p>

        <a
          className="bg-primary-dark text-white px-6 py-3 rounded-md"
          href={buttonLink}
        >
          {buttonText}
        </a>

        <div className="text-gray-600 text-sm text-center">
          Learn more about The Gym software developer trainee program{" "}
          <a href="https://www.the-gym.rw/" className="text-blue-600 underline">
            here
          </a>
          .
        </div>
      </div>
    </>
  );
};

export default ApplicationStatus;
