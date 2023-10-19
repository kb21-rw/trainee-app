import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Plus from "../../assets/Plus";
import Cookies from "universal-cookie";
import {
  useDeleteTraineeMutation,
  useGetAllTraineesQuery,
} from "../../features/user/apiSlice";
import AddingTraineeModal from "../../components/modals/AddingTraineeModal";
import EditTrainee from "../../components/modals/EditTrainee";
import UserTable from "../../components/ui/UserTable";
import UserTableHeader from "../../components/ui/UserTableHeader";

const TraineesInfo = () => {
  const cookies = new Cookies();
  const jwt: string = cookies.get("jwt");
  const [query, setQuery] = useState("");
  const [editTrainee, setEditTrainee] = useState<any>(null);
  const { data, isFetching: isGetAllTraineesLoading } = useGetAllTraineesQuery({
    jwt,
    query,
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteTrainee, { isFetching: isDeleteTraineeLoading }] =
    useDeleteTraineeMutation();
  const handleDeleteTrainee = async (id: string) => {
    await deleteTrainee({ jwt, id });
  };

  const getTrainees = () => {
    const dataItems = ["_id", "name", "email", "coach"];
    const traineesData = data?.map(
      (traineeData: any) =>
        dataItems?.map((dataItem: string) =>
          dataItem === "coach"
            ? traineeData?.coach?.name || "No coach assigned"
            : traineeData[dataItem],
        ),
    );
    return traineesData;
  };
  return (
    <div className="py-8">
      <div className="flex justify-end items-center my-6">
        <Button clickHandler={() => setOpenPopup(!openPopup)} variant="small">
          <Plus />
          <span>Add trainee</span>
        </Button>
      </div>
      <UserTableHeader setQuery={setQuery} />
      <UserTable
        headers={["No", "Name", "Email", "Coach", "Action"]}
        data={getTrainees()}
        actions={[
          { type: "edit", actionCaller: setEditTrainee },
          { type: "delete", actionCaller: handleDeleteTrainee },
        ]}
        isLoading={isDeleteTraineeLoading || isGetAllTraineesLoading}
      />
      {openPopup && (
        <AddingTraineeModal jwt={jwt} closePopup={() => setOpenPopup(false)} />
      )}
      {editTrainee && (
        <EditTrainee
          jwt={jwt}
          closePopup={() => setEditTrainee(null)}
          trainee={editTrainee}
        />
      )}
    </div>
  );
};

export default TraineesInfo;
