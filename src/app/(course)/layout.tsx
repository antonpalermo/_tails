import React from "react"

export default function SpaceLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="bg-red-500 text-white">{children}</div>
}
