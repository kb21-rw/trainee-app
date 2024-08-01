import React from "react";
import SuccessCheckMarkIcon from "../../assets/SuccessCheckMarkIcon";
import ModalLayout from "./ModalLayout";

const ApplicantSuccessModal = ({ closePopup }: { closePopup: () => void }) => {
  return (
    <ModalLayout title="Application Submitted" closePopup={closePopup}>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-6">
          <span className="animate-bounce">
            <SuccessCheckMarkIcon />
          </span>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Your application has been submitted successfully!
        </h1>
        <p className="flex flex-col items-center justify-center text-gray-600 text-center mb-6">
          <span>Thank you for applying.</span> <span>We will review your application and get back
          to you soon.</span>
        </p>
        <div className="flex justify-center">
          <a
            href="/home"
            className="inline-flex items-center px-4 py-2 bg-primary-dark text-white font-semibold rounded-md transition-colors duration-300"
          >
            Home
          </a>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ApplicantSuccessModal;
