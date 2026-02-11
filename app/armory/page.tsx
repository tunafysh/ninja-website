"use client"

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Search, Filter, Sparkles, Tag, Layers } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useMemo, useState } from "react"

type ArmoryItem = {
  id: string
  created_at: string | null
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
}

/**
 * Render the Armory page: a searchable, filterable catalog of shurikens.
 *
 * Maintains local category and text query state and displays a responsive grid
 * of shuriken cards filtered by the selected category and query. Includes a
 * search input, category tabs, a sort dropdown (UI only, not wired to data),
 * animated entry for each card, and an empty-state message when no items match.
 *
 * @returns A JSX element containing the Armory UI.
 */
export default function Armory() {
  const [filter, setFilter] = useState("All")
  const [query, setQuery] = useState("")
  const [items, setItems] = useState<ArmoryItem[]>([])
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")

  useEffect(() => {
    let isMounted = true

    const loadArmory = async () => {
      try {
        setStatus("loading")
        const response = await fetch("/api/armory", { cache: "no-store" })
        if (!response.ok) {
          throw new Error("Failed to load armory")
        }

        const data = (await response.json()) as ArmoryItem[]
        if (isMounted) {
          setItems(Array.isArray(data) ? data : [])
          setStatus("idle")
        }
      } catch {
        if (isMounted) {
          setStatus("error")
        }
      }
    }

    void loadArmory()

    return () => {
      isMounted = false
    }
  }, [])

  const filtered = items.filter((item) => {
    const category = item.label || "Uncategorized"
    const description = item.description || item.synopsis || ""
    const matchesCategory = filter === "All" || category === filter
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      description.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  const categories = useMemo(() => {
    const labels = Array.from(
      new Set(items.map((item) => item.label).filter((label) => label && label.trim().length > 0))
    )
    return ["All", ...labels]
  }, [items])

  const stats = useMemo(() => {
    const total = items.length
    const labels = categories.length - 1
    const filteredCount = filtered.length
    return { total, labels, filteredCount }
  }, [items.length, categories.length, filtered.length])

  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background/95 to-background/80" />

      <div className="w-full border-b border-border/30 bg-background/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto py-10 px-6 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              Ninja Armory
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Precision-built <span className="text-primary">shurikens</span> for your stack
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Browse curated modules, surface the best-fit tools, and ship faster with pre-vetted integrations.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] items-center">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70 w-4 h-4" />
              <Input
                placeholder="Search by name, label, or description..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-full bg-background/70 border border-border/40 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/60 text-xs text-muted-foreground">
                <Layers className="w-3.5 h-3.5" />
                {stats.filteredCount} / {stats.total} visible
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/60 text-xs text-muted-foreground">
                <Tag className="w-3.5 h-3.5" />
                {stats.labels} labels
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-border/40 hover:border-primary/40 hover:bg-primary/10 transition-all"
                  >
                    <Filter className="w-4 h-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-44 border-border/30 bg-background/90 backdrop-blur-md"
                >
                  <DropdownMenuItem>Alphabetical</DropdownMenuItem>
                  <DropdownMenuItem>Newest</DropdownMenuItem>
                  <DropdownMenuItem>Most Popular</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {(query.length > 0 || filter !== "All") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery("")
                    setFilter("All")
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="All" onValueChange={(val) => setFilter(val)} className="w-full">
            <TabsList className="flex w-full flex-wrap gap-2 bg-transparent p-0">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="px-4 py-1.5 text-sm rounded-full border border-border/40 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:border-primary/50 transition-all"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-6xl w-full mx-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((shuriken, i) => (
          <motion.div
            key={shuriken.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="cursor-pointer"
          >
            <Card className="group relative overflow-hidden border border-border/40 hover:border-primary/60 bg-card/70 backdrop-blur-sm rounded-2xl transition-all hover:shadow-xl">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-15 bg-linear-to-br from-primary/30 via-accent/30 to-secondary/30 transition-opacity" />
              <CardHeader className="gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold tracking-tight">
                      {shuriken.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {shuriken.authors} · {shuriken.license}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant="outline"
                      className="text-xs font-medium border-primary/40 text-primary"
                    >
                      {shuriken.label || "Uncategorized"}
                    </Badge>
                    <Badge variant="secondary" className="text-[11px]">
                      v{shuriken.version}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {shuriken.description || shuriken.synopsis}
                </p>
                <div className="flex flex-wrap gap-2">
                  {shuriken.platforms
                    .split(",")
                    .map((platform) => platform.trim())
                    .filter(Boolean)
                    .slice(0, 3)
                    .map((platform) => (
                    <span
                      key={`${shuriken.id}-${platform}`}
                      className="rounded-full border border-border/40 bg-background/70 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {platform.trim()}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground/70 break-all">
                  {shuriken.repository}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {status === "loading" && (
          <div className="col-span-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-44 rounded-2xl border border-border/40 bg-card/50 animate-pulse"
              />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="col-span-full text-center text-muted-foreground/70 py-20">
            Unable to load the armory right now.
          </div>
        )}

        {status === "idle" && filtered.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground/70 py-20">
            No shurikens found.
          </div>
        )}
      </div>
    </div>
  )
}