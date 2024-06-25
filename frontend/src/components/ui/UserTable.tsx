/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction } from "react";
import Edit from "../../assets/EditIcon";
import Delete from "../../assets/DeleteIcon";
import Loader from "../../components/ui/Loader";
import NotFound from "./NotFound";
interface PropTypes {
  headers: string[];
  isLoading: boolean;
  data: string[][];
  actions?: {
    type: string;
    actionCaller:
      | Dispatch<SetStateAction<string[] | null>>
      | ((_id: string) => Promise<void>);
  }[];
}

const UserTable = ({ headers, isLoading, data, actions }: PropTypes) => {
  return (
    <table className="w-full my-8 table-auto object-fit">
      <thead className="bg-[#0077B6] bg-opacity-20 h-20 border border-orange-300">
        <tr className="">
          {headers.map((header: string, index: number) => (
            <td
              key={index}
              className="first:rounded-l-xl last:rounded-r-xl pl-10"
            >
              {header}
            </td>
          ))}
        </tr>
      </thead>
      {isLoading ? (
        <tbody>
          <tr className="flex w-screen items-center justify-center h-[50vh]">
            <td className="w-full flex items-center justify-center">
              <Loader />
            </td>
          </tr>
        </tbody>
      ) : data.length === 0 ? (
        <tbody>
          <tr className="flex w-screen h-[50vh]">
            <td className="w-full h-auto">
              <NotFound type="User" />
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {data.map((userData: string[], index: number) => (
            <tr key={userData[0]} className="border-b border-black h-[100px]">
              <td className="text-base font-medium pl-10">{index + 1}</td>
              {userData.slice(1).map((item: string, index: number) => (
                <td key={index} className="text-base font-medium pl-12">
                  {item}
                </td>
              ))}
              <td className="text-base font-medium">
                <div className="flex items-center gap-4 h-full pl-8">
                  {actions?.map((action: any, index: number) => (
                    <button
                      key={index}
                      onClick={() =>
                        action.actionCaller(
                          action.type == "delete" ? userData[0] : userData
                        )
                      }
                    >
                      {action.type == "delete" && <Delete />}
                      {action.type == "edit" && <Edit />}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default UserTable;
