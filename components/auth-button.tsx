"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Button variant="ghost" size="sm" disabled>
        Checking session...
      </Button>
    )
  }

  if (session?.user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </Button>
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={() => signIn("github")}
    >
      Sign in
    </Button>
  )
}
