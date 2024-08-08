import React from "react";
import ModalLayout from "./ModalLayout";
import Button from "../ui/Button";
import { ButtonVariant } from "../../utils/types";
const DeleteModal = ({
  closePopup,
  title,
  name,
  onDelete,
}: {
  closePopup: () => void;
  title: string;
  name: string,
  onDelete: () => void;
}) => {
  const handleDelete = () => {
    onDelete();
    closePopup();
  };

  return (
    <ModalLayout
      closePopup={closePopup}
      title={`Delete ${title}`}
    >
<p className="px-24">
 Are you sure you want to delete: <b>{name}</b>?
</p>
      <div className="flex justify-between mt-2 mx-32">
        <Button outlined onClick={closePopup}>
          Cancel
        </Button>
        <Button variant={ButtonVariant.Danger} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </ModalLayout>
  );
};

export default DeleteModal;
