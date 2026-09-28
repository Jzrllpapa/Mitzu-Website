import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/shared/section-heading";
import { photos } from "@/data/photos";
import type { PhotoCategory } from "@/types/dog";
import { cn } from "@/lib/utils";

const categories: { id: PhotoCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "puppy", label: "Puppy" },
  { id: "adventures", label: "Adventures" },
  { id: "goofy", label: "Goofy" },
  { id: "naps", label: "Naps" },
  { id: "friends", label: "Friends" },
];

const PAGE_SIZE = 6;
const SIMULATED_LOAD_DELAY = 500;

export function Gallery() {
  const [filter, setFilter] = useState<PhotoCategory | "all">("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const photoCount = photos.length;

  const filtered = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.category === filter)),
    [filter]
  );
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // useEffect(() => {
  //   setVisibleCount(PAGE_SIZE);
  // }, [filter]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || loadingMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadingMore(true);
          window.setTimeout(() => {
            setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
            setLoadingMore(false);
          }, SIMULATED_LOAD_DELAY);
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, filtered.length]);

  return (
    <section id="gallery" className="bg-(--secondary)/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={`${photoCount} photo${photoCount === 1 ? "" : "s"} and counting`}
          title="The gallery."
          description="Every era, every haircut, every friends, and every questionable nap position."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                setVisibleCount(PAGE_SIZE);
              }}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                filter === cat.id
                  ? "border-forest-700 bg-forest-700 text-cream-50 dark:border-cream-100 dark:bg-cream-100 dark:text-forest-900"
                  : "border-(--border) bg-(--card) text-(--muted-foreground) hover:text-(--foreground)"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <PhotoProvider maskOpacity={0.9} bannerVisible={false}>
          <motion.div layout className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            <AnimatePresence>
              {visible.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: (i % PAGE_SIZE) * 0.04, ease: "easeOut" }}
                  className="group relative mb-4 break-inside-avoid overflow-hidden rounded-lg shadow-(--shadow-soft)"
                >
                  <PhotoView src={photo.src}>
                    <div
                      className="relative cursor-zoom-in"
                      style={{ aspectRatio: 1 / photo.ratio }}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-end bg-linear-to-t from-ink-950/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-sm font-medium text-cream-50">{photo.caption}</p>
                      </div>
                    </div>
                  </PhotoView>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </PhotoProvider>

        {hasMore && (
          <div ref={sentinelRef} className="mt-8">
            {loadingMore && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-56 w-full" />
                ))}
              </div>
            )}
          </div>
        )}

        {!hasMore && filtered.length > PAGE_SIZE && (
          <p className="mt-10 text-center text-sm text-(--muted-foreground)">
            That's every photo in this category — for now.
          </p>
        )}
      </div>
    </section>
  );
}
