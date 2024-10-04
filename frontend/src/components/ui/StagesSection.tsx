/* eslint-disable no-unused-vars */
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ApplicationFormType, Stage } from "../../utils/types";
import RemoveIcon from "../../assets/RemoveIcon";
import AddIcon from "../../assets/AddIcon";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  currentStages: Stage[];
  addStagesHandler: (
    value: string,
    index: number,
    field: "name" | "description",
  ) => void;
  addNewStage: () => void;
  removeStage: (index: number) => void;
  register: UseFormRegister<ApplicationFormType>;
}

export const StagesSection: React.FC<Props> = ({
  currentStages,
  addStagesHandler,
  addNewStage,
  removeStage,
  register,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography>Stages</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="p-4 flex flex-col items-center space-y-4">
          {currentStages.map((stage, index) => (
            <div
              key={index}
              className="mb-4 flex flex-col gap-2 custom-shadow p-4"
            >
              <div>
                <input
                  type="text"
                  placeholder="Stage Title"
                  className="border p-2 rounded-md outline-none w-80 block"
                  {...register(`stages.${index}.name` as const)}
                  onChange={(e) =>
                    addStagesHandler(e.target.value, index, "name")
                  }
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
          <button type="button" onClick={addNewStage} className="flex items center space-x-2">
            <span>New Stage</span> <AddIcon />
          </button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
