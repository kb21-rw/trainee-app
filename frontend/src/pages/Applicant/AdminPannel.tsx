import React, { useState } from "react";
import Cookies from "universal-cookie";
import {
  useCreateFormMutation,
  useDeleteApplicantMutation,
  useGetAllApplicantsQuery,
} from "../../features/user/apiSlice";
import EditTrainee from "../../components/modals/EditTrainee";
import { getApplicants } from "../../utils/helper";
import {
  usersPerPageValues,
  traineeTableDataItems,
  traineeTableHeaders,
  traineeTableSortingValues,
} from "../../utils/data";
import AddButton from "../../components/ui/AddButton";
import { useNavigate } from "react-router-dom";
import ApplicantTable from "../../components/ui/ApplicantTable";
import ApplicantTableHeader from "../../components/ui/ApplicantTableHeader";

function AdminPannel() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const jwt: string = cookies.get("jwt");
  const [query, setQuery] = useState("");
  const [editApplicants, seteditApplicants] = useState<string[] | null>(null);
  const { data, isFetching: isGetApplicantsLoading } = useGetAllApplicantsQuery(
    {
      jwt,
      query,
    },
  );

  const [createForm] = useCreateFormMutation();

  const onClickAddApplicantsForm = async () => {
    const result = await createForm({
      jwt,
      body: { title: `Form ${data.length}` },
    });
    const id = result.data._id;
    navigate(`/applicantsform/${id}`);
  };

  const [deleteApplicants, { isFetching: isDeleteApplicantsLoading }] =
    useDeleteApplicantMutation();
  const handleDeleteApplicant = async (id: string) => {
    await deleteApplicants({ jwt, id });
  };

  const applicantsList: string[][] = getApplicants(data, traineeTableDataItems);

  return (
    <div className="py-8">
      <AddButton addHandler={onClickAddApplicantsForm}>Add form</AddButton>
      <ApplicantTableHeader
        setQuery={setQuery}
        sortingValues={traineeTableSortingValues}
        applicantsPerPageValues={usersPerPageValues}
        userType="Applicants"
      />
      <ApplicantTable
        headers={traineeTableHeaders}
        data={applicantsList}
        actions={[
          { type: "edit", actionCaller: seteditApplicants },
          { type: "delete", actionCaller: handleDeleteApplicant },
        ]}
        isLoading={isDeleteApplicantsLoading || isGetApplicantsLoading}
      />
      {editApplicants && (
        <EditTrainee
          jwt={jwt}
          closePopup={() => seteditApplicants(null)}
          traineeData={editApplicants}
          role="ADMIN"
        />
      )}
    </div>
  );
}

export default AdminPannel;
