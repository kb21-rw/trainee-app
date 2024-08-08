import React, { useState } from "react";
import { useGetFormForApplicantsQuery } from "../../features/user/apiSlice";
import Loader from "../../components/ui/Loader";
import {
  ApplicationFormResponse,
  ButtonVariant,
  Question,
  QuestionType,
} from "../../utils/types";
import FormInput from "../../components/ui/FormInput";
import Button from "../../components/ui/Button";
import { useAddApplicantResponseMutation } from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import ReviewFormModal from "../../components/modals/ReviewFormModal";
import ApplicantSuccessModal from "../../components/modals/ApplicationSuccess";
import { getJWT } from "../../utils/helper";

const ApplicationForm = () => {
  const { handleSubmit, register } = useForm();

  const [reviewData, setReviewData] = useState<ApplicationFormResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

  const jwt: string = getJWT();

  const { data, isFetching } = useGetFormForApplicantsQuery(jwt);
  const [addApplicantResponse, { isSuccess }] =
    useAddApplicantResponseMutation();

  const formTitle = data?.title;
  const formQuestions = data?.questions ?? [];

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
      if (isSuccess) setIsSubmissionSuccessful(true);
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

  if (formQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <div
          className="flex flex-col items-center bg-green-100 border border-green-400 px-4 py-3 rounded space-y-2"
          role="alert"
        >
          <h1 className="text-3xl text-green-700">Oops! 🫢</h1>
          <strong className="font-bold text-center text-green-700">
            No application found!
          </strong>
          <span className="block sm:inline text-center text-gray-500">
            Unfortunately, there is no open application
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg">
        <div className="border-t-[#673AB7] border-t-8 rounded-xl w-full p-4"></div>
        <div className="px-8 py-6">
          <div className="border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              {formTitle}
            </h2>
          </div>
          <form className="mt-8" onSubmit={handleSubmit(handleFormSubmit)}>
            {formQuestions.map((question: Question, index: number) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {index + 1}. {question.title}
                </h3>
                {question.type === QuestionType.Text && (
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
                {question.type === QuestionType.SingleSelect && (
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
            <div className="flex justify-center items-center space-x-3">
              <Button
                outlined={true}
                variant={ButtonVariant.Primary}
                type="submit"
              >
                Save
              </Button>
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
        <ApplicantSuccessModal
          closePopup={() => setIsSubmissionSuccessful(false)}
        />
      )}
    </div>
  );
};

export default ApplicationForm;
