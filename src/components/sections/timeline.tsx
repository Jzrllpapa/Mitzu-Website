import { useRef } from "react";
import { PartyPopper, Stethoscope, Compass, Sparkle, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { PawIcon } from "@/components/shared/paw-icon";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { milestones } from "@/data/milestones";
import { formatShortDate } from "@/utils/date";
import type { MilestoneKind } from "@/types/dog";
import { cn } from "@/lib/utils";

const kindMeta: Record<MilestoneKind, { icon: typeof Heart; className: string }> = {
  birth: { icon: Heart, className: "bg-clay-500/15 text-clay-600 dark:text-clay-400" },
  milestone: {
    icon: Sparkle,
    className: "bg-forest-700/10 text-forest-700 dark:bg-cream-100/10 dark:text-cream-100",
  },
  vet: {
    icon: Stethoscope,
    className: "bg-forest-700/10 text-forest-700 dark:bg-cream-100/10 dark:text-cream-100",
  },
  trip: { icon: Compass, className: "bg-clay-500/15 text-clay-600 dark:text-clay-400" },
  moment: {
    icon: PartyPopper,
    className: "bg-forest-700/10 text-forest-700 dark:bg-cream-100/10 dark:text-cream-100",
  },
};

export function Timeline() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const ref = useScrollReveal<HTMLDivElement>({ selector: ".timeline-card", stagger: 0.08, y: 24 });

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="timeline" className="bg-(--secondary)/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="From day one to now"
            title="Her timeline."
            description="Drag or scroll sideways to walk through the milestones."
          />
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scrollBy(-1)}
              className="flex size-10 items-center justify-center rounded-full border border-(--border) bg-(--card) transition-colors hover:bg-(--secondary)"
              aria-label="Scroll timeline left"
            >
              <PawIcon className="size-4 -scale-x-100" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="flex size-10 items-center justify-center rounded-full border border-(--border) bg-(--card) transition-colors hover:bg-(--secondary)"
              aria-label="Scroll timeline right"
            >
              <PawIcon className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-14">
          <div
            className="absolute inset-x-0 top-13 hidden h-px bg-(--border) sm:block"
            aria-hidden="true"
          />
          <div
            ref={(el) => {
              scrollerRef.current = el;
              ref.current = el;
            }}
            className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {milestones.map((m, i) => {
              const meta = kindMeta[m.kind];
              return (
                <div
                  key={m.id}
                  className={cn(
                    "timeline-card relative flex w-70 shrink-0 snap-start flex-col",
                    i % 2 === 1 && "sm:mt-16"
                  )}
                >
                  <div
                    className={cn(
                      "relative z-10 mb-4 flex size-11 items-center justify-center rounded-full border-4 border-(--secondary)",
                      meta.className
                    )}
                  >
                    <meta.icon className="size-5" />
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-5">
                      <p className="font-mono text-xs uppercase tracking-wide text-(--muted-foreground)">
                        {formatShortDate(m.date)}
                      </p>
                      <h3 className="mt-2 font-display text-lg font-medium">{m.title}</h3>
                      <p className="mt-1.5 text-sm text-(--muted-foreground)">{m.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
