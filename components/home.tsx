"use client"
import { usePlatform } from "@/hooks/use-platform";
import Navbar from "./elements/navbar";
import HeroSection from "./elements/hero-section";

export default function DevHome() {
  const platform = usePlatform()

  return (
    <div className="h-full p-4 gap-4 flex flex-col px-8">
      <Navbar />
      <HeroSection />
    </div>
  )
}
