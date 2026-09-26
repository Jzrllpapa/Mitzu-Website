import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PawIcon } from "@/components/shared/paw-icon";
import { gsap } from "@/lib/gsap";
import { dogProfile } from "@/data/profile";
import { ageFromBirthday } from "@/utils/date";
import { scrollToSection } from "@/components/layout/navbar";
import confetti from "@/lib/confetti";
import { AnimatePresence, motion } from "framer-motion";
import { useTypewriterLoop } from "@/hooks/use-typewriter";

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);
  const { displayed: typedName } = useTypewriterLoop(dogProfile.name, {
    typeSpeed: 200,
    deleteSpeed: 100,
    pauseAfterType: 1500,
    pauseAfterDelete: 500,
    startDelay: 700,
  });

  useEffect(() => {
    if (!isHovered || dogProfile.hoverPhoto.length <= 1) return;

    const interval = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % dogProfile.hoverPhoto.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    if (!isHovered) setHoverIndex(0);
  }, [isHovered]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-eyebrow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".hero-word",
          { opacity: 0, y: "100%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.08 },
          "-=0.3"
        )
        .fromTo(".hero-quote", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.35"
        )
        .fromTo(
          ".hero-photo-wrap",
          { opacity: 0, scale: 0.92, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power4.out" },
          "-=0.9"
        )
        .fromTo(
          ".hero-float",
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12 },
          "-=0.5"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const currentSrc = isHovered ? dogProfile.hoverPhoto[hoverIndex] : dogProfile.heroPhoto;
  const currentKey = isHovered ? `hover-${hoverIndex}` : "primary";

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-svh items-center overflow-hidden bg-cream-100 pt-24 dark:bg-forest-900"
    >
      {/* floating background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <PawIcon className="hero-float animate-float absolute left-[8%] top-[22%] size-10 text-forest-400/30 dark:text-forest-500/25" />
        <PawIcon className="hero-float animate-float-slow absolute right-[12%] top-[16%] size-14 rotate-12 text-clay-400/25" />
        <PawIcon className="hero-float animate-float absolute bottom-[18%] left-[16%] size-8 -rotate-12 text-tan-400/30" />
        <div className="hero-float animate-float-slow absolute right-[8%] bottom-[24%] size-24 rounded-full bg-forest-400/10 blur-2xl dark:bg-forest-500/10" />
        <div className="hero-float animate-float absolute left-[4%] top-[45%] size-32 rounded-full bg-clay-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <p className="hero-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--card)/60 px-4 py-1.5 text-sm font-medium text-(--muted-foreground)">
            <PawIcon className="size-3.5 text-clay-500" />
            Est. {new Date(dogProfile.birthday).getFullYear()} ·{" "}
            {ageFromBirthday(dogProfile.birthday)} old
          </p>

          <h1 className="overflow-hidden font-display text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">This is</span>
            </span>
            <span className="block text-forest-600 dark:text-clay-400">{typedName}</span>
          </h1>

          <p className="hero-quote mt-6 max-w-md text-balance font-quote text-xl italic text-(--muted-foreground) sm:text-2xl">
            "{dogProfile.quote}"
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button className="hero-cta" onClick={() => scrollToSection("gallery")}>
              See the gallery
            </Button>
            <Button
              variant="outline"
              className="hero-cta"
              onClick={() => scrollToSection("memories")}
            >
              Read her story
            </Button>
            <Button
              variant="ghost"
              className="hero-cta gap-2"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                confetti(rect.left + rect.width / 2, rect.top);
              }}
            >
              <PartyPopper className="size-4 text-clay-500" />
              Happy birthday
            </Button>
          </div>
        </div>

        <div className="hero-photo-wrap relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            className="relative aspect-4/5 w-full overflow-hidden rounded-2xl shadow-(--shadow-soft-lg)"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={currentKey}
                src={currentSrc}
                alt={`${dogProfile.name}, ${dogProfile.breed}`}
                className="absolute inset-0 size-full object-cover"
                fetchPriority="high"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-t from-forest-900/35 via-transparent to-transparent" />
          </div>
          <div className="glass absolute -bottom-6 -left-6 hidden rounded-lg border border-(--border) px-5 py-4 shadow-(--shadow-soft) sm:block">
            <p className="font-display text-2xl font-medium">{dogProfile.breed}</p>
            <p className="text-sm text-(--muted-foreground)">Daddy's Good Girl</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-(--muted-foreground) transition-colors hover:text-(--foreground)"
      >
        <ArrowDown className="size-5" />
      </button>
    </section>
  );
}
