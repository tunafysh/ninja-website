"use client"
import { usePlatform } from "@/hooks/use-platform";
import TerminalComponent from "@/components/elements/terminal";
import Navbar from "@/components/elements/navbar";
import HeroSection from "@/components/elements/hero-section";

export default function Home() {
  const platform = usePlatform()
  return (
  <div className="h-full p-4 gap-4 flex flex-col px-8">
    <Navbar />
    <HeroSection />
  </div>
  );
}
