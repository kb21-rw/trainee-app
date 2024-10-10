import React, { useState } from "react";
import { useGetFormQuery } from "../../features/user/apiSlice";
import Loader from "../../components/ui/Loader";
import { useNavigate, useParams } from "react-router-dom";
import EditForm from "../../components/ui/EditForm";
import Back from "../../assets/BackIcon";
import QuestionCard from "../../components/ui/QuestionCard";
import { getJWT } from "../../utils/helper";

const SingleForm = () => {
  const navigate = useNavigate();
  const id = useParams().id || "";
  const jwt:string = getJWT()
  const { data, isFetching } = useGetFormQuery({ id, jwt });
  const name = data?.name;
  const description = data?.description || "";
  const questions = data?.questionIds || [];
  const [activeQuestion, setActiveQuestion] = useState("");

  return (
    <div className="py-12 max-w-5xl mx-auto">
      <button onClick={() => navigate("/forms")}>
        <Back />
      </button>
      {isFetching ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <EditForm
            name={name}
            description={description}
            id={id}
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
          />
          <div className="flex flex-col gap-4">
            {questions?.map((question: any) => (
              <QuestionCard
                activeQuestion={activeQuestion}
                setActiveQuestion={setActiveQuestion}
                key={question._id}
                question={question}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleForm;
