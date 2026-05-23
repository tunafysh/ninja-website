/**
 * React component that automatically inserts four brackets on each corner. parent must be relative
 */

type Variants = "default" | "diagonal" | "diagonal-2" | boolean[];

export function CornerBrackets(
  { variant = "default" }: { variant?: Variants }
) {
  return (
    <>
      {/* Top-left corner */}
      {(variant === "default" || variant === "diagonal" ||
        (Array.isArray(variant) && variant[0])) && (
        <div className="absolute -top-0.5 -left-0.5 ml-[0.75] w-4 h-4 border-t-4 border-l-3 border-foreground/80" />
      )}
      {/* Top-right corner */}
      {(variant === "default" || variant === "diagonal-2" ||
        (Array.isArray(variant) && variant[1])) && (
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t-3 border-r-3 border-foreground/80" />
      )}
      {/* Bottom-left corner */}
      {(variant === "default" || variant === "diagonal-2" ||
        (Array.isArray(variant) && variant[2])) && (
        <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b-3 border-l-3 border-foreground/80" />
      )}
      {/* Bottom-right corner */}
      {(variant === "default" || variant === "diagonal" ||
        (Array.isArray(variant) && variant[3])) && (
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b-3 border-r-3 border-foreground/80" />
      )}
    </>
  );
}
