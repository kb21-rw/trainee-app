import React, { useState } from "react";
import {
  useGetApplicantsQuery,
} from "../../features/user/apiSlice";
import { getApplicants, getJWT } from "../../utils/helper";
import UserTableHeader from "../../components/ui/UserTableHeader";
import {
  applicantTableDataItems,
  applicantTableHeaders,
  applicantTableSortingValues,
  applicantsPerPage,
} from "../../utils/data";
import UserTable from "../../components/ui/UserTable";
import RejectOrDropModal from "../../components/modals/RejectOrDropModal";
import {AiOutlineWarning} from 'react-icons/ai';

const Applicants = () => {
  const jwt: string = getJWT();
  const [query, setQuery] = useState("");
  const [userToBeRejectedId, setUserToBeRejectedId] = useState<string | null>(
    null,
  );
  const [isRejectUserModalOpen, setIsRejectUserModalOpen] = useState<boolean>(false);
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

  const userToBeRejected = applicantList?.find(
    (user) => user[0] == userToBeRejectedId,
  );

  const userToBeRejectedIdName = userToBeRejected ? userToBeRejected[2] : "";
  const userToBeRejectedEmail = userToBeRejected ? userToBeRejected[3] : "";

  if(isError) {
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
    )
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
              await setUserToBeRejectedId(user[0]);
              setIsRejectUserModalOpen(true);
            },
          },
          { type: "accept", actionCaller: () => {} },
        ]}
        isLoading={isGettingAllApplicantsLoading}
        hasResponse={true}
      />
      {isRejectUserModalOpen && (
        <RejectOrDropModal
          closePopup={() => setIsRejectUserModalOpen(false)}
          userName={userToBeRejectedIdName}
          userEmail={userToBeRejectedEmail}
          userToBeRejectedId={userToBeRejectedId}
          jwt={jwt}
        />
      )}
    </div>
  );
};

export default Applicants;
