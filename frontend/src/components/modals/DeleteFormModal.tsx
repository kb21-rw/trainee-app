import React from "react";
import ModalLayout from "./ModalLayout";
import Button from "../ui/Button";

const DeleteModal = ({
  closePopup,
  formName,
  coachName,
  TraineeName,
  userRole,
  onDelete,
}: {
  closePopup: () => void;
  formName?: string;
  coachName?: string,
  TraineeName?:string,
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
 Are you sure you want to delete the {userRole || 'form'}: <b>{formName||coachName||TraineeName}</b>?
</p>
      <div className="flex justify-between mt-2 mx-32">
        <Button variant="small" outlined={true} clickHandler={closePopup}>
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
