"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { usePlatform } from "@/hooks/use-platform"
import { getInstallCatalog, getInstallRecommendation, parseInstallPlatform } from "@/lib/install"

const packageLabel = {
  windows: "Windows",
  linux: "Linux",
  macos: "macOS",
  unknown: "your platform",
} as const

export default function InstallPageView() {
  const searchParams = useSearchParams()
  const detectedPlatform = usePlatform()
  const requestedPlatform = parseInstallPlatform(searchParams.get("os"))

  const platform = requestedPlatform ?? detectedPlatform
  const recommendation = useMemo(() => getInstallRecommendation(platform), [platform])
  const catalog = useMemo(() => getInstallCatalog(), [])
  const orderedCatalog = useMemo(() => {
    if (platform === "unknown") {
      return catalog
    }

    return [
      ...catalog.filter((entry) => entry.platform === platform),
      ...catalog.filter((entry) => entry.platform !== platform),
    ]
  }, [catalog, platform])
  const platformLabel = packageLabel[recommendation.platform]

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 pb-10 pt-28 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-foreground/8 bg-background/80 px-6 py-10 shadow-sm sm:px-10 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.03),transparent_35%),linear-gradient(135deg,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.02),transparent_50%)]" aria-hidden="true" />

        <div className="relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/50">Install</p>
          <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Install Ninja on {platformLabel}.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-foreground/70 sm:text-lg sm:leading-9">
            This page detects your platform and puts the recommended downloads first. If you prefer a direct command, the fallback install string is right below the files.
          </p>
        </div>
      </section>

      <section id="files" className="rounded-3xl border border-foreground/8 bg-background/80 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-3 border-b border-foreground/8 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/45">Platform catalog</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Every platform, grouped with format links.</h2>
          <p className="text-sm leading-7 text-foreground/70">
            Choose the platform you need, then jump directly to the format you want. Your detected platform appears first.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {orderedCatalog.map((entry) => {
            const isRecommended = entry.platform === recommendation.platform && platform !== "unknown"

            return (
              <article
                key={entry.platform}
                className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isRecommended
                    ? "border-emerald-500/25 bg-emerald-500/5"
                    : "border-foreground/8 bg-background/70 hover:border-foreground/15 hover:shadow-blue-500/5"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">{entry.label}</p>
                    <p className="mt-2 text-sm leading-7 text-foreground/70">{entry.summary}</p>
                  </div>
                  {isRecommended ? (
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
                      Recommended
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 space-y-4">
                  {entry.packages.map((group) => (
                    <div key={`${entry.platform}-${group.label}`} className="rounded-xl border border-foreground/8 bg-background/70 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/45">{group.label}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.formats.map((format) => (
                          <Button
                            asChild
                            key={`${entry.platform}-${group.label}-${format.label}`}
                            variant="outline"
                            size="sm"
                            className="rounded-full border-foreground/10 bg-background/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/60 transition-colors hover:border-foreground/20 hover:bg-foreground/5"
                          >
                            <Link href={format.href}>{format.label}</Link>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-foreground/8 bg-background/80 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 border-b border-foreground/8 pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/45">Recommended files</p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Files first, commands second.</h2>
            <p className="text-sm leading-7 text-foreground/70">
              These are the downloads that best fit {platformLabel}. Each format has its own direct download link, and the command-line section below uses the public download URL.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {recommendation.packages.map((group) => (
              <article key={group.label} className="rounded-2xl border border-foreground/8 bg-background/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-lg hover:shadow-blue-500/5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">{group.label}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.formats.map((format) => (
                    <Button
                      asChild
                      key={`${group.label}-${format.label}`}
                      variant="outline"
                      size="sm"
                      className="rounded-full border-foreground/10 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55 transition-colors hover:border-foreground/20 hover:bg-foreground/5"
                    >
                      <Link href={format.href}>{format.label}</Link>
                    </Button>
                  ))}
                </div>
                <Button asChild variant="secondary" size="sm" className="mt-5 w-full rounded-xl">
                  <Link href={group.formats[0]?.href ?? "/install#files"}>Open download</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-foreground/8 bg-background/80 p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/45">Detected platform</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{recommendation.label}</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/70">{recommendation.summary}</p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-foreground/8 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">Public download</p>
              <p className="mt-2 font-mono text-sm text-foreground/70">/download?os={recommendation.platform}</p>
            </div>

            {recommendation.commands.map((command) => (
              <div key={command.label} className="rounded-2xl border border-foreground/8 bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">{command.label}</p>
                <code className="mt-3 block rounded-xl border border-foreground/10 bg-background/80 p-4 font-mono text-xs leading-6 text-foreground/80 whitespace-pre-wrap wrap-break-word">
                  {command.command}
                </code>
                <Button asChild variant="secondary" size="sm" className="mt-4 w-full rounded-xl">
                  <Link href={`/download?os=${recommendation.platform}`}>Open download</Link>
                </Button>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  )
}