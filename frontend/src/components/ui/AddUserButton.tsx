import React, { ReactNode } from "react";
import Button from "./Button";
import Plus from "../../assets/Plus";

interface PropTypes {
  children: ReactNode;
  addUserHandler: () => void;
}

const AddUserButton = ({ children, addUserHandler }: PropTypes) => {
  return (
    <div className="flex justify-end items-center my-6">
      <Button clickHandler={addUserHandler} variant="small">
        <Plus />
        <span>{children}</span>
      </Button>
    </div>
  );
};

export default AddUserButton;
