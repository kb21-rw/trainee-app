import React from "react";
import ModalLayout from "./ModalLayout";
import Button from "../ui/Button";
import { ButtonVariant } from "../../types";
const DeleteModal = ({
  closePopup,
  formName,
  coachName,
  traineeName,
  userRole,
  onDelete,
}: {
  closePopup: () => void;
  formName?: string;
  coachName?: string,
  traineeName?:string,
  userRole?:string,
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
 Are you sure you want to delete the {userRole?.toLowerCase() || 'form'}: <b>{formName||coachName||traineeName}</b>?
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
