import { Compass, Layout } from "lucide-react"
import RouteItem from "./route-item"

const routes = [
  { icon: Layout, label: "Dashboard", href: "/" },
  { icon: Compass, label: "Browse", href: "/courses" }
]

export default function Routes() {
  return (
    <div>
      {routes.map(route => (
        <RouteItem icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  )
}
