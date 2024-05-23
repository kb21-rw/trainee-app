import React, { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import Alert from "../ui/Alert";
import TextArea from "../ui/TextArea";
import Cookies from "universal-cookie";
import { useAddResponseMutation } from "../../features/user/apiSlice";
import Loader from "../ui/Loader";
import RadioOption from "../ui/RadioOption";

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
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const [addResponse, { isLoading, error, isSuccess }] =
    useAddResponseMutation();

  const [checkedOption, setCheckeOption] = useState('')

  const handleRadioChange = (value: string) => {
    setCheckeOption(value)
  }

  const onSubmit = async (data: any) => {
    const responseBody = {
      ...data,
      ...(questionType === "dropdown" && { text: checkedOption }),
    };
    await addResponse({ jwt, body: responseBody, questionId, userId });
  };

  const errorMessage =
    errors.name?.message || errors.email?.message || error?.data?.errorMessage;

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => closePopup(), 3000);
    }
  }, [isSuccess, closePopup]);
  
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
            <p>checked Option: {checkedOption}</p>
            {options.map((option, index) => (
              <RadioOption
                key={option}
                option={option}
                id={`option-${index}`}
                value={option}
                onRadioChange={handleRadioChange}
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
