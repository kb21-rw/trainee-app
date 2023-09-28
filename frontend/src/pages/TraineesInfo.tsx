import React from 'react'
import Button from '../components/ui/Button'
import Plus from "../assets/Plus"
import TableHeader from '../components/ui/TableHeader'

const TraineesInfo = () => {
  return (
    <div className='py-8'>
        <div className='flex justify-end items-center my-6'>

        <Button variant='small'>
            <Plus/>
            <span>Add trainee</span>
            </Button>
        </div>
            <TableHeader/>
    </div>
  )
}

export default TraineesInfo