import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Sort from "../../assets/SortIcon";
import SearchInput from "./SearchInput";

const ApplicantTableHeader = ({
  setQuery,
  sortingValues,
  applicantsPerPageValues,
  userType,
}: {
  setQuery: Dispatch<SetStateAction<string>>;
  sortingValues: { title: string; value: string }[];
  applicantsPerPageValues: number[];
  userType: string;
}) => {
  const DEFAULTCOACHESPERPAGE = "10";
  const [sortBy, setSortBy] = useState("entry");
  const [usersPerPage, setApplicantsPerPage] = useState(DEFAULTCOACHESPERPAGE);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    return setQuery(
      `?searchString=${searchQuery}&sortBy=${sortBy}&coachesPerPage=${usersPerPage}`,
    );
  }, [searchQuery, sortBy, usersPerPage, setQuery]);
  return (
    <div className="flex items-center justify-between gap-16">
      <SearchInput setSearchQuery={setSearchQuery} />
      <div className="flex gap-4 items-center">
        <label className="flex gap-6 items-center">
          <div className="flex gap-2 items-center">
            <Sort />
            <span className="text-base font-normal text-[#5B576A] whitespace-nowrap">
              {userType === "Applicant"
                ? "Sort applicants by:"
                : "Sort names by:"}
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
            {userType === "Applicants"
              ? "Applicants per page:"
              : "Names per page:"}
          </span>
          <select
            value={usersPerPage}
            onChange={(event) => setApplicantsPerPage(event.target.value)}
            name="namesPerPage"
            className="forms-select outline-none bg-white gap-32 w-12 block py-2 "
          >
            {applicantsPerPageValues.map(
              (applicantsPerPageValues: number, index: number) => (
                <option key={index} value={applicantsPerPageValues}>
                  {applicantsPerPageValues}
                </option>
              ),
            )}
          </select>
        </label>
      </div>
    </div>
  );
};

export default ApplicantTableHeader;
