import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import User from "@models/user"
import { connectToDB } from "@utils/database"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // You can add this if you're using a custom callback URL
      // callbackUrl: 'http://localhost:3000/api/auth/callback/google'
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser._id.toString()

      return session
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB()

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email })

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          // Generate a valid username that meets the requirements
          // Take the first part of the email (before @) and ensure it's 8-20 chars
          let username = profile.email.split("@")[0]

          // If username is too short, add random numbers to make it 8 chars
          if (username.length < 8) {
            const padding = Math.random().toString(36).substring(2, 10)
            username = username + padding
            username = username.substring(0, 8) // Ensure it's not too long after padding
          }

          // If username is too long, truncate it to 20 chars
          if (username.length > 20) {
            username = username.substring(0, 20)
          }

          // Ensure it only contains valid characters (alphanumeric, underscore, period)
          username = username.replace(/[^a-zA-Z0-9._]/g, "")

          // Ensure it doesn't start or end with period or underscore
          username = username.replace(/^[_.]|[_.]$/g, "a")

          // Ensure no consecutive periods or underscores
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