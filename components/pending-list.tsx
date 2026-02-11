"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type PendingItem = {
  id: string
  submitted_at: string | null
  name: string
  label: string
  synopsis: string
  description: string
  version: string
  authors: string
  license: string
  repository: string
  platforms: string
  checksum: string
  submitted_by: string | null
}

export default function PendingList() {
  const [items, setItems] = useState<PendingItem[]>([])
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [actionId, setActionId] = useState<string | null>(null)

  const loadItems = async () => {
    setStatus("loading")
    try {
      const response = await fetch("/api/pending", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to load pending shurikens")
      }
      const data = (await response.json()) as PendingItem[]
      setItems(Array.isArray(data) ? data : [])
      setStatus("idle")
    } catch {
      setStatus("error")
    }
  }

  useEffect(() => {
    void loadItems()
  }, [])

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setActionId(id)
    const method = action === "approve" ? "PUT" : "DELETE"

    try {
      const response = await fetch(`/api/pending?id=${id}`, { method })
      if (!response.ok) {
        throw new Error("Failed to update pending shuriken")
      }
      await loadItems()
    } catch {
      setStatus("error")
    } finally {
      setActionId(null)
    }
  }

  if (status === "loading") {
    return <div className="text-sm text-muted-foreground">Loading...</div>
  }

  if (status === "error") {
    return (
      <div className="text-sm text-muted-foreground">
        Unable to load pending shurikens.
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No pending submissions.
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <Card key={item.id} className="border-border/40 bg-card/70">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Submitted by {item.submitted_by ?? "Unknown"}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {item.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{item.synopsis}</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Version: {item.version}</div>
              <div>Authors: {item.authors}</div>
              <div>License: {item.license}</div>
              <div>Repository: {item.repository}</div>
              <div>Platforms: {item.platforms}</div>
              <div>Checksum: {item.checksum}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => handleAction(item.id, "approve")}
                disabled={actionId === item.id}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction(item.id, "reject")}
                disabled={actionId === item.id}
              >
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
