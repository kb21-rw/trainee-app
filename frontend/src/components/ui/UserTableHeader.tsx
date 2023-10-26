import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  KeyboardEventHandler,
} from "react";
import Sort from "../../assets/Sort";
import Button from "./Button";

const UserTableHeader = ({
  setQuery,
  sortingValues,
  usersPerPageValues,
}: {
  setQuery: Dispatch<SetStateAction<string>>;
  sortingValues: { title: string; value: string }[];
  usersPerPageValues: number[];
}) => {
  const DEFAULTCOACHESPERPAGE = "10";
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("entry");
  const [usersPerPage, setUsersPerPage] = useState(DEFAULTCOACHESPERPAGE);
  const [searchString, setSearchString] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const onSubmitSearch = () => {
    setSearchQuery(searchString);
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(searchString);
    }
  };

  useEffect(() => {
    return setQuery(
      `?searchString=${searchQuery}&sortBy=${sortBy}&coachesPerPage=${usersPerPage}`,
    );
  }, [searchQuery, sortBy, usersPerPage, setQuery]);
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
            {sortingValues.map((sortingValue, index: number) => (
              <option key={index} value={sortingValue.value}>
                {sortingValue.title}
              </option>
            ))}
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
            {usersPerPageValues.map((usersPerPage: number, index: number) => (
              <option key={index} value={usersPerPage}>
                {usersPerPage}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default UserTableHeader;
