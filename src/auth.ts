import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { LoginSchema } from "./types/validation"
import { safeParseAsync } from "valibot"
import client from "./lib/db"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { User } from "./types/user"
 
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

        const { email } = result.output

        // 1. Connect to your existing MongoDB database
        const db = client.db(); // Uses the default database from your URI string

        // 2. Look for the user inside the adapter's default "users" collection
        const user = await db.collection<User>("users").findOne({ email: email });
        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        // logic to salt and hash password
        const isPasswordCorrect = await bcrypt.compare(credentials.password as string, user.password)
        
        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password");
        }

        // return JSON object with the user data
        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          role: user.role || "user",
          emailVerified: user.emailVerified ?? null,
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
    async signIn({ user, account }) {
    // 1. Always allow Google OAuth sign-ins instantly
    if (account?.provider === "google") {
      return true;
    }

    // 2. For credentials, check if the email has been verified
    // We fetch this via your Mongoose authorize return object
    if (account?.provider === "credentials") {
      if (!(user).emailVerified) {
        throw new Error("EmailNotVerified"); // Custom error string passed to the URL
      }
    }

    return true;
  },
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
