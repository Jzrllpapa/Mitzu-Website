import { cn } from "@/lib/utils";

export function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={cn("size-4", className)} aria-hidden="true">
      <g fill="currentColor">
        <ellipse cx="32" cy="42" rx="14" ry="12" />
        <ellipse cx="14" cy="24" rx="6.6" ry="8.2" />
        <ellipse cx="29" cy="15" rx="6.6" ry="8.4" />
        <ellipse cx="46" cy="16" rx="6.4" ry="8.2" />
        <ellipse cx="56" cy="28" rx="6" ry="7.6" />
      </g>
    </svg>
  );
}
