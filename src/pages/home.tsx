import { lazy, Suspense, type ReactNode } from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skeleton } from "@/components/ui/skeleton";

const Gallery = lazy(() =>
  import("@/components/sections/gallery").then((m) => ({ default: m.Gallery }))
);
const Memories = lazy(() =>
  import("@/components/sections/memories").then((m) => ({ default: m.Memories }))
);
const FavoriteThings = lazy(() =>
  import("@/components/sections/favorite-things").then((m) => ({ default: m.FavoriteThings }))
);
const Health = lazy(() =>
  import("@/components/sections/health").then((m) => ({ default: m.Health }))
);
const Contact = lazy(() =>
  import("@/components/sections/contact").then((m) => ({ default: m.Contact }))
);
const Footer = lazy(() =>
  import("@/components/sections/footer").then((m) => ({ default: m.Footer }))
);
const Places = lazy(() =>
  import("@/components/sections/places").then((m) => ({ default: m.Places }))
);

function SectionFallback() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <Skeleton className="h-10 w-64" />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}

function LazySection({
  children,
  fallback = <SectionFallback />,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

export function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <LazySection>
        <Gallery />
      </LazySection>
      <LazySection>
        <Memories />
      </LazySection>
      <LazySection>
        <Places />
      </LazySection>
      <LazySection>
        <FavoriteThings />
      </LazySection>
      <LazySection>
        <Health />
      </LazySection>
      <LazySection>
        <Contact />
      </LazySection>
      <LazySection fallback={null}>
        <Footer />
      </LazySection>
    </main>
  );
}
