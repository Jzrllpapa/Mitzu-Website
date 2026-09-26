import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawIcon } from "@/components/shared/paw-icon";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream-100 px-6 text-center dark:bg-forest-900">
      <PawIcon className="size-10 text-clay-500" />
      <h1 className="font-display text-3xl font-medium">Looks like this trail went cold.</h1>
      <p className="max-w-sm text-(--muted-foreground)">
        Even the best noses lose the scent sometimes. Let's head back home.
      </p>
      <Button asChild>
        <Link to="/">Back to the den</Link>
      </Button>
    </main>
  );
}
