import Link from "next/link";
import { Ticket } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { PriorityBadge } from "@/components/priority-badge";
import { buttonVariants } from "@/components/ui/button";
import Markdown from 'react-markdown'
import { DeleteTicket } from "./delete-ticket";

interface ticketDetailProps {
  ticket: Ticket;
}

const TicketDetail = ({ ticket }: ticketDetailProps) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.name}</CardTitle>
          <CardDescription>
            Created At:{" "}
            {ticket.createdAt.toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <Markdown>
            {ticket.description}
          </Markdown>
        </CardContent>
        <CardFooter>
          Updated At:{" "}
          {ticket.updatedAt.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </CardFooter>
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({
            variant: "default"
          })}`}
        >
          Edit Ticket
        </Link>
        <DeleteTicket ticketId={ticket.id} />
        
      </div>
    </div>
  );
};

export default TicketDetail;
