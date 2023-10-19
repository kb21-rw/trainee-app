import React, { useEffect, useState, useRef } from "react";
import Button from "../../components/ui/Button";
import Plus from "../../assets/Plus";
import Cookies from "universal-cookie";
import { useGetAllCoachesQuery } from "../../features/user/apiSlice";
import { useDeleteCoachMutation } from "../../features/user/apiSlice";
import AddingCoachModal from "../../components/modals/AddingCoachModal";
import UserTable from "../../components/ui/UserTable";
import EditCoach from "../../components/modals/EditCoach";
import UserTableHeader from "../../components/ui/UserTableHeader";

const CoachesInfo = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const [query, setQuery] = useState("");
  const { data, isFetching: isGetAllCoachesLoading } = useGetAllCoachesQuery({
    jwt,
    query,
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [editCoach, setEditCoach] = useState<any>(null);
  const [deleteCoach, { isFetching: isDeleteCoachLoading }] =
    useDeleteCoachMutation();
  const handleDeleteCoach = (id: string) => {
    const result = deleteCoach({ jwt, id });
  };

  const getCoaches = () => {
    const dataItems = ["_id", "name", "email", "role"];
    const coachesData = data?.map(
      (coachData: any) =>
        dataItems?.map((dataItem: string) => coachData[dataItem]),
    );
    return coachesData;
  };

  return (
    <div>
      <div className="py-8">
        <div className="flex justify-end items-center my-6">
          <Button clickHandler={() => setOpenPopup(!openPopup)} variant="small">
            <Plus />
            <span>Add coach</span>
          </Button>
        </div>
        <UserTableHeader setQuery={setQuery} />
        <UserTable
          headers={["No", "Name", "Email", "Role", "Action"]}
          data={getCoaches()}
          actions={[
            { type: "edit", actionCaller: setEditCoach },
            { type: "delete", actionCaller: handleDeleteCoach },
          ]}
          isLoading={isDeleteCoachLoading || isGetAllCoachesLoading}
        />
      </div>
      {openPopup && (
        <AddingCoachModal jwt={jwt} closePopup={() => setOpenPopup(false)} />
      )}
      {editCoach && (
        <EditCoach
          jwt={jwt}
          closePopup={() => setEditCoach(null)}
          coach={editCoach}
        />
      )}
    </div>
  );
};

export default CoachesInfo;
