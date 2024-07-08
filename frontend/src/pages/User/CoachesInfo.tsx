import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useGetAllCoachesQuery } from "../../features/user/apiSlice";
import { useDeleteCoachMutation } from "../../features/user/apiSlice";
import AddingCoachModal from "../../components/modals/AddingCoach";
import UserTable from "../../components/ui/UserTable";
import EditCoach from "../../components/modals/EditCoach";
import UserTableHeader from "../../components/ui/UserTableHeader";
import { getCoaches } from "../../utils/helper";
import {
  usersPerPageValues,
  coachTableSortingValues,
  coachTableDataItems,
  coachTableHeaders,
} from "../../utils/data";
import DeleteModal from "../../components/modals/DeleteModal";
import Button from "../../components/ui/Button";
import PlusIcon from "../../assets/PlusIcon";

const CoachesInfo = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const [query, setQuery] = useState("");
  const { data, isFetching: isGetAllCoachesLoading } = useGetAllCoachesQuery({
    jwt,
    query,
  });
  const [isAddingCoach, setIsAddingCoach] = useState(false);
  const [editCoachData, setEditCoachData] = useState<string[] | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCoach, { isFetching: isDeleteCoachLoading }] =
    useDeleteCoachMutation();
  const [coachTobeDeletedId, setCoachTobeDeletedId] = useState<string | null>(
    null
  );

  const handleDeleteCoach = async () => {
    if (coachTobeDeletedId) await deleteCoach({ jwt, id: coachTobeDeletedId });
    setShowDeleteModal(false);
  };

  const coachesList: string[][] = getCoaches(data, coachTableDataItems);

  const coachTobeDeleted = coachesList?.find(
    (coach) => coach[0] == coachTobeDeletedId
  );
  const coachTobeDeletedName = coachTobeDeleted ? coachTobeDeleted[1] : "";

  return (
    <div>
      <div className="py-8">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsAddingCoach(true)}>
            <div className="flex items-center right-0">
              <PlusIcon /> <span>Add coach</span>
            </div>
          </Button>
        </div>
        <UserTableHeader
          setQuery={setQuery}
          sortingValues={coachTableSortingValues}
          usersPerPageValues={usersPerPageValues}
          userType="Coach"
        />
        <UserTable
          headers={coachTableHeaders}
          data={coachesList}
          actions={[
            { type: "edit", actionCaller: setEditCoachData },
            {
              type: "delete",
              actionCaller: async (id: string) => {
                await setCoachTobeDeletedId(id);
                setShowDeleteModal(true);
              },
            },
          ]}
          isLoading={isDeleteCoachLoading || isGetAllCoachesLoading}
        />
      </div>
      {showDeleteModal && (
        <DeleteModal
          title="a Coach"
          closePopup={() => setShowDeleteModal(false)}
          onDelete={handleDeleteCoach}
          name={coachTobeDeletedName}
        />
      )}
      {isAddingCoach && (
        <AddingCoachModal
          jwt={jwt}
          closePopup={() => setIsAddingCoach(false)}
        />
      )}
      {editCoachData && (
        <EditCoach
          jwt={jwt}
          closePopup={() => setEditCoachData(null)}
          coachData={editCoachData}
        />
      )}
    </div>
  );
};

export default CoachesInfo;
