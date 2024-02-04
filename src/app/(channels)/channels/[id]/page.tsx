import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { cache } from "react"

async function getChannelDetails(id: string) {
  return await prisma.channel.findUnique({
    where: { id },
    include: { members: true }
  })
}

const channelDetails = cache(async (id: string) => await getChannelDetails(id))

export async function generateMetadata({ params }: { params: { id: string } }) {
  const channel = await channelDetails(params.id)

  return {
    title: `Channel - ${channel?.name}`
  }
}

export default async function ChannelPage({
  params
}: {
  params: { id: string }
}) {
  const channel = await channelDetails(params.id)

  if (!channel) {
    return notFound()
  }

  return <div>{JSON.stringify(channel)}</div>
}
