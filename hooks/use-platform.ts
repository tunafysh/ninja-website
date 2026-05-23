"use client"

import { useEffect, useState } from "react"

import type { InstallPlatform } from "@/lib/install"

function detectPlatformFromNavigator(): InstallPlatform {
  if (typeof window === "undefined") {
    return "unknown"
  }

  type NavigatorWithUAData = Navigator & { userAgentData?: { platform?: string } }
  const { navigator } = window
  const userAgent = navigator.userAgent.toLowerCase()
  const platform = navigator.platform?.toLowerCase() || ""
  const userAgentPlatform =
    (navigator as NavigatorWithUAData).userAgentData?.platform?.toLowerCase() || ""

  if (userAgent.includes("win") || platform.includes("win") || userAgentPlatform.includes("win")) {
    return "windows"
  }

  if (userAgent.includes("mac") || platform.includes("mac") || userAgent.includes("darwin") || userAgentPlatform.includes("mac")) {
    return "macos"
  }

  if (userAgent.includes("linux") || platform.includes("linux") || userAgent.includes("x11") || userAgentPlatform.includes("linux")) {
    return "linux"
  }

  return "unknown"
}

export function usePlatform() {
  const [platform, setPlatform] = useState<InstallPlatform>("unknown")

  useEffect(() => {
    setPlatform(detectPlatformFromNavigator())
  }, [])

  return platform
}