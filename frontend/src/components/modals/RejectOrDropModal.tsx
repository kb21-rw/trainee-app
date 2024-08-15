import React from "react";
import { useForm } from "react-hook-form";
import ModalLayout from "./ModalLayout";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { ApplicantDecision, ButtonVariant } from "../../utils/types";
import TextArea from "../ui/TextArea";
import { useApplicantDecisionMutation} from "../../features/user/apiSlice";
import Loader from "../ui/Loader";
import Alert from "../ui/Alert";
import useAutoCloseModal from "../../utils/hooks/useAutoCloseModal";

const RejectOrDropModal = ({
  closePopup,
  userName,
  userEmail,
  userToBeRejectedId,
  jwt,
}: {
  closePopup: () => void;
  userName: string;
  userEmail: string;
  userToBeRejectedId: string | null;
  jwt: string
}) => {
  const {
    register,
    handleSubmit,
    watch
  } = useForm();

  const [rejectUser, { isLoading: isRejectUserLoading, isSuccess: isRejectUserSuccess }] =
  useApplicantDecisionMutation();

  // created dummy stages for testing purposes, will be removed soon when we get actual data

  const stages = [
    {
      title: "Stage 1",
      description: "Fundament javascript gate",
      id: "66b09b2e34299e3eb94123a0",
    },
    {
      title: "Stage 1",
      description: "React and redux",
      id: "66b09b2e34299e3eb94123a1",
    },
  ];

  const handleRejectUser = async () => {
    if (userToBeRejectedId) {
      await rejectUser({
        jwt,
        body: {
          decision: ApplicantDecision.Rejected,
          stageId: watch("StageId"),
          feedback: watch("feedback"),
          userId: userToBeRejectedId,
        },
      });
    }
  };

  const onSubmit = async () => {
    handleRejectUser();
  };

  useAutoCloseModal(isRejectUserSuccess, closePopup);

  return (
    <ModalLayout closePopup={closePopup} title={`Drop ${userName}`}>
    {/* {errorMessage && <Alert type="error">{errorMessage}</Alert>} */}
      {isRejectUserSuccess && (
        <Alert type="success">{`${userName} Droped`}</Alert>
      )}
      {isRejectUserLoading && (
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-12 w-full"
      >
        <InputField
          type="text"
          label="Name"
          placeholder=""
          name="name"
          defaultValue={userName}
          register={register}
          options={{
            required: { value: true, message: "name is required field" },
            maxLength: {
              value: 30,
              message: "Name must not exceed 30 characters",
            },
          }}
        />
        <InputField
          type="email"
          label="Email address"
          placeholder=""
          name="email"
          defaultValue={userEmail}
          register={register}
          options={{
            required: { value: true, message: "Email is required field" },
          }}
        />
        <div className="flex flex-col gap-5">
          <label htmlFor="role" className="text-lg font-medium">
            Choose stage
          </label>

          <select
            className="form-select rounded-xl h-[58px] border-gray-200"
            {...register("StageId")}
          >
            {stages?.map((stage: any) => (
              <option key={stage.id} value={stage.id}>
                {stage.description}
              </option>
            ))}
          </select>
        </div>
        <div>
          <TextArea
            label="Reason for rejection or Feedback"
            placeholder="Enter feedback here"
            name="feedback"
            register={register}
            defaultValue=""
            options={{
              required: { value: true, message: "response is required" },
              maxLength: {
                message: "Add your response here",
              },
            }}
          />
        </div>
        <div className="flex gap-2">
          <Button outlined onClick={closePopup}>
            Cancel
          </Button>
          <Button variant={ButtonVariant.Danger} type="submit">Comfirm</Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default RejectOrDropModal;
