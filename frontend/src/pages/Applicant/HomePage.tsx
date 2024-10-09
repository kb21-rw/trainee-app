import React from "react";
import { Link } from "react-router-dom";
import { ApplicationFormStatus, ButtonSize, ButtonVariant } from "../../utils/types";
import Button from "../../components/ui/Button";
import CohortInfo from "../../components/ui/CohortInfo";
import ApplicationStatus from "../../components/ui/ApplicationStatus";
import { deadLineExceededInfo, noOpenApplicationInfo } from "../../utils/data";
import { useGetFormForApplicantsQuery } from "../../features/user/apiSlice";
import { applicationStatusHandler, getJWT } from "../../utils/helper";
import Loader from "../../components/ui/Loader";

const HomePage = () => {
  const jwt: string = getJWT();
  const { data: applicationForm, isLoading } =
    useGetFormForApplicantsQuery(jwt);

  const applicationStatus = applicationStatusHandler(applicationForm);
  console.log(applicationStatus);
  console.log('application form', applicationForm)

  return (
    <div className="h-full flex flex-col items-center justify-center w-full">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      )}
      {applicationStatus.status === ApplicationFormStatus.OPEN && (
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
      {applicationStatus.status === ApplicationFormStatus.DEADLINE_PASSED && (
        <ApplicationStatus
          heading={deadLineExceededInfo.heading}
          description={deadLineExceededInfo.description}
          buttonLink={deadLineExceededInfo.buttonLink}
          buttonText={deadLineExceededInfo.buttonText}
        />
      )}
      {applicationStatus.status === ApplicationFormStatus.NO_APPLICATION && (
        <ApplicationStatus
          heading={noOpenApplicationInfo.heading}
          description={noOpenApplicationInfo.description}
          buttonLink={noOpenApplicationInfo.buttonLink}
          buttonText={noOpenApplicationInfo.buttonText}
        />
      )}
    </div>
  );
};

export default HomePage;
