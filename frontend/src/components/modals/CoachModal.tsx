import React, { ReactNode } from 'react';
import ModalLayout from './ModalLayout';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import { useForm } from 'react-hook-form';
import { useCreateCoachMutation } from '../../features/user/apiSlice';
import Loader from '../ui/Loader';
import Alert from '../ui/Alert';

const CoachPopup = ({closePopup, jwt}:{closePopup:()=>void, jwt:string}) => {
  const [createCoach, {isError, isLoading, error}] = useCreateCoachMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 
  const onSubmit = async (data:any)=>{
    const result =  createCoach({jwt, body:{...data, role:"COACH"}})
  }
  let errorMessage:any = errors.name?.message || errors.email?.message 
  if(error?.data?.code&&error?.data?.code==11000){
    errorMessage = "The email is alredy registered" 
  }
  return (
    <ModalLayout closePopup={closePopup} title="Add coach">
      {isLoading&&<div className='flex items-center justify-center mt-4'><Loader/></div>}
      { errorMessage&&<Alert type='error'>{errorMessage}</Alert>}
        <form onSubmit={handleSubmit((onSubmit))} className='flex flex-col gap-12 w-full mt-20'>
        <InputField type='text' label='Name' placeholder='Coach name' name='name' register={register} options={{required:{value:true, message:"name is required field"}}}/>
        <InputField type='email' label='Email address' placeholder='example@mail.com' name='email' register={register} options={{required:{value:true, message:"email is required field"}}}/>
        <div className='flex gap-2'>
         <Button outlined clickHandler={closePopup}>Cancel</Button>
        <Button>Save</Button>
        </div>
        </form>
    </ModalLayout>
  )
}

export default CoachPopup