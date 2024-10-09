/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { ButtonSize, ButtonVariant } from "../../utils/types";
import Button from "../../components/ui/Button";
import CohortInfo from "../../components/ui/CohortInfo";
import ApplicationStatus from "../../components/ui/ApplicationStatus";
import { deadLineExceededInfo } from "../../utils/data";
import { useGetFormForApplicantsQuery } from "../../features/user/apiSlice";
import { applicationStatusHandler, getJWT } from "../../utils/helper";

const HomePage = () => {
  const jwt: string = getJWT();
  const {data: applicationForm} = useGetFormForApplicantsQuery(jwt)

  const {isApplicationOpen, isDeadlineExceeded} = applicationStatusHandler(applicationForm?.startDate, applicationForm?.endDate)

   

  return (
    <div className="h-full flex flex-col items-center justify-between mt-4 w-full">
      {isApplicationOpen && (
        <div className="md:container md:mx-auto px-6 flex flex-col items-center justify-center">
          <CohortInfo />
          <div className="my-10 flex items-center justify-center">
            <div>
              <Button variant={ButtonVariant.Primary} size={ButtonSize.Large}>
                <Link to="/apply">Apply now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      {isDeadlineExceeded && (
        <ApplicationStatus
          heading={deadLineExceededInfo.heading}
          description={deadLineExceededInfo.description}
          buttonLink={deadLineExceededInfo.buttonLink}
          buttonText={deadLineExceededInfo.buttonText}
        />
      )}
    </div>
  );
};

export default HomePage;
