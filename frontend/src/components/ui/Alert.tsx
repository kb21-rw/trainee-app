import React, { ReactNode, useState } from "react";

const Alert = ({
  children,
  type
}: {
  children: ReactNode;
  type: "error" | "success";
}) => {
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  setTimeout(() => {
    setIsAlertVisible(false);
  }, 3000);
  return (
    <div
      className={`w-full py-2 flex justify-center items-center rounded-lg ${type ===
        "error" && "bg-error-light text-error-dark"} ${type === "success" &&
        "bg-green-300 text-white"}`}
    >
      {children}
    </div>
  );
};

export default Alert;
