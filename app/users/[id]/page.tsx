import { UserForm } from "@/components/user-form";
import prisma from "@/prisma/db";

interface EditUserProps {
  params: { id: string };
}

const EditUser = async ({ params }: EditUserProps) => {
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