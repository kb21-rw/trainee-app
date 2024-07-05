import React from "react";
import ModalLayout from "./ModalLayout";
import Button from "../ui/Button";
import { ButtonVariant } from "../../types";
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
        <Button variant={ButtonVariant.Small} outlined={true} clickHandler={closePopup}>
          Cancel
        </Button>
        <Button variant={ButtonVariant.Delete} clickHandler={handleDelete}>
          Delete
        </Button>
      </div>
    </ModalLayout>
  );
};

export default DeleteModal;
