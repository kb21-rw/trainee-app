import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useGetMyTraineesQuery } from "../../features/user/apiSlice";
import EditTrainee from "../../components/modals/EditTrainee";
import UserTable from "../../components/ui/UserTable";
import UserTableHeader from "../../components/ui/UserTableHeader";

const EditMyTrainees = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const [query, setQuery] = useState("");
  const { data, isFetching: isGetMyTraineesLoading } = useGetMyTraineesQuery({
    jwt,
    query,
  });
  const [editTrainee, setEditTrainee] = useState<any>(null);
  const getMyTrainees = () => {
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
      <UserTableHeader setQuery={setQuery} />
      <UserTable
        headers={["No", "Name", "Email", "Coach", "Action"]}
        data={getMyTrainees()}
        actions={[{ type: "edit", actionCaller: setEditTrainee }]}
        isLoading={isGetMyTraineesLoading}
      />

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

export default EditMyTrainees;
