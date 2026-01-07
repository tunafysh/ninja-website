import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a reusable card container with base card styling and a `data-slot="card"` attribute.
 *
 * The component forwards all received div props to the underlying root div.
 *
 * @param className - Additional CSS class names appended to the card's base styles
 * @returns The card's root div element
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card's header region with slot and layout styling.
 *
 * Forwards all provided div props to the underlying element and merges `className` into the header's classes.
 *
 * @returns The header `<div>` element with `data-slot="card-header"` and composed class names for layout and spacing.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the title container for a Card, applying title-specific typographic styles.
 *
 * Renders a div with data-slot="card-title", applies leading and font-semibold classes, and forwards all received div props.
 *
 * @returns A JSX element representing the card title container
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders the card's description area styled as muted, small text.
 *
 * @returns A div element with `data-slot="card-description"` that applies muted foreground and small text sizing; any props provided are forwarded to the underlying div.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Renders the card's action slot, positioned to align its children to the end of the card layout.
 *
 * Forwards all received div props (including `className`) to the underlying element.
 *
 * @returns A div element with `data-slot="card-action"` that places its content at the end/top-right of the card layout.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the main content region of a Card with horizontal padding.
 *
 * Applies base horizontal padding and merges any provided `className`; forwards remaining props to the root `div`.
 *
 * @param className - Additional class names to apply to the content container
 * @param props - Other props forwarded to the underlying `div` element
 * @returns The `div` element serving as the card's content container
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Renders the footer region of a Card.
 *
 * @returns A `div` element with `data-slot="card-footer"`, applied footer layout and spacing classes, and any additional `div` props forwarded to the element.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}