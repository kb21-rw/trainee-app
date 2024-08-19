import React, { useState } from "react";
import { useGetApplicantsQuery } from "../../features/user/apiSlice";
import { getApplicants, getJWT } from "../../utils/helper";
import UserTableHeader from "../../components/ui/UserTableHeader";
import {
  applicantTableDataItems,
  applicantTableHeaders,
  applicantTableSortingValues,
  applicantsPerPage,
} from "../../utils/data";
import UserTable from "../../components/ui/UserTable";
import DropOrEnrollModal from "../../components/modals/DropOrEnrollModal";
import { AiOutlineWarning } from "react-icons/ai";
import { ApplicantDecision } from "../../utils/types";

const Applicants = () => {
  const jwt: string = getJWT();
  const [query, setQuery] = useState("");
  const [decideForUserId, setDecideForUserId] = useState<string | null>(
    null,
  );
  const [isRejectUserModalOpen, setIsRejectUserModalOpen] =
    useState<boolean>(false);
  const [isAcceptUserModalOpen, setIsAcceptUserModalOpen] =
    useState<boolean>(false);
  const {
    data,
    isFetching: isGettingAllApplicantsLoading,
    isError,
  } = useGetApplicantsQuery({
    jwt,
    query,
  });

  const applicantsData = data?.map((item: any) => item.applicants);

  const applicantList = getApplicants(
    applicantsData?.[0],
    applicantTableDataItems,
  );

  const userDecision = applicantList?.find(
    (user) => user[0] == decideForUserId,
  );


  const userName = userDecision ? userDecision[2] : "";
  const userEmail = userDecision ? userDecision[3] : "";


  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <AiOutlineWarning className="text-red-500 text-4xl mb-4" />
        <p className="text-red-500 font-semibold text-lg">
          Error fetching applicants
        </p>
        <p className="text-gray-600 mb-4">
          Something went wrong while trying to load the data.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 space-y-5">
      <UserTableHeader
        setQuery={setQuery}
        sortingValues={applicantTableSortingValues}
        usersPerPageValues={applicantsPerPage}
        userType="Applicant"
      />
      <UserTable
        headers={applicantTableHeaders}
        data={applicantList}
        actions={[
          {
            type: "reject",
            actionCaller: async (user: string) => {
              await setDecideForUserId(user[0]);
              setIsRejectUserModalOpen(true);
            },
          },
          {
            type: "accept",
            actionCaller: async (user: string) => {
              await setDecideForUserId(user[0]);
              setIsAcceptUserModalOpen(true);
            },
          },
        ]}
        isLoading={isGettingAllApplicantsLoading}
        hasResponse={true}
      />
      {isRejectUserModalOpen && (
        <DropOrEnrollModal
          closePopup={() => setIsRejectUserModalOpen(false)}
          userName={userName}
          userEmail={userEmail}
          decideForUserId={decideForUserId}
          decision={ApplicantDecision.Rejected}
          jwt={jwt}
        />
      )}
      {isAcceptUserModalOpen && (
        <DropOrEnrollModal
          closePopup={() => setIsAcceptUserModalOpen(false)}
          userName={userName}
          userEmail={userEmail}
          decideForUserId={decideForUserId}
          decision={ApplicantDecision.Accepted}
          jwt={jwt}
        />
      )}
    </div>
  );
};

export default Applicants;
