"use client"
import { Button } from "../ui/button";
import Themetoggle from "./themetoggle";
import Image from "next/image"
import Icon from "@/public/logo-dark.svg"
import darkIcon from "@/public/logo.svg"
import { useTheme } from "next-themes";
import { CornerBrackets } from "../ui/corner-brackets";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null // wait until client mounts
    const icon = resolvedTheme === "dark" ? darkIcon : Icon
    return(
        <div className="fixed left-0 right-0 top-4 z-50 px-4">
            <div className="corner-box mx-auto max-w-7xl border border-foreground/20 select-none backdrop-blur-2xl background-transparent">
                <div className="relative">
                    <CornerBrackets />
                    <div className="flex w-full items-center justify-between gap-6 px-5 py-4">
                        <Link href="/" className="flex items-center">
                            <Image src={icon} alt="Logo" width={100} height={70} priority />
                        </Link>
                        <nav aria-label="Primary" className="hidden md:block">
                            <ul className="flex gap-4">
                                <li className="opacity-70 font-semibold transition-opacity duration-200 hover:opacity-100">
                                    <Link href="/armory">Armory</Link>
                                </li>
                                <li className="opacity-70 font-semibold transition-opacity duration-200 hover:opacity-100">
                                    <Link href="/docs">Docs</Link>
                                </li>
                                <li className="opacity-70 font-semibold transition-opacity duration-200 hover:opacity-100">
                                    <a href="https://github.com/tunafysh/ninja" target="_blank" rel="noreferrer">Source</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-3">
                                <Themetoggle />
                                <Button asChild>
                                    <Link href="/install">Download</Link>
                                </Button>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                aria-label="Toggle menu"
                                aria-expanded={mobileOpen}
                                onClick={() => setMobileOpen((open) => !open)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    <div
                        className={`md:hidden overflow-hidden border-t border-foreground/50 px-5 transition-all duration-300 ease-out ${
                            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                        aria-hidden={!mobileOpen}
                    >
                        <nav aria-label="Mobile">
                            <ul className="flex flex-col gap-3 pt-4">
                                <li className="opacity-80 font-semibold transition-opacity duration-200 hover:opacity-100">
                                    <Link href="/armory" onClick={() => setMobileOpen(false)}>Armory</Link>
                                </li>
                                <li className="opacity-80 font-semibold transition-opacity duration-200 hover:opacity-100">
                                    <Link href="/docs" onClick={() => setMobileOpen(false)}>Docs</Link>
                                </li>
                                <li className="opacity-80 font-semibold transition-opacity duration-200 hover:opacity-100">
                                    <a href="https://github.com/tunafysh/ninja" target="_blank" rel="noreferrer">Source</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="mt-4 flex items-center gap-3 pb-5 pr-10">
                            <Themetoggle />
                            <Button className="w-full" asChild>
                                <Link href="/install" onClick={() => setMobileOpen(false)}>Download</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}