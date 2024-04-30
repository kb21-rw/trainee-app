import React from 'react';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "../../../@/components/ui/table";
 import Cookies from "universal-cookie";
import { Question,Response,Form } from '../../types';

import { useGetOverviewQuery } from "../../features/user/apiSlice";
import Loader from '../../components/ui/Loader';
 const  OverView = () => {
   const cookies = new Cookies();
   const jwt = cookies.get("jwt");
   const { data, isFetching, isError } = useGetOverviewQuery({ jwt });
    if (isFetching) {
     return <Loader/>;
   }

    if (isError) {
     return <Loader/>;
   }

    if (!Array.isArray(data) || data.length === 0) {
     return <div>No data available.</div>;
   }

   console.log(data);

    const traineeMap = new Map();

   data.forEach((form:Form) => {
     form.questions.forEach((question:Question) => {
       question.responses.forEach((response:Response) => {
         if (response.user) {
           if (!traineeMap.has(response.user._id)) {
             traineeMap.set(response.user._id, {
               name: response.user.name,
               coach: response.user.coach?.name,
               responses: {}
             });
           }


          const traineeInfo = traineeMap.get(response.user._id);
           traineeInfo.responses[`${form._id}-${question._id}`] = response.text ?? "No response";
         }
       });
     });
   });
    return (
     <div className='py-6 overflow-x-auto'>
       <Table className="min-w-full border-collapse border border-black text-black">
         <TableHeader>
           <TableRow>
             <TableHead scope="col" rowSpan={3} className="border border-black px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider">
               Name
             </TableHead>
             <TableHead scope="col" rowSpan={2} className="border border-black px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider">
               Coach
             </TableHead>
             {data.map((form, index) => (
               <TableHead key={form._id} scope="col" colSpan={form.questions.length} className={`px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider ${index !== data.length - 1 ? "border-r border-black" : ""}`}>
                 {form.title}
               </TableHead>
             ))}
           </TableRow>
           <TableRow>
             {data.flatMap((form) => form.questions.map((question:Question) => (
               <TableHead key={question._id} scope="col" className="border border-black px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider">
                 {question.title}
               </TableHead>
             )))}
           </TableRow>
         </TableHeader>
         <TableBody className="bg-white divide-y divide-gray-300">
           {Array.from(traineeMap.values()).map((trainee) => (
             <TableRow key={trainee.name}>
               <TableCell className="border border-black p-2 whitespace-nowrap w-16">
                 {trainee.name ?? 'No name'}
               </TableCell>
               <TableCell className="border border-black p-2 whitespace-nowrap w-16">
                 {trainee.coach ?? 'No coach'}
               </TableCell>
               {data.flatMap((form) => form.questions.map((question:Question) => (
                 <TableCell key={`${form._id}-${question._id}`} className="border border-black p-2 whitespace-nowrap w-16">
                   {trainee.responses[`${form._id}-${question._id}`] ?? "No response"}
                 </TableCell>
               )))}
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </div>
   );}


export default OverView;

