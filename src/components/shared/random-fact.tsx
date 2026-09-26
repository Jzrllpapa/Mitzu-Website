import { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useRandomDogFact } from "@/hooks/use-random-dog-fact";
import { cn } from "@/lib/utils";

export function RandomFact() {
  const [key, setKey] = useState(0);
  const { data, isFetching } = useRandomDogFact(key);

  return (
    <div className="glass rounded-lg border border-(--border) p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-medium text-(--muted-foreground)">
          <Sparkles className="size-4 text-clay-500" />
          Random dog fact
        </p>
        <button
          onClick={() => setKey((k) => k + 1)}
          aria-label="Get another fact"
          className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-(--secondary)"
        >
          <RefreshCw className={cn("size-4", isFetching && "animate-spin")} />
        </button>
      </div>
      <div className="mt-3 min-h-11">
        {isFetching || !data ? (
          <Skeleton className="h-5 w-4/5" />
        ) : (
          <AnimatePresence mode="wait">
            <motion.p
              key={data.id + key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm leading-relaxed"
            >
              {data.fact}
            </motion.p>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
