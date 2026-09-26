import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PawIcon } from "@/components/shared/paw-icon";
import { CommandMenu, type CommandItem } from "@/components/ui/command-menu";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useActiveSection } from "@/hooks/use-active-section";
import { navItems } from "@/lib/nav";
import { dogProfile } from "@/data/profile";
import { cn } from "@/lib/utils";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const { scrolled } = useScrollProgress();
  const active = useActiveSection(navItems.map((n) => n.id));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const commandItems: CommandItem[] = navItems.map((n) => ({
    id: n.id,
    label: n.label,
    hint: "Section",
    onSelect: () => scrollToSection(n.id),
  }));

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-6",
            scrolled ? "glass mx-3 shadow-(--shadow-soft) sm:mx-6" : "mx-3 sm:mx-6"
          )}
        >
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 py-2.5 font-display text-lg font-medium tracking-tight"
          >
            <PawIcon className="size-5 text-clay-500" />
            {dogProfile.name}
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active === item.id
                    ? "text-(--foreground)"
                    : "text-(--muted-foreground) hover:text-(--foreground)"
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-(--secondary)"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="hidden rounded-full sm:inline-flex"
              onClick={() => setCommandOpen(true)}
              aria-label="Search"
            >
              <Search className="size-4.5" />
            </Button>
            <ThemeToggle />

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-4.5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-4/5">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <PawIcon className="size-4 text-clay-500" />
                    {dogProfile.name}'s Home
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "rounded-md px-3 py-3 text-left text-base font-medium transition-colors",
                          active === item.id
                            ? "bg-(--secondary) text-(--foreground)"
                            : "text-(--muted-foreground) hover:bg-(--secondary) hover:text-(--foreground)"
                        )}
                      >
                        {item.label}
                      </button>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} items={commandItems} />
    </>
  );
}

export { scrollToSection };
