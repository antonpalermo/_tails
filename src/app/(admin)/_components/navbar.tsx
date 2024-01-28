import Image from "next/image"
import { getServerSession } from "next-auth"

import { Search } from "./search-input"
import { Button } from "@/components/ui/button"

import options from "@/app/api/auth/[...nextauth]/options"

export default async function Navbar() {
  const session = await getServerSession(options)

  return (
    <nav className="py-4 sticky top-0 bg-white">
      <div className="container mx-auto flex">
        <Search className="flex-1" placeholder="Search Courses" />
        <span className="flex-1" />
        <div className="inline-flex items-center space-x-2">
          <Button variant="outline">Instructor Dashboard</Button>
          {session && (
            <Image
              width={40}
              height={40}
              className="rounded-full"
              src={session.user?.image!}
              alt="user avatar"
            />
          )}
        </div>
      </div>
    </nav>
  )
}
