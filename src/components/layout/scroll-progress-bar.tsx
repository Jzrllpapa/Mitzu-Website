import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgressBar() {
  const { progress } = useScrollProgress();
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.75 bg-transparent">
      <div
        className="h-full origin-left bg-clay-500 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
