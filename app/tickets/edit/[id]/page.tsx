import { TicketForm } from "@/components/ticket-form";
import prisma from "@/prisma/db";

interface EditTicketProps {
  params: { id: string };
}

const EditTicket = async ({ params }: EditTicketProps) => {

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return (
      <p className="text-destructive">
        Ticket Not Found
      </p>
    )
  }

  return (
    <div>
      <TicketForm ticket={ticket} />
    </div>
  );
};

export default EditTicket;
