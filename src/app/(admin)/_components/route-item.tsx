import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

export default function RouteItem({
  icon: Icon,
  label,
  href
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className="text-slate-500 font-medium hover:bg-blue-50 rounded px-3 py-1 block"
    >
      <div className="flex items-center gap-x-3 py-2">
        <Icon size={22} className="" />
        {label}
      </div>
    </Link>
  )
}
