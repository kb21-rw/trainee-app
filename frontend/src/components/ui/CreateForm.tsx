import React from "react";
import CheckMark from "../../assets/CheckMark";
import AddIcon from "../../assets/AddIcon";

const CreateForm = ({ data }: any) => {
  console.log({ data });
  return (
    <div className="flex gap-2">
      <div className="p-8 custom-shadow flex flex-col gap-8 flex-1">
        <input
          placeholder="Enter title"
          className="outline-none text-[42px] font-bold border-b border-black"
          defaultValue={data.title}
        />
        <input
          placeholder="Enter description"
          className="outline-none border-b border-black"
          defaultValue={data.description}
        />
      </div>
      <div className="flex flex-col gap-2 p-2 custom-shadow">
        <button>
          <CheckMark />
        </button>
        <button>
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
