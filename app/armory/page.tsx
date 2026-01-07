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
import { Search, Filter } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

const shurikens = [
  {
    name: "Apache",
    description: "A stable web server module with SSL and auto-config support.",
    category: "Server",
  },
  {
    name: "MariaDB",
    description: "Database service Shuriken with smooth migrations and backups.",
    category: "Database",
  },
  {
    name: "GraphQL",
    description: "Provides GraphQL endpoints for your project seamlessly.",
    category: "Integration",
  },
  {
    name: "Redis",
    description: "Lightning-fast caching layer for high performance.",
    category: "Database",
  },
]

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

  const filtered = shurikens.filter((s) => {
    const matchesCategory = filter === "All" || s.category === filter
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background/70" />

      {/* Header Section */}
      <div className="w-full border-b border-border/20 bg-background/60 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto py-8 px-6 flex flex-col gap-6">
          {/* Header Controls */}
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r bg-clip-text text-foreground">
              Explore <span className="text-accent">Shurikens</span>
            </h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-border/30 hover:border-primary/40 hover:bg-primary/10 transition-all backdrop-blur-sm"
                >
                  <Filter className="w-4 h-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-44 border-border/20 bg-background/80 backdrop-blur-md"
              >
                <DropdownMenuItem>Alphabetical</DropdownMenuItem>
                <DropdownMenuItem>Newest</DropdownMenuItem>
                <DropdownMenuItem>Most Popular</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 w-4 h-4" />
            <Input
              placeholder="Search the Armory..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full bg-background/50 border border-border/30 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all backdrop-blur-md"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="All" onValueChange={(val) => setFilter(val)} className="w-full">
            <TabsList className="flex w-fit gap-2 bg-transparent p-0">
              {["All", "Server", "Database", "Integration"].map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="px-4 py-1.5 text-sm rounded-full border border-border/30 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:border-primary/40 transition-all"
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
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="cursor-pointer"
          >
            <Card className="group relative overflow-hidden border border-border/30 hover:border-primary/50 bg-card/60 backdrop-blur-sm rounded-2xl transition-all hover:shadow-[0_0_12px_-2px_var(--primary)] hover:bg-card/80">
              {/* Soft accent gradient hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-primary via-accent to-secondary transition-opacity" />
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium tracking-tight opacity-90 group-hover:opacity-100 transition-opacity">
                    {shuriken.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="text-xs font-medium opacity-80 group-hover:opacity-100 border-primary/40 text-primary"
                  >
                    {shuriken.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  {shuriken.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground/70 py-20">
            No shurikens found.
          </div>
        )}
      </div>
    </div>
  )
}