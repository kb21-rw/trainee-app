import React from "react";
import CheckMark from "../../assets/CheckMarkIcon";
import AddIcon from "../../assets/AddIcon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getJWT } from "../../utils/helper";
import {
  useCreateQuestionMutation,
  useDeleteFormMutation,
  useEditFormMutation,
} from "../../features/user/apiSlice";
import SuccessCheckMark from "../../assets/SuccessCheckMarkIcon";
import Delete from "../../assets/DeleteIcon";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { QuestionType } from "../../utils/types";

const FormSchema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

const EditForm = ({
  name,
  description,
  id,
  activeQuestion,
  setActiveQuestion,
}: {
  name: string;
  description: string;
  id: string;
  activeQuestion: string;
  setActiveQuestion: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: { name, description },
    resolver: yupResolver(FormSchema),
  });

 
  const [editForm] = useEditFormMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    await editForm({ jwt: getJWT(), body: data, id });
  };

  const [deleteForm, { isLoading: isDeleteFormLoading }] =
    useDeleteFormMutation();
  const handleDeleteForm = async () => {
    await deleteForm({ jwt: getJWT(), id });
    navigate(`/forms`);
  };

  const [createQuestion] = useCreateQuestionMutation();
  const onClickAddQuestion = async () => {
    await createQuestion({
      jwt: getJWT(),
      formId: id,
      body: { title: `Question`, type: QuestionType.Text },
    });
  };

  return (
    <form className="flex gap-2 " onFocus={() => setActiveQuestion("title")}>
      {isDeleteFormLoading && (
        <div className="absolute inset-0 h-full w-full">
          <Loader />
        </div>
      )}
      <div
        className={`p-8 custom-shadow border-t-[#673AB7] border-t-8  rounded-xl ${
          activeQuestion === "title" && "border-l-8 border-l-[#4285F4]"
        }  flex flex-col gap-8 flex-1`}
      >
        <input
          placeholder="Enter title"
          className="outline-none text-[42px] font-bold border-b border-black"
          defaultValue={name}
          {...register("name")}
        />
        <input
          placeholder="Enter description"
          className="outline-none border-b border-black"
          defaultValue={description}
          {...register("description")}
        />
        {errors.description && (
          <Alert type="error">Description shouldn&#39;t be empty</Alert>
        )}
        {errors.name && (
          <Alert type="error">Title shouldn&#39;t be empty</Alert>
        )}
      </div>
      <div className="flex flex-col justify-between gap-6 p-4 custom-shadow rounded-xl">
        {isDirty ? (
          <button type="submit" onClick={handleSubmit(onSubmit)}>
            <SuccessCheckMark />
          </button>
        ) : (
          <CheckMark />
        )}
        <button type="button" onClick={onClickAddQuestion}>
          <AddIcon />
        </button>
        <button type="button" onClick={handleDeleteForm}>
          <Delete />
        </button>
      </div>
    </form>
  );
};

export default EditForm;
