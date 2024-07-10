import React, { ReactNode, useState, useEffect } from "react";

const Alert = ({
  children,
  type,
  displayDuration = 3000,
}: {
  children: ReactNode;
  type: "error" | "success";
  displayDuration?: number;
}) => {
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlertVisible(false);
    }, displayDuration);
    return () => clearTimeout(timer);
  }, [displayDuration]);

  return (
    isAlertVisible && (
      <div
        className={`w-full py-2 flex justify-center items-center rounded-lg absolute top-14 ${
          type === "error" && "bg-error-light text-error-dark"
        } ${type === "success" && "bg-green-300 text-white"}`}
      >
        {children}
      </div>
    )
  );
};

export default Alert;
