import React from "react";
import { Link } from "react-router-dom";

interface CohortInfoProps {
  cohortTitle: string;
  applicationDeadline: string;
  trainingStartDate: string;
  programBenefits: {
    title: string;
    description: string;
  }[];
}

const CohortInfo: React.FC<CohortInfoProps> = ({
  cohortTitle,
  applicationDeadline,
  trainingStartDate,
  programBenefits,
}) => {
  return (
    <>
      <div className="text-center flex items-center flex-col md:space-y-10 px-4 sm:px-0 w-full md:mt-5">
        <p className="text-gray-600 mb-4 sm:mb-8 flex flex-col text-sm sm:text-base space-y-3">
          <span>
            Apply for our various training programs and enhance your skills.
          </span>
          <span>Start your journey with us today!</span>
        </p>
      </div>
      <div className="max-w-2xl mx-auto border border-gray-300 rounded-lg p-4 sm:p-6 shadow-lg">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4">
          {cohortTitle}
        </h1>

        <div className="w-full sm:w-3/4 mb-4 flex items-center justify-between">
          <p className="text-sm sm:text-lg font-medium text-gray-600">
            Application Deadline:
          </p>
          <p className="text-sm sm:text-lg text-gray-800 font-semibold underline">
            {applicationDeadline}
          </p>
        </div>

        <div className="w-full sm:w-3/4 mb-4 flex items-center justify-between">
          <p className="text-sm sm:text-lg font-medium text-gray-600">
            Training Start Date:
          </p>
          <p className="text-sm sm:text-lg text-gray-800 font-semibold underline">
            {trainingStartDate}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm sm:text-lg font-medium text-gray-800">
            What you will gain:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 text-sm sm:text-base">
            {programBenefits.map((benefit, index) => (
              <li key={index}>
                <strong>{benefit.title}:</strong> {benefit.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-gray-600 text-xs sm:text-sm">
          Learn more about The Gym software developer trainee program{" "}
          <Link
            to="https://www.the-gym.rw/"
            className="text-blue-600 underline"
          >
            here
          </Link>
          .
        </div>
      </div>
    </>
  );
};

export default CohortInfo;
