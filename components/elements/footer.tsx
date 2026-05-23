export default function Footer() {
  return (
    <footer className="relative w-full border border-foreground/8 bg-background px-6 py-8 sm:px-8 sm:py-10 rounded-2xl hover:border-foreground/12 transition-all duration-300 group">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 via-transparent to-blue-500/5 rounded-2xl" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" aria-hidden="true" />
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex flex-col gap-2">
          <span className="leading-7 font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
            Copyright © 2026 Ninja.
          </span>
          <span className="leading-7 group-hover:text-foreground/70 transition-colors duration-300">
            All rights reserved. Licensed under AGPLv3.
          </span>
        </div>
        <div className="flex flex-col gap-2 text-foreground/60 md:text-right">
          <span className="leading-7 group-hover:text-foreground/70 transition-colors duration-300">
            Docs, source, and releases live on GitHub.
          </span>
          <span className="leading-7 group-hover:text-foreground/70 transition-colors duration-300">
            Built for operators, builders, and automation.
          </span>
        </div>
      </div>
    </footer>
  );
}
