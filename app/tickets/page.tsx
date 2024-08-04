import React from "react";

import prisma from "@/prisma/db";
import DataTable from "./datatable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Pagination } from "@/components/pagination";
import { StatusFilter } from "@/components/status-filter";
import { Status } from "@prisma/client";

interface searchParams {
  searchParams: { page: string; status: Status };
}

const Tickets = async ({ searchParams }: searchParams) => {

  const pageSize = 10;

  const page = parseInt(searchParams.page) || 1;

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {}

  if (status) {
    where = {
      status,
    }
  } else {
    where = {
      NOT: [{ status: "CLOSED" as Status }]
    }
  }

  const tickets = await prisma.ticket.findMany({
    where,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const ticketscount = await prisma.ticket.count({
    where,
  });


  return (
    <div>
      <div className="flex justify-between">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: "default" })}
        >
          New Ticket
        </Link>
        <StatusFilter />
      </div>
      <DataTable tickets={tickets} />
      <Pagination
        itemCount={ticketscount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
