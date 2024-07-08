import React from "react";
import { ApplicationFormResponse, Question } from "../../types";
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
  setReviewData: React.Dispatch<
    React.SetStateAction<ApplicationFormResponse[]>
  >;
  handleConfirm: () => void;
  handleEdit: () => void;
}) => {
  return (
    <ModalLayout title={title} closePopup={closePopup}>
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-8">
          {formQuestions.map((question, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {index + 1}. {question.title}
              </h3>
              <p className="text-gray-600 pl-3">{responses[index]?.answer}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          <Button onClick={handleEdit}>
            <EditIcon />
            Edit
          </Button>
          <Button
            onClick={() => {
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
