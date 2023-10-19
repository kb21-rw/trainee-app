import React, { useState, useRef, useEffect } from "react";
import Sort from "../../assets/Sort";
import Button from "./Button";

const UserTableHeader = ({ setQuery }: any) => {
  const DEFAULTCOACHESPERPAGE = "10";
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("entry");
  const [usersPerPage, setUsersPerPage] = useState(DEFAULTCOACHESPERPAGE);
  const [searchString, setSearchString] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
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
            <option value="role">Role</option>
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
            <option value={DEFAULTCOACHESPERPAGE} selected>
              {DEFAULTCOACHESPERPAGE}
            </option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default UserTableHeader;
