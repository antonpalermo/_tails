import "@/app/globals.css"

import React from "react"
import { Inter } from "next/font/google"
import { getServerSession } from "next-auth"

import options from "@/app/api/auth/[...nextauth]/options"
import SessionProvider from "@/lib/providers/session"
import { redirect, usePathname } from "next/navigation"
import { headers } from "next/headers"
import { Toaster } from "@/components/ui/toaster"
import { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-sans"
})

export const metadata: Metadata = {
  title: {
    template: "_tails - %s",
    default: "_tails"
  }
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(options)

  const _headers = headers()
  const currentPath = _headers.get("x-current-path")

  if (!session && currentPath) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(currentPath)}`)
  }

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}
