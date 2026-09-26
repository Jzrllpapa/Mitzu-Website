import { useMemo } from "react";
import { PawIcon } from "@/components/shared/paw-icon";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/utils";

const PRINT_COUNT = 14;

export function PawTrail() {
  const { progress } = useScrollProgress();
  const filled = Math.round(progress * PRINT_COUNT);

  const prints = useMemo(() => Array.from({ length: PRINT_COUNT }), []);

  return (
    <div
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 lg:flex"
      aria-hidden="true"
    >
      {prints.map((_, i) => {
        const isFilled = i < filled;
        const offset = i % 2 === 0 ? "translate-x-0" : "translate-x-2.5";
        return (
          <PawIcon
            key={i}
            className={cn(
              offset,
              "size-3 transition-all duration-500 ease-out",
              isFilled
                ? "scale-100 text-clay-500 opacity-100"
                : "scale-75 text-(--muted-foreground) opacity-25"
            )}
          />
        );
      })}
    </div>
  );
}
