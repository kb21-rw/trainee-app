/* eslint-disable no-unused-vars */

import React from "react";
import { useGetFormForApplicantsQuery } from "../../features/user/apiSlice";
import Loader from "../../components/ui/Loader";
import { Question } from "../../types";
import FormInput from "../../components/ui/FormInput";
import Button from "../../components/ui/Button";
// import { useAddApplicantResponseMutation } from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import Alert from "../../components/ui/Alert";

const ApplicationForm = () => {

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, isFetching, isError } = useGetFormForApplicantsQuery();
// const [addApplicantResponse, {isLoading, isError, error}] = useAddApplicantResponseMutation();

console.log(data)

const formTitle = data?.title;
const formDescription = data?.description || "";
const formQuestions = data?.questions|| [];

  const errorMessage =
  errors.name?.message || errors.email?.message || isError?.data?.errorMessage;

  // const onSubmit = async (data: any) => {
  //    const responses = formQuestions.map((question: Question, index: number) => ({
  //     questionId: question._id,
  //     response: data[question.title.toLowerCase()],
  //   }));

  //   const responseBody = [ responses,]
     
    

  //   await addApplicantResponse({body: responseBody})
  // }

  if(errorMessage) {
    return <div> {errorMessage && <Alert type="error">{errorMessage}</Alert>}</div>
  }

  if (isFetching)
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );

  if (data) {
    return (
      <div className="w-full border bg-gray-200 p-10">
        <div className="w-3/5 mx-auto container mt-10  bg-white rounded-xl shadow">
          <div className="border-t-[#673AB7] border-t-8  rounded-xl w-full p-4"></div>
          <form className="w-full px-5">
            <div className="text-center">
              <h2 className="capitalize text-4xl font-bold mb-4 text-black/80">
                {formTitle}
              </h2>
              <p className="font-normal text-black/60">{formDescription}</p>
            </div>
            <div className="w-full mt-20">
              {formQuestions.map((question: Question, index: number) => (
                <div key={index}>
                 
                  {question.type === "text" && (
                    <div>
                       <h1 className="capitalize text-xl font-medium mb-1">
                     <span className="mr-2">{index + 1}.</span>
                     {question.title}
                   </h1>
                    <FormInput className="border-b border-black text-gray-500 text-lg w-full mb-4 pl-4 focus:border-b-2 focus:border-b-[#4285F4] transition-all duration-500 ease-in-out relative before:absolute before:inset-x-0 before:bottom-0 before:h-0 before:bg-[#4285F4] before:transition-all before:duration-500 before:ease-in-out focus:before:h-full" />
                    </div>
                  )}
                  {question.type === "dropdown" && (
                   <div>
                     <h1 className="capitalize text-xl font-medium mb-1">
                    <span className="mr-2">{index + 1}.</span>
                    {question.title}
                  </h1>
                    <div className="py-3">
                      {question.options?.map(
                        (option: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center px-5 py-1"
                          >
                            <input
                              type="radio"
                              name={question.title.toLowerCase()}
                              value={option}
                              className="mr-2 w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="text-lg capitalize text-gray-600">
                              {option}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                   </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center py-5">
              <Button variant="small">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default ApplicationForm;
