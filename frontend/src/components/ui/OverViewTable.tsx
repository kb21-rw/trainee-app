import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";
import Cookies from "universal-cookie";

import { useGetOverviewQuery } from "../../features/user/apiSlice";
const OverViewTable = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const { data, isFetching, isError } = useGetOverviewQuery({ jwt });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <>
      <Table className="min-w-full border-collapse border border-black text-black">
        <TableHeader>
          <TableRow>
            <TableHead
              scope="col"
              rowSpan={3}
              className="border border-black px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider"
            >
              Name
            </TableHead>
            <TableHead
              scope="col"
              rowSpan={2}
              className="border border-black px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider"
            >
              Coach
            </TableHead>
            {data.map((form: any) =>(
              <TableHead
                key={form._id}
                scope="col"
                colSpan={form.questions.length}
                className="border-black px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider"
              >
                {form.title}
              </TableHead>
            ))}
          </TableRow>

          <TableRow>
            <TableHead
              scope="col"
              className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider"
            >
              Question1
            </TableHead>
            <TableHead
              scope="col"
              className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider"
            >
              Question2
            </TableHead>
            <TableHead
              scope="col"
              className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider"
            >
              Question1
            </TableHead>
            <TableHead
              scope="col"
              className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider"
            >
              Question2
            </TableHead>
            <TableHead
              scope="col"
              className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider"
            >
              Question2
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white divide-y divide-gray-300">
          <TableRow>
            <TableCell className="border border-black p-2">Kevine</TableCell>
            <TableCell className="border border-black p-2">Betty</TableCell>

            <TableCell className="border border-black p-0">
              she did well
            </TableCell>

            <TableCell className="border border-black p-0">
            she did well

            </TableCell>

            <TableCell className="border border-black p-0">
            she did well

            </TableCell>

            <TableCell className="border border-black p-0">
            she did well

            </TableCell>

            <TableCell className="border border-black p-0">
              she did well
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default OverViewTable;
