import options from "@/app/api/auth/[...nextauth]/options"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import Image from "next/image"

export default async function Navbar() {
  const session = await getServerSession(options)

  return (
    <nav className="py-4">
      <div className="container mx-auto flex">
        <span className="flex-1"></span>
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
