import prisma from "@/prisma/db";
import { ticketSchema } from "@/validationSchemas/ticket";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized Session" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const ticket = await prisma.ticket.create({
    data: { ...body },
  });

  return NextResponse.json(ticket, { status: 200 });
}
