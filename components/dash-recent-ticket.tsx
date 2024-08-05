import { Prisma } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StatusBadge } from "./status-badge";
import Link from "next/link";
import { PriorityBadge } from "./priority-badge";

type TickeWithUser = Prisma.TicketGetPayload<{
  include: { assignedToUser: true };
}>;

interface Props {
  tickets: TickeWithUser[];
}

export const DashRecentTicket = ({ tickets }: Props) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
      </CardHeader>
      <CardContent>
          <div className="space-y-8">
            {tickets
              ? tickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center">
                    <StatusBadge status={ticket.status} />
                    <div className="ml-4 space-y-1">
                      <Link href={`/tickets/${ticket.id}`}>
                        <p>{ticket.name}</p>
                        <p>{ticket.assignedToUser?.name || "Unassigned"}</p>
                      </Link>
                    </div>
                    <div className="ml-auto font-medium">
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                  </div>
                ))
              : null}
          </div>
        </CardContent>
    </Card>
  );
};
