import Image from "next/image"

import Routes from "@/app/(admin)/_components/routes"

export default function Sidebar() {
  return (
    <nav className="w-80 md:w-60 h-full border-r px-2">
      <div className="w-full py-4 px-3 inline-flex items-center space-x-3">
        <Image
          src={"/logo.svg"}
          alt="application logo"
          width={40}
          height={40}
        />
      </div>
      <Routes />
    </nav>
  )
}
