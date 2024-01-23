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
      <div className="">
        <Sidebar />
      </div>
      <div className="">
        <Navbar />
        <main className="">{children}</main>
      </div>
    </div>
  )
}
