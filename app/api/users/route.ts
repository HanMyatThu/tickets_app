import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { UserSchema } from "@/validationSchemas/user";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  // const session = await getServerSession(options);

  // if (!session) {
  //   return NextResponse.json(
  //     { error: "Unauthorized Session" },
  //     { status: 401 }
  //   );
  // }

  // if (session.user.role !== "ADMIN") {
  //   return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  // }

  const body = await request.json();

  const validation = await UserSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const isDupliate = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (isDupliate) {
    return NextResponse.json(
      { message: "Username is already existed" },
      { status: 400 }
    );
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  body.password = hashPassword;

  const newUser = await prisma.user.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
