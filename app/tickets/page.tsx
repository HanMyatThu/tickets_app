import React from 'react'

import prisma from '@/prisma/db'
import DataTable from './datatable';

const Tickets = async () => {

  const tickets = await prisma.ticket.findMany();
  
  return (
    <div>
      <DataTable 
        tickets={tickets}
      />
    </div>
  )
}

export default Tickets