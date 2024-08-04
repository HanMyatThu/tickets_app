import { PriorityBadge } from "@/components/priority-badge";
import { StatusBadge } from "@/components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ticket } from "@prisma/client";
import Link from "next/link";
interface DataTableProps {
  tickets: Ticket[];
}

const DataTable = ({ tickets }: DataTableProps) => {
  console.log(tickets, "tickets");
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>
                <div className="flex justify-center">Status</div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">Priority</div>
              </TableHead>
              <TableHead>created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets
              ? tickets.map((ticket) => (
                  <TableRow key={ticket.id} data-href="/">
                    <TableCell>
                      <Link href={`/tickets/${ticket.id}`}>
                        {ticket.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <StatusBadge status={ticket.status} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <PriorityBadge priority={ticket.priority} />
                      </div>
                    </TableCell>
                    <TableCell>
                      {ticket.createdAt.toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
