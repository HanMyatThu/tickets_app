"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export const NavigationLink = () => {
  const Links = [
    { label: "Dashboard", href: "/" },
    { label: "Tickets", href: "/tickets" },
    { label: "Users", href: "/users" }
  ];

  const currentPath = usePathname()
  console.log(currentPath,'currentPath')


  return (
    <div className="flex items-center gap-2">
      {
        Links.map(link => (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "navbar-link",
              currentPath === link.href && "cursor-default text-primary/70 hover:text-primary/60"
            )}
          >
            {link.label}
          </Link>
        ))
      }
    </div>
  )
}