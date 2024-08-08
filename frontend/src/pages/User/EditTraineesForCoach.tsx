import React, { useState } from "react";
import { useGetTraineesForCoachQuery } from "../../features/user/apiSlice";
import UserTable from "../../components/ui/UserTable";
import UserTableHeader from "../../components/ui/UserTableHeader";
import { getJWT, getTraineesForCoach } from "../../utils/helper";
import {
  usersPerPageValues,
  traineeTableSortingValues,
  editTraineeTableHeaders,
  editTraineeTableItems,
} from "../../utils/data";

const EditTraineesForCoaches = () => {
  const jwt = getJWT()
  const [query, setQuery] = useState("");
  const { data, isFetching: isGetMyTraineesLoading } =
    useGetTraineesForCoachQuery({
      jwt,
      query,
    });
  const myTraineesList = getTraineesForCoach(data, editTraineeTableItems);

  return (
    <div className="py-8">
      <UserTableHeader
        setQuery={setQuery}
        sortingValues={traineeTableSortingValues}
        usersPerPageValues={usersPerPageValues}
        userType="Trainee"
      />
      <UserTable
        headers={editTraineeTableHeaders}
        data={myTraineesList}
        isLoading={isGetMyTraineesLoading}
      />
    </div>
  );
};

export default EditTraineesForCoaches;