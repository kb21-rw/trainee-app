import React from "react";
import { ButtonVariant, Question } from "../../types";
import Button from "../../components/ui/Button";

export interface Response {
  questionId: string;
  answer: string;
}

interface ReviewFormData {
  formQuestions: Question[];
  responses: Response[];
  handleConfirm: () => void;
  handleEdit: () => void;
}

const ReviewForm = ({
  formQuestions,
  responses,
  handleConfirm,
  handleEdit,
}: ReviewFormData) => {
  return (
    <div className="w-full border bg-gray-200 p-10 h-screen">
      <div className="w-3/5 mx-auto container mt-10 bg-white rounded-xl shadow">
        <div className="border-t-primary-dark border-t-8 rounded-xl w-full p-4"></div>
        <div className="w-full px-5">
          <div className="text-center">
            <h2 className="capitalize text-4xl font-bold mb-4 text-black/80">
              confirm application
            </h2>
            <p className="font-normal text-black/60">
              double check provided information
            </p>
          </div>
          <div className="w-full mt-10">
            {formQuestions.map((question, index) => (
              <div key={index} className="mb-4">
                <h1 className="capitalize text-xl font-medium mb-1">
                  <span className="mr-2">{index + 1}.</span>
                  {question.title}
                </h1>
                <p className="text-lg text-gray-700">
                  {responses[index].answer}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-10 justify-center py-5">
            <Button variant={ButtonVariant.Small} clickHandler={handleEdit}>
              Edit
            </Button>
            <Button variant={ButtonVariant.Small} clickHandler={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
