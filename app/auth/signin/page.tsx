"use client"

import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { SignInButton } from "@/components/ui/sign-in-button"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      
      <div className="w-full max-w-md border border-border/40 rounded-2xl p-8 bg-card/70 backdrop-blur-sm shadow-xl">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Authenticate to access protected areas like the Armory submission page.
        </p>

        <div className="mt-6">
          <Suspense fallback={<div className="w-full max-w-md border border-border/40 rounded-2xl p-8 bg-card/70 backdrop-blur-sm shadow-xl animate-pulse" />}>
            <SignInButton />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
