import React, { useRef } from "react";
import SearchIcon from "../../assets/SearchIcon";

const SearchInput = ({ setSearchQuery }: { setSearchQuery: any }) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex w-full items-center max-w-xl h-14 border border-gray-250 rounded-xl">
      <div className="bg-primary-dark h-full rounded-tl-xl rounded-bl-xl flex items-center justify-center p-2 text-white space-x-1">
        <SearchIcon />
      </div>
      <input
        className="px-2 flex-1 outline-none border-none h-full w-5/6  rounded-xl"
        placeholder="Enter name"
        name="search"
        onChange={handleInputChange}
        ref={searchRef}
      />
    </div>
  );
};

export default SearchInput;
