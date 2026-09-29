import { useRef } from "react";
import { SectionHeading } from "@/components/shared/section-heading";
import { PawIcon } from "@/components/shared/paw-icon";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { places } from "@/data/places";

type Place = { address: string; lat?: number; lng?: number };

function mapQuery(place: Place) {
  return place.lat != null && place.lng != null ? `${place.lat},${place.lng}` : place.address;
}

function mapEmbedSrc(place: Place) {
  return `https://www.google.com/maps?q=${encodeURIComponent(mapQuery(place))}&output=embed`;
}

function mapLinkHref(place: Place) {
  return `https://www.google.com/maps?q=${encodeURIComponent(mapQuery(place))}`;
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
          {places.map((p, i) => (
            <div key={p.id} className="place-card group w-72 shrink-0 snap-start">
              <article className="relative overflow-hidden rounded-4xl rounded-tr-md border border-(--border) bg-(--card) transition-all duration-500 hover:-translate-y-1 hover:border-clay-500/60 hover:shadow-(--shadow-soft)">
                <div className="relative h-44 w-full overflow-hidden">
                  <iframe
                    src={mapEmbedSrc(p)}
                    className="size-full border-0 grayscale-[0.6] sepia-[0.25] transition-[filter] duration-500 group-hover:grayscale-0 dark:invert dark:hue-rotate-180 dark:brightness-90"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map preview of ${p.name}`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--card) via-transparent to-forest-900/30" />
                  <a
                    href={mapLinkHref(p)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${p.name} in Google Maps`}
                    className="absolute left-2 top-2 z-10 flex h-9 min-w-24 items-center justify-center rounded-full bg-ink-950 px-4 font-mono text-[0.65rem] uppercase tracking-widest text-cream-50 shadow-sm transition-colors hover:bg-clay-600"
                  >
                    Stop {String(i + 1).padStart(2, "0")}
                  </a>
                  <PawIcon className="pointer-events-none absolute right-4 top-4 size-5 rotate-12 text-clay-400" />
                </div>

                <div className="relative px-5 pb-6">
                  {p.visitedOn && (
                    <p className="-mt-9 font-display text-5xl font-semibold leading-none text-clay-500">
                      {p.visitedOn}
                    </p>
                  )}
                  <h3 className="mt-3 font-display text-lg font-medium">{p.name}</h3>
                  {p.description && (
                    <p className="mt-1.5 text-sm text-(--muted-foreground)">{p.description}</p>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
