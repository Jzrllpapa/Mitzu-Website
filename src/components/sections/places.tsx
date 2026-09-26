import { useRef } from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { PawIcon } from "@/components/shared/paw-icon";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { places } from "@/data/places";

function mapEmbedSrc(place: { address: string; lat?: number; lng?: number }) {
  const query =
    place.lat != null && place.lng != null ? `${place.lat},${place.lng}` : place.address;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function Places() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const ref = useScrollReveal<HTMLDivElement>({ selector: ".place-card", stagger: 0.08, y: 24 });

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="places" className="bg-(--secondary)/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Everywhere we've wandered"
            title="Places she's been."
            description="Drag or scroll sideways to walk through the map."
          />
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scrollBy(-1)}
              className="flex size-10 items-center justify-center rounded-full border border-(--border) bg-(--card) transition-colors hover:bg-(--secondary)"
              aria-label="Scroll places left"
            >
              <PawIcon className="size-4 -scale-x-100" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="flex size-10 items-center justify-center rounded-full border border-(--border) bg-(--card) transition-colors hover:bg-(--secondary)"
              aria-label="Scroll places right"
            >
              <PawIcon className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={(el) => {
            scrollerRef.current = el;
            ref.current = el;
          }}
          className="scrollbar-none mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {places.map((p) => (
            <div key={p.id} className="place-card w-72 shrink-0 snap-start">
              <Card className="overflow-hidden pt-0">
                <div className="relative h-40 w-full">
                  <iframe
                    src={mapEmbedSrc(p)}
                    className="size-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map preview of ${p.name}`}
                  />
                  <div className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-clay-500/15 text-clay-600 shadow-sm backdrop-blur dark:text-clay-400">
                    <MapPin className="size-4.5" />
                  </div>
                </div>
                <CardContent className="p-5 pt-3">
                  {p.visitedOn && (
                    <p className="font-mono text-xs uppercase tracking-wide text-(--muted-foreground)">
                      {p.visitedOn}
                    </p>
                  )}
                  <h3 className="mt-2 font-display text-lg font-medium">{p.name}</h3>
                  {p.description && (
                    <p className="mt-1.5 text-sm text-(--muted-foreground)">{p.description}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
