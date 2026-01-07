import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

/**
 * Render a vertical list container for grouping item components.
 *
 * @param className - Additional CSS classes to merge with the component's base classes
 * @param props - Other standard div props forwarded to the underlying element
 * @returns A div element with role="list", `data-slot="item-group"`, merged classes, and any forwarded props
 */
function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  )
}

/**
 * Renders a horizontal separator styled for use between items in an item list.
 *
 * @returns A Separator element with `data-slot="item-separator"`, `orientation="horizontal"`, and the provided `className` merged with default spacing.
 */
function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Render a composable item container that applies variant and size styling and can render as a Radix Slot for slot-based composition.
 *
 * @param variant - Visual style variant to apply; supported values: `"default"`, `"outline"`, `"muted"`.
 * @param size - Spacing variant to apply; supported values: `"default"`, `"sm"`.
 * @param asChild - When true, render a Radix `Slot` instead of a `div` to allow consumers to control the actual DOM element.
 * @returns The rendered item element with `data-slot="item"`, `data-variant`, `data-size`, and the computed className applied.
 */
function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Renders a media container for an item with variant-driven styling.
 *
 * @param className - Additional CSS classes to merge with the component's variants
 * @param variant - Visual variant to apply: `"default"` (no special styling), `"icon"` (small bordered icon layout), or `"image"` (rounded image container with overflow handling)
 * @returns A div element serving as the item media slot with data-slot="item-media" and the chosen variant classes applied
 */
function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * Renders the item's main content area that expands to fill available space and stacks children vertically.
 *
 * @returns The rendered item content element.
 */
function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the title region for an item list entry.
 *
 * Renders a div with `data-slot="item-title"`, applies typography and layout classes, merges any provided `className`, and forwards remaining div props.
 *
 * @returns The title element for an item.
 */
function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the item's descriptive paragraph with two-line truncation and link styling.
 *
 * The element clamps text to two lines and applies muted text styling; descendant links are underlined
 * and change color on hover.
 *
 * @returns A `<p>` element styled as the item description (two-line clamp, muted text, underlined links with hover color).
 */
function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a horizontal actions container for an item.
 *
 * @param className - Additional classes to merge with the component's base styles
 * @param props - All other props are forwarded to the underlying `div` element
 * @returns The rendered actions container element
 */
function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/**
 * Renders the header region for an item, providing a horizontal layout that spaces content between.
 *
 * Renders a div with data-slot="item-header" and classes that align items center, justify content between, and apply gap spacing.
 *
 * @param className - Additional class names to apply to the header container
 * @returns A div element to be used as the item's header container
 */
function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the footer region for an item list entry.
 *
 * The element is a div with data-slot="item-footer" and a horizontal layout that spaces content between.
 * Accepts standard div props and a `className` to customize styling.
 *
 * @returns The footer element for an item list entry.
 */
function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}