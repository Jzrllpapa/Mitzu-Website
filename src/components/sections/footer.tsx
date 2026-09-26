import { PawIcon } from "@/components/shared/paw-icon";
import { dogProfile } from "@/data/profile";

export function Footer() {
    return (
    <footer className="border-t border-(--border) bg-(--secondary)/40 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex items-center gap-2 font-display text-lg font-medium">
            <PawIcon className="size-4 text-clay-500" />
            {dogProfile.name}
        </div>
        <p className="max-w-md text-balance font-display italic text-(--muted-foreground)">
            "{dogProfile.quote}"
        </p>
        <p className="text-xs text-(--muted-foreground)">
            Made with love for the best dog of my life - Mitzu © {new Date().getFullYear()}
        </p>
        </div>
    </footer>
    );
}