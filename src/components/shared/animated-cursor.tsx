import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX - 6);
      y.set(e.clientY - 6);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, input, textarea, [role='button']"));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-100 mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.span
        animate={{ scale: hovering ? 2.2 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="block size-3 rounded-full bg-cream-50"
      />
    </motion.div>
  );
}
