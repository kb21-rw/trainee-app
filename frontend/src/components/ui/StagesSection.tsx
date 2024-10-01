/* eslint-disable no-unused-vars */
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ApplicationFormProps, Stage } from "../../utils/types";
import RemoveIcon from "../../assets/RemoveIcon";
import AddIcon from "../../assets/AddIcon";

interface Props {
  currentStages: Stage[];
  addStagesHandler: (
    value: string,
    index: number,
    field: "name" | "description",
  ) => void;
  addNewStage: () => void;
  removeStage: (index: number) => void;
  register: UseFormRegister<ApplicationFormProps>;
}

export const StagesSection: React.FC<Props> = ({
  currentStages,
  addStagesHandler,
  addNewStage,
  removeStage,
  register,
}) => {
  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <h2 className="text-xl text-gray-700 font-semibold">Stages</h2>
      {currentStages.map((stage, index) => (
        <div key={index} className="mb-4 flex flex-col gap-2 custom-shadow p-4">
          <div>
            <input
              type="text"
              placeholder="Stage Title"
              className="border p-2 rounded-md outline-none w-80 block"
              {...register(`stages.${index}.name` as const)}
              onChange={(e) => addStagesHandler(e.target.value, index, "name")}
              value={stage.name}
            />
            <div className="flex items-end gap-2">
              <input
                type="text"
                placeholder="Stage Description"
                className="border p-2 rounded-md outline-none w-80 block mt-2"
                {...register(`stages.${index}.description` as const)}
                onChange={(e) =>
                  addStagesHandler(e.target.value, index, "description")
                }
                value={stage.description}
              />
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => removeStage(index)}
              >
                <RemoveIcon />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addNewStage}>
        <AddIcon />
      </button>
    </div>
  );
};
