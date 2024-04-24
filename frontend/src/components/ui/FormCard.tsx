import React, { useState } from "react";
import { H2, H6, H7 } from "./Typography";
import { IFormType } from "../../utils/types";
import Delete from "../../assets/DeleteIcon";
import Edit from "../../assets/EditIcon";
import Cookies from "universal-cookie";
import { useDeleteFormMutation } from "../../features/user/apiSlice";
import { useNavigate } from "react-router-dom";
import View from "../../assets/ViewIcon"
import DeleteModal from "../modals/DeleteModal";

const FormCard = ({ form }: { form: IFormType }) => {
  const navigate = useNavigate();
  const questions = form.questions;
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  const [showDeleteModal, setShowDeleteModal]= useState(false);

  const [deleteForm] =
    useDeleteFormMutation();

  const handleDeleteForm = async (id: string) => {
    await deleteForm({ jwt, id })
    setShowDeleteModal(false);
  };

  return (
    <div className="p-8 custom-shadow flex items-center justify-between rounded-xl">

      <div
        className="flex flex-col gap-4 w-full"
      > 
        <div className="flex justify-between">
          {" "}
          <H2>{form.title}</H2>
          <div className="flex items-center gap-1 font-bold ">
            <H7>{questions.length}</H7>
            <H7>{questions.length === 1 ? "Question" : "Questions"}</H7>
          </div>
        </div>
        <H6>{form.description}</H6>
        <div className="flex justify-between">
        <button onClick={() => navigate(`/forms/${form._id}`)}
         className='flex items-center gap-2'>
         <View/>
        <span>View</span>
        </button>
        <button onClick={() => navigate(`/forms/${form._id}?edit=true`)}
         className="flex items-center gap-2">
          <Edit /> 
          <span>Edit</span>
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2"
        >
          <Delete /> 
          <span>Delete</span>
        </button>
      </div>
      </div>
      {showDeleteModal &&
       <DeleteModal
      formName={form.title}
      closePopup={()=>setShowDeleteModal(false)}
      onDelete={()=>handleDeleteForm(form._id)}/>}
    </div>
  );
};

export default FormCard;
