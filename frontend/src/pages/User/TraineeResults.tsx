import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";
import { Question, Response, Form } from "../../types";

import { useGetOverviewForCoachQuery } from "../../features/user/apiSlice";
import Loader from "../../components/ui/Loader";
import { getJWT, getRandomColorAndTextColor } from "../../utils/helper";
import ResponseModal from "../../components/modals/ResponseModal";
const TraineeResults = () => {
  const jwt:string = getJWT()
  const { data, isLoading, isError } = useGetOverviewForCoachQuery({ jwt });
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    formTitle: "",
    question: "",
    questionId: "",
    userId: "",
    response: "",
    type: "",
    questionType: "",
    options: [] as string[],
    checkedOption: "",
  });

  if (isError) {
    return <Loader />;
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        No data available.
      </div>
    );
  }

  const traineeMap = new Map();

  const formStyles = data.map(() => getRandomColorAndTextColor());
  data.forEach((form: Form) => {
    form.questions.forEach((question: Question) => {
      const questionType = question.options.length > 0 ? "dropdown" : "text";
      question.responses.forEach((response: Response) => {
        if (response.user) {
          if (!traineeMap.has(response.user._id)) {
            traineeMap.set(response.user._id, {
              name: response.user.name,
              coach: response.user.coach?.name,
              id: response.user._id,
              responses: {},
              type: questionType,
            });
          }

          const traineeInfo = traineeMap.get(response.user._id);
          traineeInfo.responses[`${form._id}-${question._id}`] =
            response.text ?? "No response";
        }
      });
    });
  });

  return (
    <div className="py-20 overflow-x-auto">
      <Table className="min-w-full border-collapse border border-black text-black">
        <TableHeader>
          <TableRow>
            <TableHead
              scope="col"
              rowSpan={3}
              className="border border-black px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider"
            >
              Name
            </TableHead>
            {data.map((form, index) => (
              <TableHead
                key={form._id}
                scope="col"
                colSpan={form.questions.length}
                className={`px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider ${
                  index !== data.length - 1 ? "border-r border-black" : ""
                }`}
                style={{ backgroundColor: formStyles[index].backgroundColor }}
              >
                {form.title}
              </TableHead>
            ))}
          </TableRow>
          <TableRow>
            {data.flatMap((form) =>
              form.questions.map((question: Question) => (
                <TableHead
                  key={question._id}
                  scope="col"
                  className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider max-w-md overflow-auto whitespace-nowrap"
                >
                  {question.title}
                </TableHead>
              ))
            )}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-300">
          {Array.from(traineeMap.values()).map((trainee) => (
            <TableRow key={trainee.name}>
              <TableCell className="border border-black p-2 whitespace-nowrap w-16">
                {trainee.name ?? "No name"}
              </TableCell>
              {data.flatMap((form) =>
                form.questions.map((question: Question) => (
                  <TableCell
                    key={`${form._id}-${question._id}`}
                    className="border border-black p-2 w-16 max-w-md overflow-hidden whitespace-nowrap text-ellipsis"
                    onClick={() => {
                      setIsModalOpen(true);
                      setModalData({
                        formTitle: form.title,
                        question: question.title,
                        questionId: question._id ?? "",
                        response:
                          trainee.responses[`${form._id}-${question._id}`],
                        userId: trainee.id,
                        type: trainee.type,
                        questionType:
                          question.options.length > 0 ? "dropdown" : "text",
                        options: question.options,
                        checkedOption: trainee.responses[`${form._id}-${question._id}`] ? trainee.responses[`${form._id}-${question._id}`]: "",
                      });
                    }}
                  >
                    {trainee.responses[`${form._id}-${question._id}`] ??
                      "No response"}
                  </TableCell>
                ))
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalOpen && (
        <ResponseModal
          closePopup={() => setIsModalOpen(false)}
          title={modalData.formTitle}
          question={modalData.question}
          questionId={modalData.questionId}
          userId={modalData.userId}
          response={modalData.response}
          includeButton={true}
          questionType={modalData.questionType}
          options={modalData.options}
          checkedOption={modalData.checkedOption}
          handleCheckChange={(value: string) => setModalData({ ...modalData, checkedOption: value })}
        />
      )}
    </div>
  );
};

export default TraineeResults;
