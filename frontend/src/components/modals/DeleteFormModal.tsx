import React from "react";
import ModalLayout from "./ModalLayout";
import Button from "../ui/Button";

const DeleteModal = ({
  closePopup,
  formName,
  onDelete,
}: {
  closePopup: () => void;
  formName: string;
  onDelete: () => void;
}) => {
  const handleDelete = () => {
    onDelete();
    closePopup();
  };

  return (
    <ModalLayout
      closePopup={closePopup}
      title="Delete Form"
      size="small"
    >
      <p>Are you sure you want to delete the form "{formName}"?</p>
      <div className="flex justify-end mt-4">
        <Button variant="outlined" clickHandler={closePopup}>
          Cancel
        </Button>
        <Button variant="danger" clickHandler={handleDelete}>
          Delete
        </Button>
      </div>
    </ModalLayout>
  );
};

export default DeleteModal;
