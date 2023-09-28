import React, {ReactNode} from "react";

export const H1 = ({ children, className }: {children: ReactNode, className?:string}) => {
  return (
    <div className={`text-[40px] font-bold text-secondary-dark ${className? className:""}`}>
      {children}
    </div>
  );
};
