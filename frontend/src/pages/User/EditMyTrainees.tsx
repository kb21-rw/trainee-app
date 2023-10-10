import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import Sort from "../../assets/Sort";
import Edit from "../../assets/Edit";
import Cookies from "universal-cookie";
import Loader from "../../components/ui/Loader";
import { useGetMyTraineesQuery } from "../../features/user/apiSlice";
import AddingTraineeModal from "../../components/modals/AddingTraineeModal";
import EditUser from "../../components/modals/EditUser";
import EditTrainee from "../../components/modals/EditTrainee";

const DEFAULTTRAINEESPERPAGE = "10";
const EditMyTrainees = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("entry");
  const [usersPerPage, setUsersPerPage] = useState(DEFAULTTRAINEESPERPAGE);
  const [searchString, setSearchString] = useState("");
  const [query, setQuery] = useState("");
  const {
    data,
    isLoading: isTrainerLoading,
    isFetching: isTrainerFetching,
  } = useGetMyTraineesQuery({ jwt, query });
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedItem, setSelectecItem] = useState<number>();
  const [openEditPopup, setOpenEditPopup] = useState<boolean>(false);
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
      `?searchString=${searchQuery}&sortBy=${sortBy}&coachesPerPage=${usersPerPage}`,
    );
  }, [searchQuery, sortBy, usersPerPage]);

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mt-24">
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
        <div className="flex gap-6 items-center">
          <label className="flex gap-6 items-center">
            <div className="flex gap-2 items-center">
              <Sort />
              <span className="text-base font-normal text-[#5B576A]">
                Sort trainees by:
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
            </select>
          </label>

          <label className="flex gap-6 items-center">
            <span className="text-base font-normal text-[#5B576A]">
              Trainees per page:
            </span>
            <select
              value={usersPerPage}
              onChange={(event) => setUsersPerPage(event.target.value)}
              name="traineePerPage"
              className="forms-select outline-none bg-white gap-32 w-12 block py-2 "
            >
              <option value={DEFAULTTRAINEESPERPAGE} selected>
                {DEFAULTTRAINEESPERPAGE}
              </option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
      <table className="w-full my-8">
        <thead className="bg-[#0077B6] bg-opacity-20 h-20">
          <tr className="">
            <td className="rounded-l-xl pl-12 font-semibold">No</td>
            <td className="pl-12 font-semibold">Name</td>
            <td className="pl-12 font-semibold">Coach</td>
            <td className="rounded-r-xl pl-12 font-semibold">Edit</td>
          </tr>
        </thead>
        {isTrainerFetching ? (
          <div className="flex w-screen items-center justify-center h-[50vh]">
            <Loader />
          </div>
        ) : (
          <tbody className="w-full">
            {data.map((trainee: any, index: number) => (
              <tr
                key={trainee._id}
                className="border-b border-black h-[100px] "
              >
                <td className="text-base font-medium pl-12">{index + 1}</td>
                <td className="text-base font-medium pl-12">{trainee.name}</td>
                <td className="text-base font-medium pl-12">
                  {trainee.coach?.name || "No coach assigned"}
                </td>
                <td className="text-base font-medium pl-12">
                  <div className="flex items-center gap-4 w-full h-full">
                    <button
                      onClick={() => {
                        setSelectecItem(index), setOpenEditPopup(true);
                      }}
                    >
                      <Edit />
                    </button>
                    {selectedItem === index && openEditPopup && (
                      <EditTrainee
                        jwt={jwt}
                        closePopup={() => setOpenEditPopup(false)}
                        trainee={trainee}
                        id={trainee?._id}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default EditMyTrainees;
