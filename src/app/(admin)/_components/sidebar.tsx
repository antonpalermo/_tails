import Image from "next/image"

import Routes from "@/app/(admin)/_components/routes"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import Channels from "./channels"

export default function Sidebar() {
  const routes = [{ label: "sample", href: "/sample" }]

  return (
    <nav className="w-80 md:w-60 h-full border-r px-2">
      <div className="w-full py-4 px-3 inline-flex items-center mb-3">
        <Image
          src={"/logo.svg"}
          alt="application logo"
          width={35}
          height={40}
        />
      </div>
      <Routes />
      <div className="py-4">
        <Channels routes={routes} />
      </div>
    </nav>
  )
}
