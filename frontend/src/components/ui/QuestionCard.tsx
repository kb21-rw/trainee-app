import React from "react";
import Loader from "./Loader";
import Delete from "../../assets/DeleteIcon";
import {
  useDeleteQuestionMutation,
  useEditQuestionMutation,
} from "../../features/user/apiSlice";
import Cookies from "universal-cookie";
import SuccessCheckMark from "../../assets/SuccessCheckMarkIcon";
import { useForm } from "react-hook-form";
import AddIcon from "../../assets/AddIcon";
import RemoveIcon from "../../assets/RemoveIcon";
import Reset from "../../assets/ResetIcon";

const QuestionCard = ({ question, activeQuestion, setActiveQuestion }: any) => {
  const { title, type, options, _id } = question;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      title,
      type,
      options,
    },
  });
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [editQuestion] = useEditQuestionMutation();

  const handleDeleteQuestion = async () => {
    await deleteQuestion({ jwt, id: _id });
  };

  const onSubmit = async (data: any) => {
    const result = await editQuestion({ jwt, body: data, id: _id });
    console.log({ result });
  };

  const { type: selectedType } = watch();
  const { options: currentOptions } = watch();

  return (
    <div
      className="flex justify-start gap-2"
      onFocus={() => setActiveQuestion(_id)}
    >
      <div
        className={`p-8 custom-shadow ${
          activeQuestion === _id && "border-l-8 border-[#4285F4]"
        } flex flex-1 items-center justify-between rounded-xl`}
      >
        {false && (
          <div className="absolute inset-0 h-full w-full">
            <Loader />
          </div>
        )}
        <div className="w-full justify-between gap-4- cursor-pointer">
          <div className="flex items-center gap-4">
            <input
              defaultValue={title}
              {...register("title")}
              className={`text-3xl flex-1 h-16  ${
                activeQuestion === _id && "bg-white"
              } focus:border-b-2 border-blue-400 outline-none py-1 px-0.5`}
            />
            <select className="p-2" {...register("type")}>
              {[
                { label: "Text", value: "text" },
                { label: "Dropdown", value: "dropdown" },
              ].map(
                (
                  currentType: { label: string; value: string },
                  index: number
                ) => (
                  <option
                    key={index}
                    value={currentType.value}
                    selected={currentType.value === type}
                  >
                    {currentType.label}
                  </option>
                )
              )}
            </select>
          </div>
          {selectedType === "dropdown" && (
            <div>
              <ol className="w-full my-4">
                {currentOptions.map((option: string, index: number) => (
                  <li key={index} className="flex gap-3 items-center">
                    <span>{index + 1}.</span>
                    <input
                      defaultValue={option}
                      className="text-lg flex-1 focus:border-black hover:border-gray-300 hover:border-b focus:duration-300 ease-in-out focus:border-b outline-none py-1 px-0.5"
                    />
                  </li>
                ))}
              </ol>
              <button
                onClick={() =>
                  setValue("options", [
                    ...currentOptions,
                    `option ${currentOptions.length + 1}`,
                  ])
                }
              >
                <AddIcon />
              </button>
              {currentOptions.length > 0 && (
                <button
                  onClick={() => {
                    currentOptions.pop();
                    setValue("options", currentOptions);
                  }}
                >
                  <RemoveIcon />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="max-h-44 flex flex-col justify-center gap-6 p-4 custom-shadow rounded-xl">
        {isDirty ? (
          <div className="flex flex-col gap-6">
            <button type="submit" onClick={handleSubmit(onSubmit)}>
              <SuccessCheckMark />
            </button>
            <button type="submit" onClick={() => reset()}>
              <Reset />
            </button>
          </div>
        ) : null}
        <button
          onClick={handleDeleteQuestion}
          className="flex items-center gap-2"
        >
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
