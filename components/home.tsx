"use client"

import Features from "./elements/features"
import Footer from "./elements/footer"
import HeroSection from "./elements/hero-section"
/**
 * Renders the developer home page layout containing the navigation bar and hero section.
 *
 * @returns The root JSX element that wraps the Navbar and HeroSection components.
 */
export default function DevHome() {
  return (
    <div className="min-h-screen w-full bg-background">
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-28 pb-8 sm:px-6 lg:px-8">
        <HeroSection />
        <Features />
        <Footer />
      </main>
    </div>
  )
}