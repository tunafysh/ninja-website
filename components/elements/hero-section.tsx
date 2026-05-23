import { Button } from "../ui/button";
import Link from "next/link";
import Distributor from "./distributor";

export default function HeroSection() {
  return (
    <section id="overview" className="relative w-full overflow-hidden rounded-3xl border border-foreground/8 bg-background/80 px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24 shadow-sm">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-500/8 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-blue-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: "0s" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Service management evolved
        </div>

        <h1 className="mt-8 text-balance text-4xl font-bold leading-none tracking-tight text-foreground sm:text-5xl md:text-6xl xl:text-7xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Manage services with one clean system.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-foreground/70 sm:text-lg sm:leading-9 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Ninja packages services as shurikens: installable units with their own metadata, scripts, config, and lifecycle. One product, one path, one place to get started.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Button asChild size="lg" className="rounded-xl px-6 font-semibold bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-500/15 transition-all duration-300">
            <Link href="/docs/getting-started/quickstart">Get started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl px-6 font-semibold border-foreground/15 bg-background/70 hover:bg-foreground/5 transition-all duration-300">
            <Link href="/download">Install options</Link>
          </Button>
        </div>

        <div className="mt-10 w-full border-y border-accentflex flex-wrap items-center justify-center gap-2 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Distributor />
        </div>
      </div>
    </section>
  )
}
