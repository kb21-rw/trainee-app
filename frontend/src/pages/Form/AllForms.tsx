import React, { useState } from "react";
import SearchInput from "../../components/ui/SearchInput";
import {
  useGetAllFormsQuery,
} from "../../features/user/apiSlice";
import FormCard from "../../components/ui/FormCard";
import { IFormType } from "../../utils/types";
import Loader from "../../components/ui/Loader";
import NotFound from "../../components/ui/NotFound";
import { getJWT } from "../../utils/helper";
import CreateFormDropdown from "../../components/ui/CreateFormDropdown";

const AllForms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const jwt: string = getJWT();
  const { data, isFetching } = useGetAllFormsQuery({
    jwt,
    searchString: searchQuery,
  });

  const forms=data?.forms;

  return (
    <div className="py-12">
      <div className="flex justify-between items-center my-5">
        <SearchInput setSearchQuery={setSearchQuery} />  
        <CreateFormDropdown />
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
