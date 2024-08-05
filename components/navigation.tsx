import Link from "next/link";

import { NavigationLink } from "./navigation-link";
import { ModeToggle } from "./toggle-theme";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const Navigation = async () => {
  const session = await getServerSession(options);

  return (
    <div className="flex justify-between">
      <NavigationLink role={session?.user.role}/>
      <div className="flex items-center gap-x-3">
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
