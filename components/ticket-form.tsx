"use client";

import { ticketSchema } from "@/validationSchemas/ticket";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Ticket } from "@prisma/client";

type TicketFormData = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  ticket?: Ticket;
}

export const TicketForm = ({
  ticket
}: TicketFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    console.log(values, "values");
    try {
      setIsSubmitting(true);
      setError("");
      if (ticket) {
        await axios.patch(`/api/tickets/${ticket.id}`, values);
      } else {
        await axios.post("/api/tickets", values);
      }
      setIsSubmitting(false);

      router.push("/tickets");
      router.refresh();
    } catch (e) {
      setError("Unknown Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            defaultValue={ticket?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket Name ..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            defaultValue={ticket?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              defaultValue={ticket?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status..." defaultValue={ticket?.status} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="OPEN">Open</SelectItem>
                        <SelectItem value="STARTED">Started</SelectItem>
                        <SelectItem value="CLOSED">Closed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority..." defaultValue={ticket?.priority}/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting || isSubmitting}>
            {ticket? "Update Ticket" : "Create Ticket"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
