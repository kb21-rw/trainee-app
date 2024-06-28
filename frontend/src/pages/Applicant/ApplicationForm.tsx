import React, { useState } from "react";
import { useGetFormForApplicantsQuery } from "../../features/user/apiSlice";
import Loader from "../../components/ui/Loader";
import { ApplicationFormResponse, ButtonVariant, Question } from "../../types";
import FormInput from "../../components/ui/FormInput";
import Button from "../../components/ui/Button";
import { useAddApplicantResponseMutation } from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import Alert from "../../components/ui/Alert";
import Cookies from "universal-cookie";
import ReviewFormModal from "../../components/modals/ReviewFormModal";
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState<ApplicationFormResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cookies = new Cookies();
  const jwt = cookies.get("jwt");

  const { data, isFetching, isError } = useGetFormForApplicantsQuery();
  const [addApplicantResponse] = useAddApplicantResponseMutation();

  const form = data?.[0];

  const formTitle = form?.title;
  const formDescription = form?.description || "";
  const formQuestions = form?.questions || [];

  const errorMessage =
    errors.name?.message ||
    errors.email?.message ||
    isError?.data?.errorMessage;

  const handleFormSubmit = (formData: any) => {
    const responses = formData.responses.map((response: ApplicationFormResponse) => ({
      questionId: response.questionId,
      answer: response.answer,
    }));
    setReviewData(responses);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await addApplicantResponse({
        jwt,
        body: reviewData,
      });
      navigate('/applicant/home')
    } catch (error) {
      throw new Error("Error submitting form");
    }
  };

  const handleEdit = () => {
    setReviewData([]);
    setIsModalOpen(false);
  };

  if (errorMessage) {
    return (
      <div> {errorMessage && <Alert type="error">{errorMessage}</Alert>}</div>
    );
  }

  if (isFetching)
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="w-full border bg-gray-200 p-10 h-full">
      <div className="w-3/5 mx-auto container mt-10 bg-white rounded-xl shadow">
        <div className="border-t-[#673AB7] border-t-8 rounded-xl w-full p-4"></div>
        <form className="w-full px-5 h-auto" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="text-center">
            <h2 className="capitalize text-4xl font-bold mb-4 text-black/80">
              {formTitle}
            </h2>
            <p className="font-normal text-black/60">{formDescription}</p>
          </div>
          <div className="w-full mt-10">
            {formQuestions.map((question: Question, index: number) => (
              <div key={index}>
                <h1 className="capitalize text-xl font-medium mb-1">
                  <span className="mr-2">{index + 1}.</span>
                  {question.title}
                </h1>
                {question.type === "text" && (
                  <FormInput
                    {...register(`responses[${index}].questionId`, {
                      value: question._id,
                    })}
                    {...register(`responses[${index}].answer`, {
                      required: true,
                    })}
                    className="border-b border-black/90 text-gray-500 text-lg w-full mb-4 pl-4 focus:border-b-2 focus:border-b-[#4285F4] transition-all duration-500"
                  />
                )}
                {question.type === "dropdown" && (
                  <div className="py-3">
                    {question.options?.map(
                      (option: string, optionIndex: number) => (
                        <div
                          key={optionIndex}
                          className="flex items-center px-5 py-1"
                        >
                          <input
                            type="radio"
                            id={`option_${optionIndex}`}
                            {...register(`responses[${index}].questionId`, {
                              value: question._id,
                              required: true,
                            })}
                            {...register(`responses[${index}].answer`, {
                              value: option,
                            })}
                            value={option}
                            className="mr-2 w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`option_${optionIndex}`}
                            className="text-lg capitalize text-gray-600"
                          >
                            {option}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center py-5">
            <Button variant={ButtonVariant.Small} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <ReviewFormModal
          title="Confirm Submission"
          closePopup={() => setIsModalOpen(false)}
          formQuestions={formQuestions}
          responses={reviewData}
          setReviewData = {setReviewData}
          handleConfirm={handleConfirm}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default ApplicationForm;
