/* eslint-disable no-unused-vars */
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

const Applicants = () => {
  const jwt: string = getJWT();
  const [query, setQuery] = useState("");
  const {
    data,
    isFetching: isGettingAllApplicantsLoading,
    isError,
  } = useGetApplicantsQuery({
    jwt,
    query,
  });

  const applicantsData = data?.map((item: any) => item.applicants);

  const Applicantlist = getApplicants(
    applicantsData?.[0],
    applicantTableDataItems,
  );
  console.log(query);
  console.log(applicantsData)

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
        data={Applicantlist}
        actions={[
          { type: "reject", actionCaller: () => {} },
          { type: "accept", actionCaller: () => {} },
        ]}
        isLoading={isGettingAllApplicantsLoading}
        response={true}
      />
    </div>
  );
};

export default Applicants;
