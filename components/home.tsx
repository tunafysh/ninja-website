"use client"
import { usePlatform } from "@/hooks/use-platform";
import Navbar from "./elements/navbar";
import HeroSection from "./elements/hero-section";

/**
 * Renders the developer home page layout containing the navigation bar and hero section.
 *
 * @returns The root JSX element that wraps the Navbar and HeroSection components.
 */
export default function DevHome() {
  const platform = usePlatform()

  return (
    <div className="h-full p-4 gap-4 flex flex-col px-8">
      <Navbar />
      <HeroSection />
    </div>
  )
}