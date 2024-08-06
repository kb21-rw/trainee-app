import React, { useState } from "react";
import {
  useDeleteTraineeMutation,
  useGetAllTraineesQuery,
} from "../../features/user/apiSlice";
import AddingTraineeModal from "../../components/modals/AddingTrainee";
import EditTrainee from "../../components/modals/EditTrainee";
import UserTable from "../../components/ui/UserTable";
import UserTableHeader from "../../components/ui/UserTableHeader";
import { getJWT, getTrainees } from "../../utils/helper";
import {
  usersPerPageValues,
  traineeTableDataItems,
  traineeTableHeaders,
  traineeTableSortingValues,
} from "../../utils/data";
import DeleteModal from "../../components/modals/DeleteModal";
import Button from "../../components/ui/Button";
import PlusIcon from "../../assets/PlusIcon";

const TraineesInfo = () => {
  const jwt: string = getJWT()
  const [query, setQuery] = useState("");
  const [editTrainee, setEditTrainee] = useState<string[] | null>(null);
  const { data, isFetching: isGetAllTraineesLoading } = useGetAllTraineesQuery({
    jwt,
    query,
  });
  const [isAddingTrainee, setIsAddingTrainee] = useState(false);
  const [deleteTrainee, { isFetching: isDeleteTraineeLoading }] =
    useDeleteTraineeMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [traineeTobeDeletedId, setTraineeTobeDeletedId] = useState<
    string | null
  >(null);

  const handleDeleteTrainee = async () => {
    if (traineeTobeDeletedId)
      await deleteTrainee({ jwt, id: traineeTobeDeletedId });
    setShowDeleteModal(false);
  };

  const traineesList: string[][] = getTrainees(data, traineeTableDataItems);

  const traineeTobeDeleted = traineesList?.find(
    (trainee) => trainee[0] == traineeTobeDeletedId
  );
  const traineeTobeDeletedName = traineeTobeDeleted
    ? traineeTobeDeleted[1]
    : "";

  return (
    <div className="py-8">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsAddingTrainee(true)}>
          <div className="flex items-center right-0">
            <PlusIcon /> <span>Add trainee</span>
          </div>
        </Button>
      </div>
      <UserTableHeader
        setQuery={setQuery}
        sortingValues={traineeTableSortingValues}
        usersPerPageValues={usersPerPageValues}
        userType="Trainee"
      />
      <UserTable
        headers={traineeTableHeaders}
        data={traineesList}
        actions={[
          { type: "edit", actionCaller: setEditTrainee },
          {
            type: "delete",
            actionCaller: async (id: string) => {
              await setTraineeTobeDeletedId(id);
              setShowDeleteModal(true);
            },
          },
        ]}
        isLoading={isDeleteTraineeLoading || isGetAllTraineesLoading}
      />
      {showDeleteModal && (
        <DeleteModal
          title="a Trainee"
          name={traineeTobeDeletedName}
          closePopup={() => setShowDeleteModal(false)}
          onDelete={handleDeleteTrainee}
        />
      )}
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
          role="Admin"
        />
      )}
    </div>
  );
};

export default TraineesInfo;
