"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteTicketProps {
  ticketId: number;
}

export const DeleteTicket = ({ ticketId }: DeleteTicketProps) => {

  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);


  const deleteTicket = async () => {
    try {
      setIsDeleting(true)
      setError("")
      await axios.delete("/api/tickets/"+ ticketId);
      router.push("/tickets");
      router.refresh();
    } catch (e) {
      setIsDeleting(false);
      setError("Unknown Error Occurred");
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          disabled={isDeleting}
          className={`${buttonVariants({
            variant: "destructive",
          })}`}
        >
          Delete Ticket
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              ticket.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={`${buttonVariants({
                variant: "destructive",
              })}`}
              onClick={deleteTicket}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </>
  );
};
