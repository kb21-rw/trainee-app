import React from 'react'
import Edit from '../../assets/Edit'
import Delete from '../../assets/Delete'

const UserTable = () => {
  return (
    <table className='w-full my-8'>
        <thead className='bg-[#0077B6] bg-opacity-20 h-20'>
            <tr className=''>
                <th className='rounded-l-xl ' colSpan={1}>No</th>
                <th colSpan={1}>Name</th>
                <th colSpan={1}>Coach</th>
                <th className="rounded-r-xl" colSpan={1}>Action</th>
                
            </tr>
        </thead>
        <tbody className='w-full'>
         {   [1,2,3,43,4,5,5,6,76,3].map((item,index)=><tr className='border-b border-black h-[100px] '>
                <th className='text-base font-medium' colSpan={1}>{index}</th>
                <th className='text-base font-medium' colSpan={1}>Andre Onana</th>
                <th className='text-base font-medium' colSpan={1}>John Doe</th>
                <th className='text-base font-medium' colSpan={1}><div className='flex items-center gap-4 justify-center w-full h-full'><Edit/> <Delete/></div></th>
            </tr>)}
        </tbody>
    </table>
  )
}

export default UserTable