import React from "react";
import CheckMark from "../../assets/CheckMark";
import AddIcon from "../../assets/AddIcon";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { useEditFormMutation } from "../../features/user/apiSlice";
import SuccessCheckMark from "../../assets/SuccessCheckMark";

const EditForm = ({ data, id }: { data: any; id: string }) => {
  const title = data.title;
  const description = data.description || "";
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: { title, description },
  });
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const [editForm] = useEditFormMutation();
  const onSubmit = async (data: any) => {
    const result = await editForm({
      jwt,
      body: data,
      id,
    });
    console.log({ result });
  };

  return (
    <form className="flex gap-2 ">
      <div className="p-8 custom-shadow rounded-xl flex flex-col gap-8 flex-1">
        <input
          placeholder="Enter title"
          className="outline-none text-[42px] font-bold border-b border-black"
          defaultValue={title}
          {...register("title")}
        />
        <input
          placeholder="Enter description"
          className="outline-none border-b border-black"
          defaultValue={description}
          {...register("description")}
        />
      </div>
      <div className="flex flex-col gap-2 p-2 custom-shadow">
        {isDirty ? (
          <button type="submit" onClick={handleSubmit(onSubmit)}>
            <SuccessCheckMark />
          </button>
        ) : (
          <CheckMark />
        )}
        <button type="button">
          <AddIcon />
        </button>
      </div>
    </form>
  );
};

export default EditForm;
