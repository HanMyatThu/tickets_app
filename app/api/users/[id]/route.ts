import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { UserSchema } from "@/validationSchemas/user";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = UserSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User Not Found" }, { status: 404 });
  }

  if (body?.password && body?.password !== "") {
    const hashPassword = await bcrypt.hash(body?.password, 10);
    body.password = hashPassword;
  } else {
    delete body.password;
  }

  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: { username: body.username },
    });

    if (duplicateUsername) {
      return NextResponse.json(
        { message: "Username is already existed" },
        { status: 409 }
      );
    }
  }

  const upateUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(upateUser, { status: 200 });
}
