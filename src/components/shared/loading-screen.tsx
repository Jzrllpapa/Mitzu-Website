import { motion } from "framer-motion";
import { PawIcon } from "@/components/shared/paw-icon";
import { dogProfile } from "@/data/profile";

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-200 flex flex-col items-center justify-center gap-4 bg-cream-100 dark:bg-forest-900"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <PawIcon className="size-10 text-clay-500" />
      </motion.div>
      <p className="font-display text-lg text-(--muted-foreground)">Fetching {dogProfile.name}…</p>
    </motion.div>
  );
}
