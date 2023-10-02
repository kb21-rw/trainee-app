import React from 'react';
import ModalLayout from './ModalLayout';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import { useForm } from 'react-hook-form';
import { useCreateCoachMutation } from '../../features/user/apiSlice';

const CoachPopup = ({closePopup, jwt}:{closePopup:()=>void, jwt:string}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 
  const onSubmit = async (data:any)=>{
    const result = await useCreateCoachMutation({jwt, ...data, role:"COACH",})
    console.log({result})
  }
  return (
    <ModalLayout closePopup={closePopup} title="Add coach">
        <form onSubmit={handleSubmit((onSubmit))} className='flex flex-col gap-12 w-full mt-20'>
        <InputField type='text' label='Name' placeholder='Coach name' name='name' register={register} options={{required:true}}/>
        <InputField type='email' label='Email address' placeholder='example@mail.com' name='email' register={register} options={{required:true}}/>
        <div className='flex gap-2'>
         <Button clickHandler={closePopup}>Cancel</Button>
        <Button>Save</Button>
        </div>
        </form>
    </ModalLayout>
  )
}

export default CoachPopup