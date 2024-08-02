import { Priority } from "@prisma/client"
import { FlameIcon } from "lucide-react"

interface PriorityProps {
  priority: Priority
}

const priorityMap: Record<Priority, { label: string, level: 1 | 2 | 3}> = {
  HIGH: { label: "High", level: 3 },
  LOW: { label: "Low", level: 1 },
  MEDIUM: { label: "Medium", level: 2 },
}

export const PriorityBadge = ({ priority }: PriorityProps) => {
  return (
    <>
      <FlameIcon className={`${priorityMap[priority].level >= 1 ? "text-red-500": "text-muted"}`} />
      <FlameIcon className={`${priorityMap[priority].level >= 2 ? "text-red-500": "text-muted"}`} />
      <FlameIcon className={`${priorityMap[priority].level >= 3 ? "text-red-500": "text-muted"}`} />
    </>
  )
}