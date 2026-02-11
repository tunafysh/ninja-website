"use client"

import Features from "./elements/features"
import Footer from "./elements/footer"
import HeroSection from "./elements/hero-section"
import Navbar from "./elements/navbar"

/**
 * Renders the developer home page layout containing the navigation bar and hero section.
 *
 * @returns The root JSX element that wraps the Navbar and HeroSection components.
 */
export default function DevHome() {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pt-28 flex flex-col gap-7">
        <HeroSection />
        <Features />
        <Footer />
      </div>
    </div>
  )
}