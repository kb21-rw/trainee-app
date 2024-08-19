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

  const {data, isFetching: isGetAllCohorts, error} = useGetAllCohortsQuery({jwt, query})

  const cohortList = getCohorts(data, cohortTableDataItems)

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh] bg-gray-50 mt-10">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <p className="text-red-600 text-xl font-semibold">Error Getching Cohorts</p>
          <p className="text-gray-600 mt-2">Something went wrong while trying to load the cohorts.</p>
        </div>
      </div>
    );
  }

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
        isLoading={isGetAllCohorts}
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
