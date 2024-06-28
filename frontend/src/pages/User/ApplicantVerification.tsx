import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { H1 } from "../../components/ui/Typography";
import Button from "../../components/ui/Button";
import { useVerifyApplicantMutation } from "../../features/user/apiSlice";
import Loader from "../../components/ui/Loader";

const ApplicantVerification = () => {
  const [verifyApplicant, { isLoading, error }] = useVerifyApplicantMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const handleVerification = async () => {
    try {
      if (!userId) {
        throw new Error("User ID not found in query parameters");
      }

      const { data } = await verifyApplicant(userId );

      if (data?.userId) {
        navigate("/login");
      } else {
        throw new Error("Verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("An error occurred during verification. Please try again.");
    }
  };

  const errorMessage = error ? error.message || "An error occurred" : null;

  return (
    <div className="flex flex-col h-screen justify-center gap-5 items-center px-5 sm:px-10 md:p-0 max-w-xl mx-auto">
      <H1>Email Verification</H1>
      {isLoading && <Loader />}
      {errorMessage && (
        <div className="py-2 bg-error-light text-error-dark flex justify-center items-center rounded-lg">
          {errorMessage}
        </div>
      )}
      <Button clickHandler={handleVerification}>Verify</Button>
    </div>
  );
};

export default ApplicantVerification;
