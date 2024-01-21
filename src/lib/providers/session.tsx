"use client"

import React from "react"
import {
  SessionProvider as NextAuthSessionProvider,
  SessionProviderProps as NextAuthSessionProviderProps
} from "next-auth/react"

interface SessionProviderProps extends NextAuthSessionProviderProps {}

export default function SessionProvider({ ...props }: SessionProviderProps) {
  return <NextAuthSessionProvider {...props} />
}

