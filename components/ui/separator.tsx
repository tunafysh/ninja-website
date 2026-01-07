"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Render a stylized horizontal or vertical separator using Radix UI's Separator.Root.
 *
 * @param className - Additional CSS classes to apply to the separator root.
 * @param orientation - Separator orientation, either `"horizontal"` or `"vertical"`. Defaults to `"horizontal"`.
 * @param decorative - Whether the separator is decorative (affects accessibility). Defaults to `true`.
 * @returns A JSX element representing the separator.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }