import React from "react";
import { useGetSingleFormQuery } from "../../features/user/apiSlice";
import Cookies from "universal-cookie";
import Loader from "../../components/ui/Loader";
import { useParams } from "react-router-dom";
import CreateForm from "../../components/ui/CreateForm";

const SingleForm = () => {
  const cookie = new Cookies();
  const { id } = useParams();
  const jwt = cookie.get("jwt");
  const { data, isFetching } = useGetSingleFormQuery({ id, jwt });
  return (
    <div className="py-12">
      {isFetching ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <CreateForm data={data} />
        </div>
      )}
    </div>
  );
};

export default SingleForm;
