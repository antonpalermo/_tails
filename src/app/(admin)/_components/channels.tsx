"use client"

import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import ChannelItem from "@/app/(admin)/_components/channel-item"

type Route = {
  label: string
  href: string
}

interface ChannelsProps {
  routes: Route[]
}

export default function Channels({ routes }: ChannelsProps) {
  const router = useRouter()

  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 pl-3">
          Channels
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/channels/create")}
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
      <div>
        {routes.map(e => (
          <ChannelItem key={e.label} href={e.href} label={e.label} />
        ))}
      </div>
    </div>
  )
}
