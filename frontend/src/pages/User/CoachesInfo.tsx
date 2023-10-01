import React from 'react'
import Button from '../../components/ui/Button'
import Plus from "../../assets/Plus"
import Sort from "../../assets/Sort";
import Edit from '../../assets/Edit'
import Delete from '../../assets/Delete'
import Cookies from "universal-cookie"
import Loader from '../../components/ui/Loader'
import { useGetAllCoachesQuery } from '../../features/user/apiSlice';


const CoachesInfo = () => {
  const cookies = new Cookies()
  const jwt = cookies.get("jwt")
  const coachesData = useGetAllCoachesQuery(jwt)
  console.log({coachesData})
  return (
    <div className='py-8'>
        <div className='flex justify-end items-center my-6'>
        
        <Button variant='small'>
            <Plus/>
            <span>Add coache</span>
            </Button>
        </div><div className="flex items-center justify-between">
      <div className="flex w-full  items-center max-w-xl px-1 py-1 h-[58px] border border-[#DBD5E0] rounded-xl">
        <input
          className="px-2 flex-1 outline-none border-none h-full"
          placeholder="Enter name"
          name="search"
        />
        <Button variant="small">Search</Button>
      </div>
      <div className="flex gap-6 items-center">
      <label className="flex gap-6 items-center">
      <div className="flex gap-2 items-center">
          <Sort />
          <span className="text-base font-normal text-[#5B576A]">
            Sort coaches by:
          </span>
        </div>
        <select name="sort" className="forms-select outline-none bg-white gap-32 w-20 block py-2 ">
          <option selected>Name</option>
          <option>Coach</option>
        </select>
       
      </label>
        
      <label className="flex gap-6 items-center">
          <span className="text-base font-normal text-[#5B576A]">
            Coaches per page:
          </span>
        <select name="coachePerPage" className="forms-select outline-none bg-white gap-32 w-12 block py-2 ">
          <option selected>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option> 
        </select>
      </label> 
      </div>
    </div>
            <table className='w-full my-8'>
        <thead className='bg-[#0077B6] bg-opacity-20 h-20'>
            <tr className=''>
                <th className='rounded-l-xl ' colSpan={1}>No</th>
                <th colSpan={1}>Name</th>
                <th colSpan={1}>Email</th>
                <th colSpan={1}>Coach</th>
                <th className="rounded-r-xl" colSpan={1}>Action</th>
                
            </tr>
        </thead>
          {coachesData.status==="pending"?<div className='flex w-screen items-center justify-center h-[50vh]'><Loader/></div>:
        <tbody className='w-full'>
         { coachesData.data?.map((item:any,index:number)=><tr className='border-b border-black h-[100px] '>
                <th className='text-base font-medium' colSpan={1}>{index+1}</th>
                <th className='text-base font-medium' colSpan={1}>{item?.name}</th>
                <th className='text-base font-medium' colSpan={1}>{item?.email}</th>
                <th className='text-base font-medium' colSpan={1}>{item?.role}</th>
                <th className='text-base font-medium' colSpan={1}><div className='flex items-center gap-4 justify-center w-full h-full'><Edit/> <Delete/></div></th>
            </tr>)}
        </tbody>}
    </table>
            
    </div>
  )
}

export default CoachesInfo