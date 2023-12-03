import React from "react";
import { useGetFormQuery } from "../../features/user/apiSlice";
import Cookies from "universal-cookie";
import Loader from "../../components/ui/Loader";
import { useNavigate, useParams } from "react-router-dom";
import EditForm from "../../components/ui/EditForm";
import Back from "../../assets/Back";

const SingleForm = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const id = useParams().id || "";
  const jwt = cookie.get("jwt");
  const { data, isFetching } = useGetFormQuery({ id, jwt });
  return (
    <div className="py-12 max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)}>
        <Back />
      </button>
      {isFetching ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <EditForm data={data} id={id} />
        </div>
      )}
    </div>
  );
};

export default SingleForm;
