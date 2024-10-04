/* eslint-disable no-unused-vars */

import React from "react";
import { Link } from "react-router-dom";
import { ButtonSize, ButtonVariant } from "../../utils/types";
import Button from "../../components/ui/Button";
import CohortInfo from "../../components/ui/CohortInfo";

const HomePage = () => {
  
  const application = {
    description: "This is a new application form for the gym cohort 5",
    endDate: "2024-10-10T22:00:00.000Z",
    name: "Application form for Cohort 5 2025",
    questions: [],
    stages: [{}, {}],
    startDate: "2024-10-04T22:00:00.000Z",
    type: "Application",
  };

  return (
    <div className="h-full flex flex-col items-center justify-between mt-12">
      <div className="container mx-auto px-6 flex flex-col itemes-center justify-center">
        <CohortInfo />
        <div className="my-20 flex items-center justify-center">
          <div className="container mx-auto w-1/5">
            <Button variant={ButtonVariant.Primary} size={ButtonSize.Large}>
              <Link to="/apply">Apply now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
