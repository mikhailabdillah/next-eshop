import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { LoginSchema } from "./types/validation"
import { safeParseAsync } from "valibot"
import client from "./lib/db"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  }), Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const result = await safeParseAsync(LoginSchema, credentials)

        if (!result.success) {
          throw new Error("Invalid credentials.")
        }

        const { email, password } = result.output

        // 1. Connect to your existing MongoDB database
        const db = client.db(); // Uses the default database from your URI string

        // 2. Look for the user inside the adapter's default "users" collection
        const user = await db.collection("users").findOne({ email: email });
        if (!user || !user.password) {
          throw new Error("No user found with this email");
        }

        // logic to salt and hash password
        const isPasswordCorrect = await bcrypt.compare(credentials.password as string, password)
        
        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        // return JSON object with the user data
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role || "user",
        }
      },
    }),],
    // 1. Force Next-Auth to use JWT session tokens instead of database sessions
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  // 2. Configure Callbacks to pass data to the client-side session
  callbacks: {
    // This runs whenever a JWT token is created or updated
    async jwt({ token, user }) {
      // "user" is only available right after a successful sign-in
      if (user) {
        token.id = user.id;
        token.role = (user).role || "user"; // Attach custom role if it exists
      }
      return token;
    },

    // This runs whenever the session is checked on the frontend (useSession / auth())
    async session({ session, token }) {
      // Transfer data from the encrypted JWT into the client-facing session object
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
})
