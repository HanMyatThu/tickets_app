import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserForm } from "@/components/user-form";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";

interface EditUserProps {
  params: { id: string };
}

const EditUser = async ({ params }: EditUserProps) => {

  const session = await getServerSession(options);
  
  if (session?.user.role !== 'ADMIN') {
    return <p className='text-destructive'>Admin Access is Required</p>
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return <p className="text-destructive"> User Not Found. </p>
  }

  user.password = ""


  return (
    <UserForm 
      user={user}
    />
  );
};

export default EditUser;