import React from "react";
import { Link } from "react-router-dom";
import { ButtonVariant } from "../../utils/types";
import Button from "../../components/ui/Button";

const HomePage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-between mt-12">
      <div className="container mx-auto px-6">
        <div className="text-center flex items-center flex-col space-y-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              {"Welcome to The GYM's Application Portal"}
            </h1>
            <p className="text-gray-600 mb-8 flex flex-col">
              <span>
                <Link
                  to="/apply"
                  className="text-primary-dark hover:underline transition ease-in"
                >
                  Apply
                </Link>{" "}
                for our various training programs and enhance your skills.
              </span>
              <span>Start your journey with us today!</span>
            </p>
          </div>
        </div>
        <div className="mt-12 grid place-items-center">
          <div className="bg-white p-6 rounded-lg border shadow-md w-2/5">
            <h2 className="text-3xl font-semibold mb-2">
              The GYM Software Developer Trainee Program
            </h2>
            <p className="text-gray-600 mb-4">
              Rwanda&apos;s most intense software developer trainee program.
              This Training focuses on equiping young developers with the
              knowledge of software development on european standards and....
              <span className="text-primary-dark px-1 rounded-md transition hover:cursor-pointer hover:underline">
                Learn more
              </span>
            </p>
          </div>
        </div>
        <div className="w-full my-20 flex items-center justify-center animate-bounce">
          <Button variant={ButtonVariant.Primary}>
            <Link to="/apply">Apply now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
