import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../../@/components/ui/table"
const OverViewTable = () => {
 return (
        <>
<Table className="min-w-full   border-collapse border border-black text-black">
  
  <TableHeader>

    <TableRow>
      <TableHead scope="col" rowSpan={3} className="border  border-black px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider">Name</TableHead>
      <TableHead  scope="col" rowSpan={2} className="border border-black px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider">Coach</TableHead>
      <TableHead  scope="col" colSpan={2} className="border-black px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider">Javascript Gate</TableHead>
      <TableHead scope="col" colSpan={3}  className="border border-black px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider">Css Gate</TableHead>
    </TableRow>

    <TableRow>
      <TableHead scope="col"  className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider">Question1</TableHead>
      <TableHead  scope="col" className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider">Question2</TableHead>
      <TableHead  scope="col" className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider">Question1</TableHead>
      <TableHead scope="col"  className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider">Question2</TableHead>
      <TableHead scope="col"  className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider">Question2</TableHead>
    </TableRow>

  </TableHeader>

  <TableBody className="bg-white divide-y divide-gray-300">

    <TableRow>
      <TableCell  className='border border-black p-2'>Kevine</TableCell>
      <TableCell  className='border border-black p-2'>Betty</TableCell>

      <TableCell  className='border border-black p-0'>
      <input
        type="text"
        className="w-full h-full  px-2 py-1 focus:outline-none focus:border-blue-500"
        placeholder='Enter answer'

        /> 
      </TableCell>

      <TableCell  className='border border-black p-0'>
      <input
        type="text"
        className="w-full h-full  px-2 py-1 focus:outline-none focus:border-blue-500"
        placeholder='Enter answer'

        />
      </TableCell>

      <TableCell  className='border border-black p-0'>
      <input
        type="text"
        className="w-full h-full  px-2 py-1 focus:outline-none focus:border-blue-500"
        placeholder='Enter answer'
        />
      </TableCell>

      <TableCell  className='border border-black p-0'>
      <input
        type="text"
        className="w-full h-full  px-2 py-1 focus:outline-none focus:border-blue-500"
        placeholder='Enter answer'
        />
      </TableCell>

      <TableCell  className='border border-black p-0'>
      <input
        type="text"
        className="w-full h-full  px-2 py-1 focus:outline-none focus:border-blue-500"
        placeholder='Enter answer'
        />
      </TableCell>

    </TableRow>
  </TableBody>
</Table>     
</>
    );
}

export default OverViewTable;