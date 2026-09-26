import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--background) focus-visible:ring-(--ring) [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-forest-700 text-cream-50 shadow-(--shadow-soft) hover:bg-forest-600 hover:-translate-y-0.5 hover:shadow-(--shadow-soft-lg) dark:bg-cream-100 dark:text-forest-900 dark:hover:bg-cream-50",
        accent:
          "bg-clay-500 text-cream-50 shadow-(--shadow-soft) hover:bg-clay-600 hover:-translate-y-0.5 hover:shadow-(--shadow-soft-lg)",
        outline:
          "border border-(--border) bg-transparent text-(--foreground) hover:bg-(--secondary) hover:-translate-y-0.5",
        ghost: "text-(--foreground) hover:bg-(--secondary)",
        link: "text-(--foreground) underline underline-offset-4 decoration-(--accent) decoration-2",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
