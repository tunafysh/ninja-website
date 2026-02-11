import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user?.email) {
        const admins = (process.env.ADMIN_EMAILS ?? "")
          .split(",")
          .map((email) => email.trim().toLowerCase())
          .filter(Boolean)
        token.role = admins.includes(user.email.toLowerCase()) ? "admin" : "user"
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.role = (token.role as "user" | "admin" | undefined) ?? "user"
      }
      return session
    },
  },
}
