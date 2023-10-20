import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useGetMyTraineesQuery } from "../../features/user/apiSlice";
import EditTrainee from "../../components/modals/EditTrainee";
import UserTable from "../../components/ui/UserTable";
import UserTableHeader from "../../components/ui/UserTableHeader";
import { getTraineesForCoach } from "../../utils/helper";

const EditTraineesForCoaches = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const [query, setQuery] = useState("");
  const { data, isFetching: isGetMyTraineesLoading } = useGetMyTraineesQuery({
    jwt,
    query,
  });
  const [editTraineeData, setEditTraineeData] = useState<string[] | null>(null);
  const sortingValues = [
    { title: "Entry", value: "entry" },
    { title: "Name", value: "name" },
  ];
  const usersPerPageValues = [10, 20, 30, 40, 50, 100];
  const headers = ["No", "Name", "Email", "Coach", "Action"];
  const dataItems = ["_id", "name", "email", "coach"];
  const myTraineesList = getTraineesForCoach(data, dataItems);

  return (
    <div className="py-8">
      <UserTableHeader
        setQuery={setQuery}
        sortingValues={sortingValues}
        usersPerPageValues={usersPerPageValues}
      />
      <UserTable
        headers={headers}
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
