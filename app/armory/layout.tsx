import { Plus } from "lucide-react"
import Image from "next/image"
import logo from "@/public/logo-dark.svg"
import { Button } from "@/components/ui/button"

export default function ArmoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Topbar */}
      <header className="h-16 border-b border-border bg-card/60 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            width={70}
            height={40}
            alt="Ninja Logo"
            className="dark:invert select-none"
          />
          <span className="text-lg font-medium tracking-tight opacity-80">
            Armory
          </span>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-accent/50 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full">{children}</main>
    </div>
  )
}
