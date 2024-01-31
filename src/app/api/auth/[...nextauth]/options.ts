import { NextAuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google"

const options: NextAuthOptions = {
  session: {
    maxAge: 1000 * 60 * 60 * 24
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
}

export default options
