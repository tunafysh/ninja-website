"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Themetoggle from "./themetoggle";

export function Nav() {
  const navItems = [
    {
      name: "Documentation",
      link: "/docs/test",
    },
    {
      name: "Source",
      link: "http://github.com/tunafysh/ninja"
    },
    {
      name: "Issues",
      link: "https://github.com/tunafysh/ninja/issues",
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar className="top-0">
        {/* Desktop Navigation */}
        <NavBody>
          <div>
          <NavbarLogo />
          <NavItems items={navItems} />
          </div>
          <div className="flex items-center gap-4">
            <Themetoggle />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="top-0">
          <MobileNavHeader>
            <NavbarLogo />
            <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <Themetoggle />
          </div>
          </MobileNavHeader>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}