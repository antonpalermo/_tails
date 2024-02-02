import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ChannelItemProps {
  label: string
  href: string
}

export default function ChannelItem({ href, label }: ChannelItemProps) {
  return (
    <Link href={href} passHref className="block">
      <Button variant={"link"}>{label}</Button>
    </Link>
  )
}
