import { z } from "zod";

export const ticketSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  status: z.string().min(1, "Status is required").max(10).optional(),
  priority: z.string().min(1, "Priority is required").max(10).optional(),
});

export const ticketPatchSchema = z.object({
  name: z.string().min(1, "Name is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  status: z.string().min(1, "Status is required").max(10).optional(),
  priority: z.string().min(1, "Priority is required").max(10).optional(),
});
