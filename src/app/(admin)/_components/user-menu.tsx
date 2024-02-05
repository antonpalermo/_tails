import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

interface UserMenuProps {
  name: string
  image: string
}

export default function UserMenu({ name, image }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mb-4">
        <div className="w-full px-3 py-2 rounded border inline-flex items-center space-x-3">
          <Image
            src={image}
            alt="user avatar"
            className="rounded-md"
            width={25}
            height={25}
          />
          <span className="text-sm font-medium">{name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500">Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
