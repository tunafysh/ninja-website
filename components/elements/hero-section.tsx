import { BackgroundRippleEffect } from "../ui/background-ripple-effect";
import { CornerBrackets } from "../ui/corner-brackets";
import Distributor from "./distributor";

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-[75vh] sm:min-h-[82vh] md:min-h-[88vh] lg:min-h-[92vh] xl:min-h-[95vh] overflow-hidden">
      <div className="hidden md:block" aria-hidden="true">
        <BackgroundRippleEffect />
      </div>
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 sm:gap-8 border border-foreground/20 px-6 py-14 sm:px-10 sm:py-20 md:px-16">
        <CornerBrackets variant="diagonal" />
        <div className="z-10 flex flex-col gap-3 sm:gap-4 items-center text-center justify-center">
          <h1 className="select-none font-semibold leading-tight tracking-wide text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="font-stan">Your stack</span>,
          </h1>
          <h1 className="peer select-none font-ulys font-bold bg-foreground rounded-md text-background px-2 py-1 text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl md:hover:tracking-[0.07em] transition-all">
            Streamlined
          </h1>
        </div>
        <p className="relative z-10 text-center text-base sm:text-lg md:text-xl font-semibold max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
          <span className="bg-clip-text bg-linear-to-br from-fuchsia-500 from-40% to-red-500 text-transparent">Fast</span>.
          <span className="ml-1 bg-clip-text bg-linear-to-br from-lime-500 from-60% to-green-900 text-transparent">Efficient</span>.
          Built with <span className="bg-clip-text bg-linear-to-br from-yellow-500 from-40% to-red-500 text-transparent">Rust</span>.
          Scriptable with <span className="bg-clip-text bg-linear-to-br from-indigo-600 from-60% to-violet-900 text-transparent">Lua</span>.
        </p>
        <Distributor />
      </div>
    </div>
  )
}
