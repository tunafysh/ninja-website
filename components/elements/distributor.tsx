import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown, Check, Copy } from "lucide-react"

import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
    detectInstallPlatform,
    getInstallRecommendation,
    getInstallPrimaryFormat,
    type InstallPlatform,
} from "@/lib/install"

const commandByPlatform: Record<Exclude<InstallPlatform, "unknown">, string> = {
    windows: 'powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr https://ninja.sh/download?os=windows -UseBasicParsing | iex"',
    linux: "curl -fsSL https://ninja.sh/download?os=linux | sh",
    macos: "curl -fsSL https://ninja.sh/download?os=macos | sh",
}

export default function Distributor() {
    const [platform, setPlatform] = useState<InstallPlatform>("unknown")
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setPlatform(detectInstallPlatform(window.navigator.userAgent))
    }, [])

    const recommendation = getInstallRecommendation(platform)
    const primaryFormat = getInstallPrimaryFormat(platform)
    const currentPackages = platform === "unknown" ? [] : recommendation.packages
    const platformFormats = platform === "unknown" ? [] : recommendation.packages[0]?.formats ?? []
    const command = platform === "unknown"
        ? "curl -fsSL https://ninja.sh/download | sh"
        : commandByPlatform[platform]
    const copyLabel = copied ? "Copied" : "Copy"
    const downloadLabel = primaryFormat ? `Download ${primaryFormat.label}` : "Download"

    async function copyCommand() {
        await navigator.clipboard.writeText(command)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1500)
    }

    return (
        <div className="rounded-3xl border border-foreground/8 bg-background/80 p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <Button
                    type="button"
                    onClick={copyCommand}
                    variant="outline"
                    className="group flex min-h-14 flex-1 items-center gap-3 rounded-2xl border-foreground/8 bg-background/70 px-4 py-3 text-left justify-start transition-all duration-300 hover:border-foreground/15 hover:bg-background"
                >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 bg-background/80 text-foreground/60">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/45">
                            {platform === "unknown" ? "Install command" : `${recommendation.label} install command`}
                        </span>
                        <span className="mt-1 block truncate font-mono text-sm text-foreground/75 sm:text-[0.9rem]">
                            {command}
                        </span>
                    </span>
                    <span className="rounded-full border border-foreground/10 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                        {copyLabel}
                    </span>
                </Button>

                <div className="flex min-h-11 items-stretch overflow-hidden rounded-xl border border-foreground/10 bg-background/70 shadow-sm shadow-emerald-500/10">
                    <Button asChild size="sm" className="h-11 rounded-none border border-foreground/10 bg-linear-to-r from-emerald-600 to-emerald-500 px-4 text-xs font-semibold hover:from-emerald-500 hover:to-emerald-400">
                        <Link href={primaryFormat?.href ?? "/download?os=linux"}>
                            {downloadLabel}
                        </Link>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="icon"
                                variant="secondary"
                                className="h-11 w-11 rounded-none border border-l-0 border-foreground/10 bg-background/70 hover:bg-foreground/5"
                                aria-label="Open download formats"
                            >
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-80 rounded-2xl border-foreground/8 bg-background/95 p-2 backdrop-blur-sm shadow-xl">
                            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                                {platform === "unknown" ? "Detecting platform" : `${recommendation.label} formats`}
                            </div>
                            <div className="space-y-2 px-1 pb-1">
                                {currentPackages.map((group) => (
                                    <div key={group.label} className="rounded-xl border border-foreground/8 bg-background/70 p-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
                                                    {group.label}
                                                </p>
                                                <p className="mt-1 text-[11px] text-foreground/45">
                                                    Format links for the active platform
                                                </p>
                                            </div>
                                            <span className="rounded-full border border-foreground/10 bg-background/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                                                Current
                                            </span>
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {group.formats.map((formatLink) => (
                                                <Button
                                                    asChild
                                                    key={`${group.label}-${formatLink.label}-${formatLink.href}`}
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 rounded-full border-foreground/10 bg-background/80 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60"
                                                >
                                                    <Link href={formatLink.href}>{formatLink.label}</Link>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                    {platform === "unknown" ? "Formats" : `${recommendation.label} formats`}
                </span>
                {platformFormats.map((format) => (
                    <Button
                        asChild
                        key={`${format.label}-${format.href}`}
                        variant="outline"
                        size="sm"
                        className="rounded-full border-foreground/10 bg-background/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60 transition-colors hover:border-foreground/20 hover:bg-foreground/5"
                    >
                        <Link
                            href={format.href}
                        >
                            {format.label}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    )
}