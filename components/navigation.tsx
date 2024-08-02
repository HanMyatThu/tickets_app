import Link from "next/link"

import { NavigationLink } from "./navigation-link"
import { ModeToggle } from "./toggle-theme"

export const Navigation = () => {
  return (
    <div className="flex justify-between">
      <NavigationLink />
      <div className="flex items-center gap-x-3">
        <Link href="/">Logout</Link>
        <ModeToggle />
      </div>
    </div>
  )
}