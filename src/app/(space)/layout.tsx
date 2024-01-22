import React from "react"

export default function SpaceLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="bg-blue-500 text-white">{children}</div>
}
