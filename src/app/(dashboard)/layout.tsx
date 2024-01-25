import React from "react"

import Navbar from "./_components/navbar"
import Sidebar from "./_components/sidebar"

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen">
      <div className="hidden md:flex flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <div className="h-full pl-80 md:pl-60 flex flex-col">
        <Navbar />
        <main className="container mx-auto py-5 flex-grow">
          <div className="h-full overflow-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
