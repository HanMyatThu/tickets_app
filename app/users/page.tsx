import { UserForm } from '@/components/user-form'
import prisma from '@/prisma/db'
import React from 'react'
import { UserTable } from './datatable'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

const Users = async () => {

  const session = await getServerSession(options);
  const users = await prisma.user.findMany();

  if (session?.user.role !== 'ADMIN') {
    return <p className='text-destructive'>Admin Access is Required</p>
  }

  return (
    <div>
      <UserForm />
      <UserTable users={users}/>
    </div>
  )
}

export default Users