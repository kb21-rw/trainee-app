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
  const headers = ["No", "Name", "Email", "Coach", "Action"];
  const dataItems = ["_id", "name", "email", "coach"];
  const traineesList: string[][] = getTrainees(data, dataItems);

  return (
    <div className="py-8">
      <div className="flex justify-end items-center my-6">
        <Button clickHandler={() => setIsAddingTrainee(true)} variant="small">
          <Plus />
          <span>Add trainee</span>
        </Button>
      </div>
      <UserTableHeader setQuery={setQuery} />
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
        />
      )}
    </div>
  );
};

export default TraineesInfo;
