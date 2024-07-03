import React, { useState } from "react";
import SearchInput from "../../components/ui/SearchInput";
import Plus from "../../assets/PlusIcon";
import {
  useCreateFormMutation,
  useGetAllFormsQuery,
} from "../../features/user/apiSlice";
import Cookies from "universal-cookie";
import FormCard from "../../components/ui/FormCard";
import { IFormType } from "../../utils/types";
import Loader from "../../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import NotFound from "../../components/ui/NotFound";
import Button from "../../components/ui/Button";
import { ButtonVariant } from "../../types";

const AllForms = () => {
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  const [createForm] = useCreateFormMutation();
  const { data, isFetching } = useGetAllFormsQuery({ searchString, jwt });
  const [clicked, setClick] = useState(false);
  const onClickAddForm = async (type?: "APPLICANT") => {
    let requestBody: object;
    requestBody = { title: `Form ${data.length}` };
    if (type) {
      requestBody = { ...requestBody, type };
    }

    const result = await createForm({
      jwt,
      body: requestBody,
    });

    const id = result.data._id;
    if (clicked) {
      navigate(`/forms/${id}`);
    }
  };

  return (
    <div className="py-12">
      <div className="flex justify-between items-center my-5">
        <SearchInput setSearchQuery={setSearchString} />
        <div className="grid gap-1">
          <Button clickHandler={() => setClick(!clicked)} variant={ButtonVariant.Small}>
            <Plus />
            Add Form
          </Button>
          <div
            className={
              !clicked
                ? "hidden"
                : `grid text-white bg bg-primary-dark rounded-lg`
            }
          >
            <Button clickHandler={() => onClickAddForm("APPLICANT")}>
              Applicants
            </Button>
            <div className="border w-6/6"></div>
            <Button clickHandler={() => onClickAddForm()}>Trainee</Button>
          </div>
        </div>
      </div>
      {isFetching ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : data.length === 0 ? (
        <div className="flex w-screen h-[50vh]">
          <NotFound type="Form" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((form: IFormType, index: number) => (
            <FormCard form={form} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllForms;
