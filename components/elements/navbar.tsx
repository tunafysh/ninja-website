"use client"
import { Button } from "../ui/button";
import Themetoggle from "./themetoggle";
import Image from "next/image"
import Icon from "@/public/logo-dark.svg"
import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { getInstallPrimaryFormat, getInstallRecommendation } from "@/lib/install";
import { usePlatform } from "@/hooks/use-platform";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const platform = usePlatform()

    const recommendation = useMemo(() => getInstallRecommendation(platform), [platform])
    const primaryFormat = useMemo(() => getInstallPrimaryFormat(platform), [platform])

    return(
        <div className="fixed left-0 right-0 top-4 z-50 px-4">
            <div className="mx-auto max-w-7xl border border-foreground/8 bg-background/80 select-none backdrop-blur-xl rounded-2xl hover:border-foreground/12 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5">
                <div className="flex w-full items-center justify-between gap-4 px-5 py-3.5">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity">
                        <Image
                            src={Icon}
                            alt="Logo"
                            width={92}
                            height={60}
                            priority
                            className="h-6 w-auto dark:invert"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav aria-label="Primary" className="hidden md:block">
                        <ul className="flex items-center gap-8 text-sm font-medium">
                            {['Docs', 'Quickstart'].map((label) => (
                              <li key={label} className="text-foreground/70 hover:text-foreground transition-colors duration-200 relative group">
                                <Link href={label === 'Docs' ? '/docs' : '/docs/getting-started/quickstart'}>{label}</Link>
                                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-emerald-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
                              </li>
                            ))}
                            <li className="text-foreground/70 hover:text-foreground transition-colors duration-200 relative group">
                                <a href="https://github.com/tunafysh/ninja" target="_blank" rel="noreferrer">GitHub</a>
                                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-emerald-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
                            </li>
                        </ul>
                    </nav>

                    {/* Right section */}
                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-3 md:flex">
                            <Themetoggle />
                            <div className="flex items-stretch overflow-hidden rounded-lg border border-foreground/10 shadow-sm shadow-emerald-500/10">
                                <Button asChild size="sm" className="h-9 rounded-none border border-foreground/10 bg-linear-to-r from-emerald-600 to-emerald-500 px-3.5 text-xs font-semibold hover:from-emerald-500 hover:to-emerald-400">
                                    <Link href={primaryFormat?.href ?? "/download?os=linux"}>
                                        {primaryFormat ? `Download ${primaryFormat.label}` : "Download"}
                                    </Link>
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-9 w-9 rounded-none border border-l-0 border-foreground/10 bg-background/70 hover:bg-foreground/5"
                                            aria-label="Open download formats"
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="min-w-72 rounded-2xl border-foreground/8 bg-background/95 p-2 backdrop-blur-sm shadow-xl">
                                    <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                                        {platform === "unknown" ? "Download files" : `${recommendation.label} downloads`}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                                        Format ledger
                                    </div>
                                    <div className="flex flex-wrap gap-2 px-3 pb-2">
                                        {recommendation.formatLinks.map((formatLink) => (
                                            <Link
                                                key={`${formatLink.label}-${formatLink.href}`}
                                                href={formatLink.href}
                                                className="rounded-full border border-foreground/10 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60 transition-colors hover:border-foreground/20 hover:bg-foreground/5"
                                            >
                                                {formatLink.label}
                                            </Link>
                                        ))}
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild className="rounded-xl px-3 py-2">
                                        <Link href="/install" className="hover:bg-foreground/10 transition-colors duration-200">
                                            Need a different OS? Open install page
                                        </Link>
                                    </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden rounded-lg hover:bg-foreground/10 transition-all duration-200"
                            aria-label="Toggle menu"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5 transition-transform duration-200"
                            >
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </Button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    className={`md:hidden overflow-hidden border-t border-foreground/8 px-5 transition-all duration-300 ease-out ${
                        mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <nav className="py-4">
                        <ul className="flex flex-col gap-3 text-sm font-medium">
                            <li className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                                <Link href="/docs" onClick={() => setMobileOpen(false)}>Docs</Link>
                            </li>
                            <li className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                                <Link href="/docs/getting-started/quickstart" onClick={() => setMobileOpen(false)}>Quickstart</Link>
                            </li>
                            <li className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                                <a href="https://github.com/tunafysh/ninja" target="_blank" rel="noreferrer">GitHub</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="grid gap-2 pb-4 pt-2 sm:grid-cols-3">
                        <Themetoggle />
                        <Button size="sm" className="rounded-lg bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400" asChild>
                            <Link href="/download?os=windows" onClick={() => setMobileOpen(false)}>Windows</Link>
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-lg border-foreground/20 hover:border-foreground/40" asChild>
                            <Link href="/download?os=linux" onClick={() => setMobileOpen(false)}>Linux</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}