import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface RevealOptions {
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  selector?: string;
}

/**
 * Reveals direct children (or a selector match) of the returned ref
 * with a stagger as the container scrolls into view.
 */
export function useScrollReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const { y = 32, stagger = 0.08, duration = 0.8, start = "top 82%", selector } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = selector ? el.querySelectorAll(selector) : Array.from(el.children);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
