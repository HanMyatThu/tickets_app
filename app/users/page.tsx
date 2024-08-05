import { UserForm } from '@/components/user-form'
import prisma from '@/prisma/db'
import React from 'react'
import { UserTable } from './datatable'

const Users = async () => {

  const users = await prisma.user.findMany();

  return (
    <div>
      <UserForm />
      <UserTable users={users}/>
    </div>
  )
}

export default Users