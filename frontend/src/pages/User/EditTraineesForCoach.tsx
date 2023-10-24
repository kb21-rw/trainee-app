import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useGetTraineesForCoachQuery } from "../../features/user/apiSlice";
import EditTrainee from "../../components/modals/EditTrainee";
import UserTable from "../../components/ui/UserTable";
import UserTableHeader from "../../components/ui/UserTableHeader";
import { getTraineesForCoach } from "../../utils/helper";
import {
  usersPerPageValues,
  traineeTableDataItems,
  traineeTableHeaders,
  traineeTableSortingValues,
} from "../../utils/data";

const EditTraineesForCoaches = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const [query, setQuery] = useState("");
  const { data, isFetching: isGetMyTraineesLoading } =
    useGetTraineesForCoachQuery({
      jwt,
      query,
    });
  const [editTraineeData, setEditTraineeData] = useState<string[] | null>(null);
  const myTraineesList = getTraineesForCoach(data, traineeTableDataItems);

  return (
    <div className="py-8">
      <UserTableHeader
        setQuery={setQuery}
        sortingValues={traineeTableSortingValues}
        usersPerPageValues={usersPerPageValues}
      />
      <UserTable
        headers={traineeTableHeaders}
        data={myTraineesList}
        actions={[{ type: "edit", actionCaller: setEditTraineeData }]}
        isLoading={isGetMyTraineesLoading}
      />

      {editTraineeData && (
        <EditTrainee
          jwt={jwt}
          closePopup={() => setEditTraineeData(null)}
          traineeData={editTraineeData}
          role="COACH"
        />
      )}
    </div>
  );
};

export default EditTraineesForCoaches;
