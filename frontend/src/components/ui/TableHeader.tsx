import React from "react";
import Button from "./Button";
import Sort from "../../assets/Sort";
import Arrow from "../../assets/Arrow";

const TableHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-full  items-center max-w-xl px-1 h-[58px] border border-[#DBD5E0] rounded-xl">
        <input
          className="px-2 flex-1 outline-none h-full"
          placeholder="Enter name"
        />
        <Button variant="small">Search</Button>
      </div>
      <div className="flex gap-6 items-center">
         <div className="flex gap-6 items-center">
        <div className="flex gap-2 items-center">
          <Sort />
          <span className="text-base font-normal text-[#5B576A]">
            Sort trainees:
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-[#070412] tracking-[0.32px]">Coach</span>
          <Arrow />
        </div>
      </div> 
      <div className="flex gap-6 items-center">
        <div className="flex gap-2 items-center">
          <span className="text-base font-normal text-[#5B576A]">
            Trainees per page:
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-[#070412] tracking-[0.32px]">20</span>
          <Arrow />
        </div>
      </div>
      
      </div>
      
      
    </div>
  );
};

export default TableHeader;
