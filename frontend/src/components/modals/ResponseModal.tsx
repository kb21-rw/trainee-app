import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import Alert from "../ui/Alert";

const ResponseModal = ({
  closePopup,
  title,
  question,
}: {
  closePopup: () => void;
  title: string;
  question: string;
}) => {
  const [response, setResponse] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSave = () => {
    setResponse(response);
    console.log("save button clicked");
    closePopup();
  };

  const errorMessage: any = errors.name?.message || errors.email?.message;

  return (
    <ModalLayout closePopup={closePopup} title={title}>
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex flex-col gap-12 w-full"
      >
        <InputField
          type="text"
          label={question}
          placeholder="Response here"
          name="response"
          autoFocus={true}
          register={register}
          options={{
            required: { value: true, message: "response is required field" },
            maxLength: {
              value: 30,
              message: "Add your response here",
            },
          }}
        />
        <div className="flex justify-end">
          <Button variant="small" clickHandler={handleSave}>
            Save Response
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default ResponseModal;
