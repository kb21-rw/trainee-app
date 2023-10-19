import React from "react";
import Edit from "../../assets/Edit";
import Delete from "../../assets/Delete";
import Loader from "../../components/ui/Loader";

const UserTable = ({ headers, isLoading, data, actions }: any) => {
  return (
    <table className="w-full my-8 table-auto">
      <thead className="bg-[#0077B6] bg-opacity-20 h-20">
        <tr className="w-full">
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
        <div className="flex w-screen items-center justify-center h-[50vh]">
          <Loader />
        </div>
      ) : (
        <tbody className="w-full">
          {data?.map((user: any, index: number) => {
            return (
              <tr
                key={user[0]}
                className="border-b border-black h-[100px] w-full"
              >
                <td className="text-base font-medium pl-12">{index + 1}</td>
                {user.slice(1).map((item: string) => (
                  <td className="text-base font-medium pl-12">{item}</td>
                ))}
                <td className="text-base font-medium pl-12">
                  <div className="flex items-center gap-4 w-full h-full">
                    {actions.map((action: any) => (
                      <button
                        onClick={() =>
                          action.actionCaller(
                            action.type == "delete" ? user[0] : user,
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
            );
          })}
        </tbody>
      )}
    </table>
  );
};

export default UserTable;
