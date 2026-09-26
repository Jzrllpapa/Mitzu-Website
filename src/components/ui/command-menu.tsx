import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  onSelect: () => void;
};

function CommandMenu({
  open,
  onOpenChange,
  items,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
}) {
  const [query, setQuery] = React.useState("");
  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-28 z-50 w-[90vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-(--radius-xl) border border-(--border) bg-(--popover) shadow-(--shadow-soft-lg) data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          )}
        >
          <DialogPrimitive.Title className="sr-only">Search</DialogPrimitive.Title>
          <div className="flex items-center gap-3 border-b border-(--border) px-4 py-3">
            <Search className="size-4 text-(--muted-foreground)" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Jump to a section, memory, or fact…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-(--muted-foreground)"
            />
            <kbd className="rounded-md border border-(--border) px-1.5 py-0.5 text-[10px] text-(--muted-foreground)">
              esc
            </kbd>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-(--muted-foreground)">
                No results. Try "gallery" or "health".
              </p>
            )}
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  item.onSelect();
                  onOpenChange(false);
                }}
                className="flex w-full items-center justify-between rounded-(--radius-md) px-3 py-2.5 text-left text-sm hover:bg-(--secondary)"
              >
                <span>{item.label}</span>
                {item.hint && (
                  <span className="text-xs text-(--muted-foreground)">{item.hint}</span>
                )}
              </button>
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export { CommandMenu };
