import Themetoggle from "@/components/themetoggle"
import Image from "next/image"

export default function Navbar() {
    return (
        <div className="w-[calc(100% - 8px)] h-16 flex flex-row items-center mx-4 border-b-1 border-accent-foreground/50 justify-between px-2">
            {/* <Image src="/logo.svg" alt="Ninja" width="32" height="32" /> */}
            <h1>Ninja</h1>
            <Themetoggle />
        </div>
    )
}