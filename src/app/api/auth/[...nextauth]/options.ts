import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"

import prisma from "@/lib/prisma"
import GoogleProvider from "next-auth/providers/google"

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    maxAge: 1000 * 60 * 60 * 24,
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
}

export default options
