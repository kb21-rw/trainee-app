import React, { ReactNode } from "react";

export const H1 = ({ children }: { children: ReactNode }) => {
  return <div className="text-[40px] font-bold">{children}</div>;
};
