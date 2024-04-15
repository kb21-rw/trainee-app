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
    >
<p className="px-24">
 Are you sure you want to delete the form: <b>{formName}</b>?
</p>
      <div className="flex justify-between mt-2 mx-32">
        <Button variant="small"  clickHandler={closePopup}>
          Cancel
        </Button>
        <Button variant="delete" clickHandler={handleDelete}>
          Delete
        </Button>
      </div>
    </ModalLayout>
  );
};

export default DeleteModal;
