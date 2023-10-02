import React, { ReactNode } from "react";
import Close from "../../assets/Close";

const ModalLayout = ({
  children,
  title,
  closePopup
}: {
  children: ReactNode;
  title: string;
  closePopup: ()=>void
}) => {
  return (
    <div className="absolute inset-0 h-screen w-full flex items-center justify-center  z-50 bg-secondary-dark bg-opacity-40">
      <div className=" bg-white rounded-3xl flex flex-col  w-full max-w-[660px] min-h-[608px] px-8 pt-9">
        <div className="flex">
          <h1 className="flex-1 flex items-center justify-center font-bold text-[40px] leading-[50px] mb-8">{title}</h1>
          <button className="bg-[#F8F6FA] h-9 w-9 flex items-center justify-center self-start rounded-s" onClick={()=>closePopup()}>
          <Close/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
