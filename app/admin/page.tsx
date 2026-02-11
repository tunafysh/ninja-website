import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import PendingList from "@/components/pending-list"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role ?? "user"

  if (role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
        <div className="max-w-lg text-center space-y-3">
          <h1 className="text-2xl font-semibold">Access denied</h1>
          <p className="text-sm text-muted-foreground">
            You need admin access to review pending shurikens.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Pending Shurikens</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and approve submissions before they go live.
          </p>
        </div>
        <PendingList />
      </div>
    </div>
  )
}