import React from "react";
import { ApplicationFormResponse, ButtonVariant, Question } from "../../types";
import Button from "../../components/ui/Button";
import ModalLayout from "./ModalLayout";
import EditIcon from "../../assets/EditIcon";

const ReviewFormModal = ({
  title,
  closePopup,
  formQuestions,
  responses,
  handleConfirm,
  handleEdit,
}: {
  title: string;
  closePopup: () => void;
  formQuestions: Question[];
  responses: ApplicationFormResponse[];
  setReviewData: React.Dispatch<React.SetStateAction<ApplicationFormResponse[]>>;
  handleConfirm: () => void;
  handleEdit: () => void;
}) => {

  return (
    <ModalLayout title={title} closePopup={closePopup}>
      <div className="w-full">
        <div>
          {formQuestions.map((question, index) => (
            <div key={index} className="mb-4">
              <h1 className="capitalize text-xl font-medium mb-1">
                <span className="mr-2">{index + 1}.</span>
                {question.title}
              </h1>
              <p className="text-lg text-gray-700/80 pl-5">
                {responses[index]?.answer}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-10 justify-center py-5">
          <Button variant={ButtonVariant.Edit} clickHandler={handleEdit}>
            Edit <EditIcon/>
          </Button>
          <Button
            variant={ButtonVariant.Small}
            clickHandler={() => {
              handleConfirm();
              closePopup();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ReviewFormModal;
