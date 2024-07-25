import React, { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import Alert from "../ui/Alert";
import TextArea from "../ui/TextArea";
import { useAddResponseMutation } from "../../features/user/apiSlice";
import Loader from "../ui/Loader";
import RadioOption from "../ui/RadioOption";
import useAutoCloseModal from "../../utils/hooks/useAutoCloseModal";
import { getJWT } from "../../utils/helper";

const ResponseModal = ({
  closePopup,
  title,
  question,
  questionId,
  userId,
  response,
  includeButton,
  disabled,
  questionType,
  options,
  checkedOption,
  handleCheckChange,
}: {
  closePopup: () => void;
  title: string;
  question: string;
  questionId: string;
  userId: string;
  response?: string;
  includeButton?: boolean;
  disabled?: boolean;
  questionType: string;
  options: string[];
  checkedOption: string;
  // eslint-disable-next-line no-unused-vars
  handleCheckChange: (_value: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addResponse, { isLoading, error, isSuccess }] =
    useAddResponseMutation();
  const [localCheckedOption, setLocalCheckedOption] = useState(checkedOption);
  const handleRadioChange = (value: string) => {
    handleCheckChange(value);
  };

  const onSubmit = async (data: any) => {
    const jwt: string = getJWT()
    const responseBody = {
      ...data,
      ...(questionType === "dropdown" && { text: localCheckedOption }),
    };
    await addResponse({ jwt, body: responseBody, questionId, userId });
  };

  const errorMessage =
    errors.name?.message || errors.email?.message || error?.data?.errorMessage;

  useAutoCloseModal(isSuccess, closePopup);

  useEffect(() => {
    setLocalCheckedOption(checkedOption);
  }, [checkedOption]);

  return (
    <ModalLayout closePopup={closePopup} title={title}>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      {isSuccess && (
        <Alert type="success">Response was added succesfully</Alert>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-12 w-full"
      >
        {questionType === "text" && (
          <TextArea
            label={question}
            placeholder={response || "No response"}
            name="text"
            register={register}
            defaultValue={response}
            options={{
              required: { value: true, message: "response is required" },
              maxLength: {
                message: "Add your response here",
              },
            }}
            disabled={disabled}
          />
        )}
        {questionType === "dropdown" && (
          <div>
            <h1 className="capitalize text-xl pb-5">{question}:</h1>
            {options.map((option, index) => (
              <RadioOption
                key={option}
                option={option}
                id={`option-${index}`}
                value={option}
                checked={option === localCheckedOption}
                onRadioChange={handleRadioChange}
                disabled={disabled}
              />
            ))}
          </div>
        )}
        <div className="flex justify-end">
          {includeButton && <Button type="submit">Save Response</Button>}
        </div>
      </form>
    </ModalLayout>
  );
};

export default ResponseModal;
