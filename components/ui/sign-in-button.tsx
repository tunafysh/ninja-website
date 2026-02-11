"use client"

import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function SignInButton() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/"

  return (
    <Button
      className="w-full"
      onClick={() => signIn("github", { callbackUrl })}
    >
      Continue with GitHub
    </Button>
  )
}
