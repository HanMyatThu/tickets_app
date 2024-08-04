import React from 'react'

import prisma from '@/prisma/db'
import DataTable from './datatable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Pagination } from '@/components/pagination';

interface searchParams {
  searchParams: { page: string }
}

const Tickets = async ({
  searchParams,
}: searchParams) => {

  const ticketscount = await prisma.ticket.count();

  const pageSize = 10

  const page = parseInt(searchParams.page) || 1;

  const tickets = await prisma.ticket.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  
  return (
    <div>
      <Link
        href="/tickets/new"
        className={buttonVariants({ variant: "default" })}
      >
        New Ticket
      </Link>
      <DataTable 
        tickets={tickets}
      />
      <Pagination 
        itemCount={ticketscount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  )
}

export default Tickets