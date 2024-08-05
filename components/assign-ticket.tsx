"use client";
import { useState } from "react";
import { Ticket, User } from "@prisma/client";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssignTicketProps {
  ticket: Ticket;
  users: User[];
}

export const AssignTicket = ({ ticket, users }: AssignTicketProps) => {
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState("");

  const assignTicket = async (userId: string) => {
    setError("");
    setAssigning(true);

    try {
      await axios.patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId === "0" ? null: userId,
      })
      setError("")
    } catch (e) {
      setError("Unable to assign ticket")
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div>
      <Select
        defaultValue={ticket.assignedToUserId?.toString() || "0"}
        onValueChange={assignTicket}
        disabled={assigning}
      >
        <SelectTrigger>
          <SelectValue
            placeholder="Select User..."
            defaultValue={ticket.assignedToUserId?.toString() || "0"}
          ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassigned</SelectItem>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-destructive">{error}</p>
    </div>
  );
};
