import Image from "next/image"

import prisma from "@/lib/prisma"

import Routes from "@/app/(admin)/_components/routes"
import Channels from "@/app/(admin)/_components/channels"
import UserMenu from "./user-menu"
import { getServerSession } from "next-auth"
import options from "@/app/api/auth/[...nextauth]/options"

export default async function Sidebar() {
  const channel = await prisma.channel.findMany()
  const routes = channel.map(e => ({
    label: e.name,
    href: `/channels/${e.id}`
  }))

  const session = await getServerSession(options)

  if (!session) {
    return
  }

  return (
    <nav className="w-80 md:w-60 h-full border-r px-2">
      <div className="h-full flex flex-col items-stretch">
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
        <span className="flex-1" />
        <UserMenu name={session.user?.name!} image={session.user?.image!} />
      </div>
    </nav>
  )
}
