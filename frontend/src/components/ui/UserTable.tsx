/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction } from "react";
import Edit from "../../assets/EditIcon";
import Delete from "../../assets/DeleteIcon";
import Loader from "../../components/ui/Loader";
import NotFound from "./NotFound";
import { FaFileAlt } from "react-icons/fa";
interface PropTypes {
  headers: string[];
  isLoading: boolean;
  data: string[][];
  response?: boolean;
  actions?: {
    type: string;
    actionCaller:
      | Dispatch<SetStateAction<string[] | null>>
      | ((_id: string) => Promise<void>);
  }[];
}

const UserTable = ({
  headers,
  isLoading,
  data,
  response,
  actions,
}: PropTypes) => {
  return (
    <table className="w-full my-8 table-auto object-fit">
      <thead className="bg-primary-light bg-opacity-20 h-20">
       {data && (
         <tr>
         {headers.map((header: string, index: number) => (
           <td
             key={index}
             className="first:rounded-l-xl last:rounded-r-xl pl-12 text-center"
           >
             {header}
           </td>
         ))}
       </tr>
       )}
      </thead>
      {isLoading ? (
        <tbody>
          <tr className="flex w-screen items-center justify-center h-[50vh]">
            <td className="w-full flex items-center justify-center">
              <Loader />
            </td>
          </tr>
        </tbody>
      ) : (data?.length === 0 || data === undefined )? (
        <tbody>
          <tr className="flex w-screen h-[50vh]">
            <td className="w-full h-full">
              <NotFound type="User" />
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {data?.map((userData: string[], index: number) => (
            <tr key={userData[0]} className="border-b border-black h-[100px]">
              <td className="text-base font-medium pl-10 text-center">
                {index + 1}
              </td>
              {userData.slice(1).map((item: string, index: number) => (
                <td
                  key={index}
                  className="text-base font-medium pl-12 text-center"
                >
                  {item}
                </td>
              ))}
              {response && (
                <td className="text-base font-medium pl-28 text-center">
                  <span className="cursor-pointer">
                    <FaFileAlt className="text-2xl hover:text-primary-dark"/>
                  </span>
                </td>
              )}
              <td className="text-base font-medium">
                <div className="flex items-center justify-center gap-4 h-full">
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
                      {action.type == "accept" && (
                        <span className="px-8 py-2 bg-primary-dark/70 text-white rounded hover:bg-primary-dark transition-all ease-in-out">
                          Accept
                        </span>
                      )}
                      {action.type == "reject" && (
                        <span className="px-8 py-2 bg-red-400/70 text-white rounded hover:bg-red-400 transition-all ease-in-out">
                          Reject
                        </span>
                      )}
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
