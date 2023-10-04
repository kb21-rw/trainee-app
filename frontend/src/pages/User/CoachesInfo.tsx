import React, { useEffect, useState, useRef, InputHTMLAttributes } from "react";
import Button from "../../components/ui/Button";
import Plus from "../../assets/Plus";
import Sort from "../../assets/Sort";
import Edit from "../../assets/Edit";
import Delete from "../../assets/Delete";
import Cookies from "universal-cookie";
import Loader from "../../components/ui/Loader";
import {
  useDeleteCoachMutation,
  useGetAllCoachesQuery,
} from "../../features/user/apiSlice";
import AddingCoachModal from "../../components/modals/AddingCoachModal";

const CoachesInfo = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const searchRef = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("entry");
  const [usersPerPage, setUsersPerPage] = useState("10");
  const [query, setQuery] = useState("");
  const coachesData = useGetAllCoachesQuery({ jwt, query });
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteCoach, { isError, isLoading, error }] = useDeleteCoachMutation();
  const handleDeleteCoach = (id: string) => {
    const result = deleteCoach({ jwt, id });
  };
  const [searchString, setSearchString] = useState("");
  const onSubmitSearch = () => {
    setSearchQuery(searchString);
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      setSearchQuery(searchString);
    }
  };
  useEffect(() => {
    setQuery(
      `?searchString=${searchQuery}&sortBy=${sortBy}&coachesPerPage=${usersPerPage}`
    );
  }, [searchQuery, sortBy, usersPerPage]);
  return (
    <div>
      <div className="py-8">
        <div className="flex justify-end items-center my-6">
          <Button clickHandler={() => setOpenPopup(!openPopup)} variant="small">
            <Plus />
            <span>Add coach</span>
          </Button>
        </div>
        <div className="flex items-center justify-between gap-16">
          <div className="flex w-full  items-center max-w-xl px-1 py-1 h-[58px] border border-[#DBD5E0] rounded-xl">
            <input
              className="px-2 flex-1 outline-none border-none h-full"
              placeholder="Enter name"
              name="search"
              value={searchString}
              onChange={(event) => setSearchString(event.target.value)}
              ref={searchRef}
              onKeyDown={handleKeyPress}
            />
            <Button clickHandler={onSubmitSearch} variant="small">
              Search
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            <label className="flex gap-6 items-center">
              <div className="flex gap-2 items-center">
                <Sort />
                <span className="text-base font-normal text-[#5B576A] whitespace-nowrap">
                  Sort coaches by:
                </span>
              </div>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                name="sort"
                className="forms-select outline-none bg-white gap-32 w-[72px] block py-2 "
              >
                <option value="all" selected>
                  Entry
                </option>
                <option value="name">Name</option>
                <option value="email">Email</option>
              </select>
            </label>

            <label className="flex gap-6 items-center">
              <span className="text-base font-normal text-[#5B576A] whitespace-nowrap">
                Coaches per page:
              </span>
              <select
                value={usersPerPage}
                onChange={(event) => setUsersPerPage(event.target.value)}
                name="coachePerPage"
                className="forms-select outline-none bg-white gap-32 w-12 block py-2 "
              >
                <option value="10" selected>
                  10
                </option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </label>
          </div>
        </div>
        <table className="w-full my-8 table-auto">
          <thead className="bg-[#0077B6] bg-opacity-20 h-20">
            <tr className="w-full">
              <td className="rounded-l-xl pl-12 font-semibold">No</td>
              <td className="pl-12 font-semibold">Name</td>
              <td className="pl-12 font-semibold">Email</td>
              <td className="pl-12 font-semibold">Role</td>
              <td className="rounded-r-xl pl-12 font-semibold">Action</td>
            </tr>
          </thead>
          {coachesData.status === "pending" ? (
            <div className="flex w-screen items-center justify-center h-[50vh]">
              <Loader />
            </div>
          ) : (
            <tbody className="w-full">
              {coachesData.data?.map((coach: any, index: number) => (
                <tr
                  key={coach._id}
                  className="border-b border-black h-[100px] w-full"
                >
                  <td className="text-base font-medium pl-12">{index + 1}</td>
                  <td className="text-base font-medium pl-12">{coach?.name}</td>
                  <td className="text-base font-medium pl-12">
                    {coach?.email}
                  </td>
                  <td className="text-base font-medium pl-12">{coach?.role}</td>
                  <td className="text-base font-medium pl-12">
                    <div className="flex items-center gap-4 w-full h-full">
                      <button>
                        <Edit />
                      </button>{" "}
                      <button onClick={() => handleDeleteCoach(coach._id)}>
                        <Delete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {openPopup && (
        <AddingCoachModal jwt={jwt} closePopup={() => setOpenPopup(false)} />
      )}
    </div>
  );
};

export default CoachesInfo;
