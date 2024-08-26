import React, { useState } from "react";
import SearchInput from "../../components/ui/SearchInput";
import {
  useCreateFormMutation,
  useGetAllFormsQuery,
} from "../../features/user/apiSlice";
import FormCard from "../../components/ui/FormCard";
import { IFormType } from "../../utils/types";
import Loader from "../../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import NotFound from "../../components/ui/NotFound";
import Button from "../../components/ui/Button";
import PlusIcon from "../../assets/PlusIcon";
import { getJWT } from "../../utils/helper";

const AllForms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const jwt: string = getJWT();
  const [createForm] = useCreateFormMutation();
  const [clicked, setClick] = useState(false);
  const { data, isFetching } = useGetAllFormsQuery({
    jwt,
    searchString: searchQuery,
  });
  const forms=data?.forms;

const getNextFormTitle = () => {
  let highestFormNumber = 0;
  forms.forEach((form: IFormType) => {
    const match = form.title.match(/^Form (\d+)$/);
    if (match) {
      const formNumber = parseInt(match[1], 10); 
      if (formNumber > highestFormNumber) {
        highestFormNumber = formNumber; 
      }
    }else{
      highestFormNumber=forms?.length;
    }
  });
  return `Form ${highestFormNumber + 1}`;
};

  const onClickAddForm = async (type?: "Applicant") => {
    const nextFormTitle = getNextFormTitle();
    let requestBody: object = { title: nextFormTitle};
    console.log(requestBody);
    if (type) {
      requestBody = { ...requestBody, type };
    }

    const {data:formData} = await createForm({
      jwt,
      body: requestBody,
    });
    console.log(formData)
    const id = formData?._id;
    if (clicked) {
      navigate(`/forms/${id}`);
    } 
  };

  return (
    <div className="py-12">
      <div className="flex justify-between items-center my-5">
        <SearchInput setSearchQuery={setSearchQuery} />  
        <div className="grid gap-1">
          <Button onClick={() => setClick(!clicked)}>
            <div className="flex items-center right-0">
              <PlusIcon /> <span>Add form</span>
            </div>
          </Button>
          <div
            className={
              !clicked
                ? "hidden"
                : `grid text-white bg bg-primary-dark rounded-lg`
            }
          >
            <Button onClick={() => onClickAddForm("Applicant")}>
              Applicants
            </Button>
            <div className="border w-6/6"></div>
            <Button onClick={() => onClickAddForm()}>Trainee</Button>
          </div>
        </div>
      </div>
      {isFetching ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : forms?.length === 0 ? (
        <div className="flex w-screen h-[50vh]">
          <NotFound type="Form" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {forms?.map((form: IFormType, index: number) => (
            <FormCard form={form} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllForms;
