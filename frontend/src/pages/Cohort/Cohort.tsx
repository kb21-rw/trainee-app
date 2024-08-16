/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import UserTableHeader from "../../components/ui/UserTableHeader";
import {
  cohortTableDataItems,
  cohortTableHeaders,
  cohortTableSortingValues,
  cohortsPerPage,
} from "../../utils/data";
import Button from "../../components/ui/Button";
import PlusIcon from "../../assets/PlusIcon";
import { getCohorts, getJWT } from "../../utils/helper";
import AddingCohortModal from "../../components/modals/AddingCohort";
import UserTable from "../../components/ui/UserTable";
import { useGetAllCohortsQuery } from "../../features/user/apiSlice";

const Cohort = () => {
  const jwt: string = getJWT();
  const [query, setQuery] = useState("");
  const [isAddingCohort, setIsAddingCohort] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {data, isFetching: isGetAllCohorts, error} = useGetAllCohortsQuery(jwt)

  console.log(data)

  const cohortList = getCohorts(data, cohortTableDataItems)

  return (
    <div className="py-12 space-y-5">
      <div className="flex justify-end">
        <Button onClick={() => setIsAddingCohort(true)}>
          <div className="flex items-center right-0">
            <PlusIcon /> <span>Add Cohort</span>
          </div>
        </Button>
      </div>
      <UserTableHeader
        setQuery={setQuery}
        sortingValues={cohortTableSortingValues}
        usersPerPageValues={cohortsPerPage}
        userType="Cohort"
      />
      <UserTable
        headers={cohortTableHeaders}
        data={cohortList}
        actions={[
          { type: "edit", actionCaller: () => {} },
        ]}
        isLoading={isLoading}
      />
      {isAddingCohort && (
        <AddingCohortModal
          jwt={jwt}
          closePopup={() => setIsAddingCohort(false)}
        />
      )}
    </div>
  );
};

export default Cohort;
