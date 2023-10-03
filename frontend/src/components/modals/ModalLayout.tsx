import React, { ReactNode, useEffect } from "react";
import Close from "../../assets/Close";

const ModalLayout = ({
  children,
  title,
  closePopup
}: {
  children: ReactNode;
  title: string;
  closePopup: () => void;
}) => {
  useEffect(
    () => {
      !closePopup
        ? (document.body.style.overflow = "unset")
        : (document.body.style.overflow = "hidden");
      return () => {
        document.body.style.overflow = "unset";
      };
    },
    [closePopup]
  );
  return (
    <div className="fixed inset-0 h-screen w-full flex items-center justify-center z-50 bg-secondary-dark bg-opacity-40">
      <div className="bg-white rounded-3xl flex flex-col overflow-y-auto w-1/3 h-3/5 px-8 pt-9 gap-8 pb-8">
        <div className="flex">
          <h1 className="flex-1 flex items-center justify-center font-bold text-[40px] leading-[50px] ">
            {title}
          </h1>
          <button
            className="bg-[#F8F6FA] h-9 w-9 flex items-center justify-center self-start rounded-s"
            onClick={() => closePopup()}
          >
            <Close />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
