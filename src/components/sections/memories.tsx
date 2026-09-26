import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { memories } from "@/data/memories";
import { photos } from "@/data/photos";
import { formatDate } from "@/utils/date";

export function Memories() {
  const [query, setQuery] = useState("");
  const ref = useScrollReveal<HTMLDivElement>({
    selector: ".memory-card",
    y: 40,
    stagger: 0.1,
    start: "top 88%",
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return memories;
    return memories.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.story.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <section id="memories" className="bg-(--background) py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Stories worth keeping"
          title="Memories."
          description="The moments that made it into the family group chat more than once."
        />

        <div className="relative mt-10 max-w-sm">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-(--muted-foreground)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search memories…"
            className="w-full rounded-full border border-(--border) bg-(--card) py-2.5 pl-11 pr-4 text-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-(--ring)"
          />
        </div>

        <div ref={ref} className="relative mt-14 space-y-8">
          <div
            className="absolute bottom-0 left-6.75 top-2 hidden w-px bg-(--border) sm:block"
            aria-hidden="true"
          />

          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-(--muted-foreground)">
              No memories match "{query}" yet.
            </p>
          )}

          {filtered.map((memory) => {
            const memoryPhotos = photos.filter((p) => memory.photos.includes(p.id));
            return (
              <div key={memory.id} className="memory-card relative sm:pl-16">
                <div className="absolute left-0 top-2 hidden size-14 items-center justify-center rounded-full border border-(--border) bg-(--card) font-mono text-[11px] font-medium text-(--muted-foreground) sm:flex">
                  {new Date(memory.date).getFullYear()}
                </div>
                <Card className="overflow-hidden">
                  <CardContent className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-mono text-xs uppercase tracking-wide text-clay-600 dark:text-clay-400">
                        {formatDate(memory.date)}
                      </p>
                      {memory.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-medium">{memory.title}</h3>
                    <p className="mt-2.5 text-(--muted-foreground)">{memory.story}</p>

                    {memoryPhotos.length > 0 && (
                      <div className="mt-5 flex gap-3">
                        {memoryPhotos.map((photo) => (
                          <div
                            key={photo.id}
                            className="h-24 w-24 shrink-0 overflow-hidden rounded-md sm:h-28 sm:w-28"
                          >
                            <img
                              src={photo.src}
                              alt={photo.alt}
                              loading="lazy"
                              className="size-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
