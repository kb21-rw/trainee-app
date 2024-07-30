import React, { useState } from "react";
import { useGetFormForApplicantsQuery } from "../../features/user/apiSlice";
import Loader from "../../components/ui/Loader";
import { ApplicationFormResponse, ButtonVariant, Question } from "../../types";
import FormInput from "../../components/ui/FormInput";
import Button from "../../components/ui/Button";
import { useAddApplicantResponseMutation } from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import ReviewFormModal from "../../components/modals/ReviewFormModal";
import ApplicantSuccessModal from "../../components/modals/ApplicationSuccess"; // Import ApplicantSuccessModal
import { getJWT } from "../../utils/helper";

const ApplicationForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [reviewData, setReviewData] = useState<ApplicationFormResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

  const jwt: string = getJWT();

  const { data, isFetching, isError } = useGetFormForApplicantsQuery(jwt);
  const [addApplicantResponse, {isSuccess}] =
    useAddApplicantResponseMutation();

  const form = data?.[0];

  const formTitle = form?.title;
  const formDescription = form?.description || "";
  const formQuestions = form?.questions || [];

  const errorMessage =
    errors.name?.message ||
    errors.email?.message ||
    isError?.data?.errorMessage;

  const handleFormSubmit = (formData: any) => {
    const responses = formData.responses.map(
      (response: ApplicationFormResponse) => ({
        questionId: response.questionId,
        answer: response.answer,
      }),
    );
    setReviewData(responses);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await addApplicantResponse({
        jwt,
        body: reviewData,
      });
      if(isSuccess) setIsSubmissionSuccessful(true);
    } catch (error: any) {
      throw new Error("Error submitting form", error);
    }
  };

  const handleEdit = () => {
    setReviewData([]);
    setIsModalOpen(false);
  };

  if (isFetching)
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );

  if (isError || errorMessage) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex flex-col justify-center items-center"
        role="alert"
      >
        <strong className="font-bold text-5xl space-y-5">Error!</strong>
        <span className="block sm:inline text-xl">{errorMessage}</span>
        <span>Please try again later.</span>
      </div>
    );
  }

  return (
    <div className="mt-20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg">
        <div className="border-t-[#673AB7] border-t-8 rounded-xl w-full p-4"></div>
        <div className="px-8 py-6">
          <div className="border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              {formTitle}
            </h2>
            <p className="text-gray-600 text-center mb-6">{formDescription}</p>
          </div>
          <form className="mt-8" onSubmit={handleSubmit(handleFormSubmit)}>
            {formQuestions.map((question: Question, index: number) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {index + 1}. {question.title}
                </h3>
                {question.type === "text" && (
                  <FormInput
                    {...register(`responses[${index}].questionId`, {
                      value: question._id,
                    })}
                    {...register(`responses[${index}].answer`, {
                      required: true,
                    })}
                    className="border-b border-gray-300 rounded-md text-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                  />
                )}
                {question.type === "dropdown" && (
                  <div className="space-y-4">
                    {question.options?.map(
                      (option: string, optionIndex: number) => (
                        <div key={optionIndex} className="flex items-center">
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
                            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`option_${optionIndex}`}
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {option}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-center">
              <Button variant={ButtonVariant.Primary} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <ReviewFormModal
          title="Confirm Submission"
          closePopup={() => setIsModalOpen(false)}
          formQuestions={formQuestions}
          responses={reviewData}
          setReviewData={setReviewData}
          handleConfirm={handleConfirm}
          handleEdit={handleEdit}
        />
      )}
      {isSubmissionSuccessful && (
        <ApplicantSuccessModal closePopup={() => setIsSubmissionSuccessful(false)} />
      )}
    </div>
  );
};

export default ApplicationForm;
