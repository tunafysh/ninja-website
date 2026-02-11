import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export default async function AddLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent("/armory/add")}`)
  }

  return <>{children}</>
}
