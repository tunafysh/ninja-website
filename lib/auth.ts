import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"

const parseEnvList = (value?: string) =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user, profile }) => {
      const adminEmails = parseEnvList(process.env.ADMIN_EMAILS)
      const adminLogins = parseEnvList(process.env.ADMIN_GITHUB_LOGINS)
      const email = user?.email ?? (profile?.email as string | undefined)
      const login =
        typeof profile === "object" && profile && "login" in profile
          ? String(profile.login)
          : undefined

      if (email || login) {
        const normalizedEmail = email?.toLowerCase()
        const normalizedLogin = login?.toLowerCase()
        const isAdmin =
          (normalizedEmail && adminEmails.includes(normalizedEmail)) ||
          (normalizedLogin && adminLogins.includes(normalizedLogin))

        token.role = isAdmin ? "admin" : "user"
      }

      if (!token.role) {
        token.role = "user"
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
