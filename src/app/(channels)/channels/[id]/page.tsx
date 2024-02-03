import prisma from "@/lib/prisma"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const channel = await prisma.channel.findUnique({ where: { id: params.id } })
  return {
    title: `Channel - ${channel?.name}`
  }
}

export default async function ChannelPage({
  params
}: {
  params: { id: string }
}) {
  const channel = await prisma.channel.findUnique({ where: { id: params.id } })

  return <div>{JSON.stringify(channel)}</div>
}
