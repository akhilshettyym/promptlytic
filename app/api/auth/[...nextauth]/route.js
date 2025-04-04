import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import User from "@/models/user";
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser._id.toString()

      return session
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB()

        
        const userExists = await User.findOne({ email: profile.email })

        if (!userExists) {
          
          let username = profile.email.split("@")[0]

          
          if (username.length < 8) {
            const padding = Math.random().toString(36).substring(2, 10)
            username = username + padding
            username = username.substring(0, 8)
          }

          if (username.length > 20) {
            username = username.substring(0, 20)
          }

          username = username.replace(/[^a-zA-Z0-9._]/g, "")

          username = username.replace(/^[_.]|[_.]$/g, "a")

          username = username.replace(/[_.]{2,}/g, "_")

          await User.create({
            email: profile.email,
            username: username,
            image: profile.picture,
          })
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }