import React, { ReactNode } from "react";
import Button from "./Button";
import Plus from "../../assets/PlusIcon";
import { ButtonVariant } from "../../types";

interface PropTypes {
  children: ReactNode;
  addHandler: () => void;
}

const AddButton = ({ children, addHandler }: PropTypes) => {
  return (
    <div className="flex flex-col items-end gap-1 mt-10">
      <Button clickHandler={addHandler} clicked={false} variant={ButtonVariant.Small}>
        <Plus />
        <span>{children}</span>
      </Button>
    </div>
  );
};

export default AddButton;
