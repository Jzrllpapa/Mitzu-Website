import { cn } from "@/lib/utils";
import { PawIcon } from "@/components/shared/paw-icon";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <div
        className={cn(
          "mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-clay-600 dark:text-clay-400",
          align === "center" && "justify-center"
        )}
      >
        <PawIcon className="size-3.5" />
        {eyebrow}
      </div>
      <h2 className="text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-base text-(--muted-foreground) sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
