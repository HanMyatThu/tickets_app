import { DashChart } from "@/components/dash-chart";
import { DashRecentTicket } from "@/components/dash-recent-ticket";
import prisma from "@/prisma/db";

const DashBoard = async () => {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: "CLOSED" }],
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const groupTickets = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const data = groupTickets.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    }
  })

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div>
          <DashRecentTicket tickets={tickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
      </div>
    </div>
  )
};

export default DashBoard;
