import React from "react"

export default function ChannelRootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <main className="h-screen flex">{children}</main>
}
