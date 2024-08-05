import { UserForm } from '@/components/user-form'
import prisma from '@/prisma/db'
import React from 'react'
import { UserTable } from './datatable'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

const Users = async () => {

  // const session = await getServerSession(options);

  // if (session?.user.role !== 'ADMIN') {
  //   return <p className='text-destructive'>Admin Access is Required</p>
  // }

  const users = await prisma.user.findMany();

  return (
    <div>
      <UserForm />
      <UserTable users={users}/>
    </div>
  )
}

export default Users