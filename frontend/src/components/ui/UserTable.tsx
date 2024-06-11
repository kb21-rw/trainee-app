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
    <table className="w-full my-8 table-auto">
      <thead className="bg-[#0077B6] bg-opacity-20 h-20">
        <tr>
        {headers.map((header: string, index: number) => (
            <td
              key={index}
              className="first:rounded-l-xl last:rounded-r-xl pl-12 font-semibold"
            >
              {header}
            </td>
          ))}
        </tr>
      </thead>
      {isLoading ? (
       <tbody>
         <tr className="flex w-screen items-center justify-center h-[50vh]">
          <Loader />
        </tr>
     </tbody>
      ) : data.length === 0 ? (
        <tbody>
         <tr className="flex h-[50vh]">
            <NotFound type="User" />
        </tr>
     </tbody>
      ) : (
        <tbody>
          {data.map((userData: string[], index: number) => (
            <tr
              key={userData[0]}
              className="border-b border-black h-[100px]"
            >
              <td className="text-base font-medium pl-12 pr-20">{index + 1}</td>
              {userData.slice(1).map((item: string, index: number) => (
                <td key={index} className="text-base font-medium pl-12">
                  {item}
                </td>
              ))}
              <td className="text-base font-medium">
                <div className="flex items-center gap-4 h-full">
                  {actions?.map((action: any, index: number) => (
                    <button
                      key={index}
                      onClick={() =>
                        action.actionCaller(
                          action.type == "delete" ? userData[0] : userData,
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
