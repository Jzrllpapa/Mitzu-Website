import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide w-fit whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-forest-700 text-cream-50 dark:bg-cream-100 dark:text-forest-900",
        secondary: "border-transparent bg-(--secondary) text-(--secondary-foreground)",
        outline: "border-(--border) text-(--foreground) bg-transparent",
        accent: "border-transparent bg-clay-500/15 text-clay-600 dark:text-clay-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

export { Badge, badgeVariants };
