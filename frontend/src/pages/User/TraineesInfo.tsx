import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Plus from "../../assets/Plus";
import Cookies from "universal-cookie";
import {
  useDeleteTraineeMutation,
  useGetAllTraineesQuery,
} from "../../features/user/apiSlice";
import AddingTraineeModal from "../../components/modals/AddingTrainee";
import EditTrainee from "../../components/modals/EditTrainee";
import UserTable from "../../components/ui/UserTable";
import UserTableHeader from "../../components/ui/UserTableHeader";
import { getTrainees } from "../../utils/helper";
import AddUserButton from "../../components/ui/AddUserButton";

const TraineesInfo = () => {
  const cookies = new Cookies();
  const jwt: string = cookies.get("jwt");
  const [query, setQuery] = useState("");
  const [editTrainee, setEditTrainee] = useState<string[] | null>(null);
  const { data, isFetching: isGetAllTraineesLoading } = useGetAllTraineesQuery({
    jwt,
    query,
  });
  const [isAddingTrainee, setIsAddingTrainee] = useState(false);
  const [deleteTrainee, { isFetching: isDeleteTraineeLoading }] =
    useDeleteTraineeMutation();
  const handleDeleteTrainee = async (id: string) => {
    await deleteTrainee({ jwt, id });
  };
  const sortingValues = [
    { title: "Entry", value: "entry" },
    { title: "Name", value: "name" },
  ];
  const usersPerPageValues = [10, 20, 30, 40, 50, 100];
  const headers = ["No", "Name", "Email", "Coach", "Action"];
  const dataItems = ["_id", "name", "email", "coach"];
  const traineesList: string[][] = getTrainees(data, dataItems);

  return (
    <div className="py-8">
      <AddUserButton addUserHandler={() => setIsAddingTrainee(true)}>
        Add trainee
      </AddUserButton>
      <UserTableHeader
        setQuery={setQuery}
        sortingValues={sortingValues}
        usersPerPageValues={usersPerPageValues}
      />
      <UserTable
        headers={headers}
        data={traineesList}
        actions={[
          { type: "edit", actionCaller: setEditTrainee },
          { type: "delete", actionCaller: handleDeleteTrainee },
        ]}
        isLoading={isDeleteTraineeLoading || isGetAllTraineesLoading}
      />
      {isAddingTrainee && (
        <AddingTraineeModal
          jwt={jwt}
          closePopup={() => setIsAddingTrainee(false)}
        />
      )}
      {editTrainee && (
        <EditTrainee
          jwt={jwt}
          closePopup={() => setEditTrainee(null)}
          traineeData={editTrainee}
          role="ADMIN"
        />
      )}
    </div>
  );
};

export default TraineesInfo;
