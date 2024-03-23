import React from 'react'

 const OverViewTable = () => {
  return (
    <table className="min-w-full   border-collapse border border-black text-black">
    <thead className="">
      <tr>
        <th scope="col" rowSpan={3} className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider">
          Name
        </th>
        <th scope="col" rowSpan={2}className="border border-black px-6 py-3 text-left text-xs font-extrabold uppercase tracking-wider">
          Coach
        </th>
        <th scope="col" colSpan={2} className="border border-black px-6 py-3 text-black font-extrabold  text-lg text-center  uppercase tracking-wider">
          JavaScript Gate
        </th>
        <th scope="col" colSpan={2} className="border border-black px-6 py-3 text-center text-lg font-extrabold uppercase tracking-wider">
          CSS Gate
        </th>
      </tr>

      <tr>
        <th scope="col" className="border border-black px-6 py-3 text-center text-xs font-extrabold uppercase tracking-wider">
          Question1
        </th>
        <th scope="col" className="border border-black px-6 py-3 text-left text-xs font-extrabold  uppercase tracking-wider">
          Question2
        </th>
        <th scope="col" className="border border-black px-6 py-3 text-left text-xs font-extrabold  uppercase tracking-wider">
          Question1
        </th>
        <th scope="col" className="border border-black px-6 py-3 text-left text-xs font-extrabold  uppercase tracking-wider">
          Question2
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-300">
      <tr>
        <td className='border border-black p-2'>Kevine</td>
        <td className='border border-black p-2'>Betty</td>
        <td className="border border-black p-0">
        <input
        type="text"
        className="w-full h-full  px-2 py-1 focus:outline-none focus:border-blue-500"
        placeholder='Enter answer'

        />
       </td>  
        <td className="border border-black p-0">
        <input
        type="text"
        className="w-full h-full  px-2 py-1 focus:outline-none focus:border-blue-500"
        placeholder='Enter answer'

        />
       </td>  
        <td className="border border-black p-0">
        <input
        type="text"
        className="w-full h-full  px-2 py-1 focus:outline-none focus:border-blue-500"
        placeholder='Enter answer'

        />
       </td>  
        <td className="border border-black p-0">
        <input
        type="text"
        placeholder='Enter answer'
        className="w-full h-full  px-2 py-1 focus:outline-none focus:border-blue-500"
        />
       </td>  
      </tr>
    </tbody>
  </table>

  )
}

export default OverViewTable;